<script setup lang="ts">
import Node from "./Node.vue";
const circles = [
    { id: 1, cx: 15, cy: 15, r: 10, fill: "#3498db", label: "Unvisited" },
    { id: 2, cx: 15, cy: 15, r: 10, fill: "#e74c3c", label: "Visited" },
    {
        id: 3,
        cx: 15,
        cy: 15,
        r: 10,
        fill: "#3498db",
        stroke: "white",
        strokeWidth: 2,
        label: "Current Vertex (Unvisited)",
    },
    {
        id: 4,
        cx: 15,
        cy: 15,
        r: 10,
        fill: "#e74c3c",
        stroke: "white",
        strokeWidth: 2,
        label: "Current Vertex (Visited)",
    },
];
</script>

<template>
    <div
        class="border border-white p-4 rounded-md shadow-md flex justify-between"
    >
        <div
            v-for="circle in circles"
            :key="circle.id"
            class="flex items-center"
        >
            <div>
                <svg
                    :width="30"
                    :height="30"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <Node
                            :cx="circle.cx"
                            :cy="circle.cy"
                            :r="circle.r"
                            :fill="circle.fill"
                            :stroke="circle.stroke"
                            :stroke-width="circle.strokeWidth"
                        />
                    </g>
                </svg>
            </div>
            <div>
                <span>{{ circle.label }}</span>
            </div>
        </div>
    </div>
</template>
