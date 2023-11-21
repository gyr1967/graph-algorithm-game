<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import AdjListVertex from "../graph/AdjListVertex.ts";
import Vertex from "../graph/Vertex.ts";
import VertexOptionMenu from "./VertexOptionMenu.vue";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum, numToLetter } from "../utils/num-to-letter";
import { ref } from "vue";
import type { BFSYieldData } from "../types/BFS.ts";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
    stage: "vis" | "guided" | "diy";
}>();
const emit = defineEmits(["update:vertexNames"]);

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
    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    *bfsGenerator(startVertex: Vertex): Generator<BFSYieldData, void, unknown> {
        this.vertices.map((v) => {
            v.setVisited(false);
        });
        const queue: Vertex[] = [];
        // mark v as visited and put v into q
        queue.push(startVertex);
        startVertex.setVisited(true);
        this.visited.add(startVertex.getIndex());
        this.changeVertexColour(
            numToLetter[startVertex.getIndex() + 1],
            "#e74c3c",
        );
        yield { visited: this.visited, queue, step: "markFirstAsVisited" };
        // while there is something in the queue do
        yield { visited: this.visited, queue, step: "while" };
        while (queue.length !== 0) {
            // remove the first vertex in the queue
            const temporary = queue.shift();
            if (temporary === undefined) {
                throw new Error("currentVertex is undefined");
            }
            yield { visited: this.visited, queue, step: "removeFirst" };
            // call it v
            const currentVertex: Vertex | undefined = temporary;
            yield { visited: this.visited, queue, step: "callItV" };
            // mark v as visited
            currentVertex.setVisited(true);
            this.visited.add(currentVertex.getIndex());
            this.changeVertexColour(
                numToLetter[currentVertex.getIndex() + 1],
                "#e74c3c",
            );
            yield { visited: this.visited, queue, step: "markVAsVisited" };
            const unvisitedAdjacents = currentVertex
                .getAdjList()
                .filter((alv: AdjListVertex) => {
                    return (
                        !this.visited.has(alv.getVertexIndex()) &&
                        !queue.includes(this.vertices[alv.getVertexIndex()])
                    );
                });
            // add all of v's unvisited neighbours to the queue
            for (const vertex of unvisitedAdjacents) {
                const i = vertex.getVertexIndex();
                const nextVertex = this.vertices[i];
                queue.push(nextVertex);
            }
            yield {
                visited: this.visited,
                queue,
                step: "addVNeighboursToQueue",
            };
        }
    }
}

const nodeData = nodeDatas[props.whichGraphData];
emit("update:vertexNames", Object.keys(nodeData));
const nodeMenuOpen = ref<string>("");
const linkData = linkDatas[props.whichGraphData];
const nodeFill = "#3498db";
const nodeColours = ref<Record<string, string>>({});
const setColoursDefault = () => {
    Object.keys(nodeData).forEach((key) => {
        nodeColours.value[nodeData[key].id] = nodeFill;
    });
};
setColoursDefault();
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
let graph = setUpGraph(Object.entries(nodeData).length);
const started = ref<boolean>(false);
const bfsGenerator = ref<Generator<BFSYieldData, void, unknown> | null>(null);

const startBFS = () => {
    setColoursDefault();
    graph = setUpGraph(Object.entries(nodeData).length);
    const generator = graph.bfsGenerator(graph.getVertex(0));
    bfsGenerator.value = generator;
    started.value = true;
};
const handleVertexClicked = (nodeId: string) => {
    if (nodeMenuOpen.value == nodeId) {
        nodeMenuOpen.value = "";
        return;
    }
    nodeMenuOpen.value = nodeId;
};
</script>
<template>
    <div class="border border-white p-2 rounded-md shadow-md">
        <div>
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
                        @vertex-clicked="
                            handleVertexClicked(nodeData[mykey].id)
                        "
                    />
                </g>
            </svg>
        </div>
        <div>
            <VertexOptionMenu
                v-if="nodeMenuOpen !== ''"
                :node-id="nodeMenuOpen"
            />
        </div>
        <div>
            <button class="btn btn-primary" @click="startBFS">Start BFS</button>
        </div>
    </div>
</template>
