<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum, numToLetter } from "../utils/num-to-letter";
import { ref } from "vue";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
}>();
//
import AdjListVertex from "../graph/AdjListVertex.ts";
import Vertex from "../graph/Vertex.ts";

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

    bfs(startVertex: Vertex) {
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
            // mark v as visited
            currentVertex.setVisited(true);
            this.visited.add(currentVertex.getIndex());
            console.log("changing the colour", queue);
            this.changeNodeColour(
                numToLetter[currentVertex.getIndex() + 1],
                "#e74c3c",
            );
            const unvisitedAdjacents = currentVertex
                .getAdjList()
                .filter((alv: AdjListVertex) => {
                    return !this.visited.has(alv.getVertexIndex());
                });
            console.log(currentVertex.getAdjList());
            console.log("unvisitedAdjacents", unvisitedAdjacents);
            // add all of v's unvisited neighbours to the queue
            for (const vertex of unvisitedAdjacents) {
                const i = vertex.getVertexIndex();
                const nextVertex = this.vertices[i];
                this.visited.add(nextVertex.getIndex());
                queue.push(nextVertex);
            }
        }
        return this.visited;
    }
}

//
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

console.log(graph);
</script>
<template>
    <button
        @click="
            () => {
                graph.bfs(graph.getVertex(0));
            }
        "
    >
        BFS
    </button>
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
</template>
