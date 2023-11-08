<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import BFSMediaControlsVue from "./BFSMediaControls.vue";
import AdjListVertex from "../graph/AdjListVertex.ts";
import Vertex from "../graph/Vertex.ts";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum, numToLetter } from "../utils/num-to-letter";
import { ref } from "vue";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
}>();
const emit = defineEmits(["update:currentVertexName"]);

class Graph {
    numVertices: number;
    vertices: Vertex[];
    visited: Set<number>;
    constructor(n: number) {
        this.numVertices = n;
        this.vertices = [];
        for (let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i));
        }
        this.visited = new Set<number>();
    }

    getVertex(i: number) {
        return this.vertices[i];
    }

    setVertex(i: number) {
        this.vertices[i] = new Vertex(i);
    }

    getVertices() {
        return this.vertices;
    }
    changeNodeColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    *bfsGenerator(startVertex: Vertex) {
        this.vertices.map((v) => {
            v.setVisited(false);
        });
        // create a queue q
        const queue: Vertex[] = [];
        // mark v as visited and put v into q
        queue.push(startVertex);
        startVertex.setVisited(true);
        this.visited.add(startVertex.getIndex());
        // while there is something in the queue do
        while (queue.length !== 0) {
            // remove the first vertex in the queue and call it v
            const currentVertex: Vertex | undefined = queue.shift();
            if (currentVertex === undefined) {
                throw new Error("currentVertex is undefined");
            }
            emit(
                "update:currentVertexName",
                numToLetter[currentVertex.getIndex() + 1],
            );
            // mark v as visited
            currentVertex.setVisited(true);
            this.visited.add(currentVertex.getIndex());
            this.changeNodeColour(
                numToLetter[currentVertex.getIndex() + 1],
                "#e74c3c",
            );
            const unvisitedAdjacents = currentVertex
                .getAdjList()
                .filter((alv: AdjListVertex) => {
                    return !this.visited.has(alv.getVertexIndex());
                });
            // add all of v's unvisited neighbours to the queue
            for (const vertex of unvisitedAdjacents) {
                const i = vertex.getVertexIndex();
                const nextVertex = this.vertices[i];
                queue.push(nextVertex);
            }
            yield this.visited;
        }
    }
}

const nodeData = nodeDatas[props.whichGraphData];
const linkData = linkDatas[props.whichGraphData];
const nodeFill = "#3498db";
const nodeColours = ref<Record<string, string>>({});
Object.keys(nodeData).forEach((key) => {
    nodeColours.value[nodeData[key].id] = nodeFill;
});
const setUpGraph = (n: number) => {
    const graph = new Graph(n);
    Object.keys(linkData).forEach((key) => {
        const link = linkData[key];
        const v1id = letterToNum[link.v1] - 1;
        const v2id = letterToNum[link.v2] - 1;
        const v1 = graph.getVertex(v1id);
        const v2 = graph.getVertex(v2id);
        v1.addToAdjList(v2id);
        v2.addToAdjList(v1id);
    });
    return graph;
};
const graph = setUpGraph(Object.entries(nodeData).length);
const currentStep = ref<number>(-1);
const bfsGenerator = ref<Generator<Set<number>, void, unknown> | null>(null);

const startBFS = () => {
    const generator = graph.bfsGenerator(graph.getVertex(0));
    bfsGenerator.value = generator;
    currentStep.value = 0;
    performBFSStep();
};

const performBFSStep = () => {
    if (bfsGenerator.value) {
        const result = bfsGenerator.value.next();
        if (result.done) {
            bfsGenerator.value = null;
            currentStep.value = -1;
        } else {
            currentStep.value++;
        }
    }
};
</script>
<template>
    <svg
        class="graph-svg"
        :width="350 * scalingFactor"
        :height="300 * scalingFactor"
    >
        <g
            v-for="link in linkData"
            :key="link.x1 + link.y1 + link.x2 + link.y2"
        >
            <Link
                :x1="link.x1 * scalingFactor"
                :y1="link.y1 * scalingFactor"
                :x2="link.x2 * scalingFactor"
                :y2="link.y2 * scalingFactor"
                :stroke="link.stroke"
                :stroke-width="link.strokeWidth"
                :text="link.text"
            />
        </g>
        <g v-for="mykey in Object.keys(nodeData)" :key="mykey">
            <Node
                :cx="nodeData[mykey].x * scalingFactor"
                :cy="nodeData[mykey].y * scalingFactor"
                :r="20 * scalingFactor"
                :fill="nodeColours[nodeData[mykey].id]"
                :text="nodeData[mykey].id"
            />
        </g>
    </svg>
    <BFSMediaControlsVue
        :started="currentStep !== -1"
        @start-b-f-s="startBFS()"
        @next-step-b-f-s="performBFSStep()"
        @prev-step-b-f-s="console.log('previous step init')"
    />
</template>
