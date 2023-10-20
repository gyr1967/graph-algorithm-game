<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import { nodeData, linkData } from "../utils/graph-data";
defineProps<{
    scalingFactor: number;
}>();
const nodeFill = "#3498db";
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
                :fill="nodeFill"
                :text="node.id"
            />
        </g>
    </svg>
</template>
