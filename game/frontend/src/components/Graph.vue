<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import { linkData, nodeData } from "../utils/graph-data";
import { onMounted, ref } from "vue";
defineProps<{
    scalingFactor: number;
}>();
const nodeFill = "#3498db";
const nodeColours = ref<Record<string, string>>({});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const changeNodeColour = (nodeId: string, colour: string) => {
    nodeColours.value[nodeId] = colour;
};

onMounted(() => {
    nodeData.forEach((node) => {
        nodeColours.value[node.id] = nodeFill;
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
        <g v-for="node in nodeData" :key="node.id">
            <Node
                :cx="node.x * scalingFactor"
                :cy="node.y * scalingFactor"
                :r="20 * scalingFactor"
                :fill="nodeColours[node.id]"
                :text="node.id"
            />
        </g>
    </svg>
</template>
