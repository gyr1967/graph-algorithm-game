<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { ref, watch } from "vue";
import Graph from "../graph/Graph";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
}>();
const nodeData = nodeDatas[props.whichGraphData];
const linkData = linkDatas[props.whichGraphData];
const nodeFill = "#3498db";
const nodeColours = ref<Record<string, string>>({});
Object.keys(nodeData).forEach((key) => {
    nodeColours.value[nodeData[key].id] = nodeFill;
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changeNodeColour = (nodeId: string, colour: string) => {
    nodeColours.value[nodeId] = colour;
};
const graph = new Graph(4);
const visited = ref(graph.visited);
graph.bfs(graph.getVertex(0));
// watch graph.visited
watch(visited, (visited) => {
    visited.forEach(() => {
        changeNodeColour("A", "#2ecc71");
    });
});
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
</template>
