<script setup lang="ts">
const circles = [
    {
        id: 1,
        cx: 15,
        cy: 15,
        r: 10,
        fill: "#3498db",
        label: "Unknown Distance",
        text: "∞",
    },
    {
        id: 2,
        cx: 15,
        cy: 15,
        r: 10,
        fill: "#3498db",
        stroke: "white",
        strokeWidth: 2,
        label: "Current Vertex with Known Distance",
        text: "3",
    },
    {
        id: 3,
        cx: 15,
        cy: 15,
        r: 10,
        fill: "#2ecc71",
        label: "Current Adjacent Vertex",
    },
    {
        id: 4,
        cx: 15,
        cy: 15,
        r: 10,
        fill: "#ff00ff",
        label: "Path to Source",
    },
];
</script>

<template>
    <div class="border border-white p-4 rounded-md shadow-md">
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
                        <circle
                            :cx="circle.cx"
                            :cy="circle.cy"
                            :r="circle.r"
                            :fill="circle.fill"
                            :stroke="circle.stroke"
                            :stroke-width="circle.strokeWidth"
                        />
                        <text
                            v-if="circle.text"
                            :x="circle.cx"
                            :y="circle.cy"
                            text-anchor="middle"
                            alignment-baseline="middle"
                            fill="white"
                            font-size="18"
                        >
                            {{ circle.text }}
                        </text>
                    </g>
                </svg>
            </div>
            <div>
                <span>{{ circle.label }}</span>
            </div>
        </div>
    </div>
</template>
