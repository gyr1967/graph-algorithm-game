<script setup lang="ts">
const scalingFactor = 1;
</script>
<template>
    <svg
        class="graph-svg"
        :width="350 * scalingFactor"
        :height="300 * scalingFactor"
    >
        <circle
            :cx="50 * scalingFactor"
            :cy="50 * scalingFactor"
            :r="20 * scalingFactor"
            fill="#3498db"
        />
        <circle
            :cx="150 * scalingFactor"
            :cy="50 * scalingFactor"
            :r="20 * scalingFactor"
            fill="#3498db"
        />
        <circle
            :cx="250 * scalingFactor"
            :cy="50 * scalingFactor"
            :r="20 * scalingFactor"
            fill="#3498db"
        />
        <circle
            :cx="200 * scalingFactor"
            :cy="125 * scalingFactor"
            :r="20 * scalingFactor"
            fill="#3498db"
        />
        <circle
            :cx="300 * scalingFactor"
            :cy="125 * scalingFactor"
            :r="20 * scalingFactor"
            fill="#3498db"
        />
        <circle
            :cx="250 * scalingFactor"
            :cy="200 * scalingFactor"
            :r="20 * scalingFactor"
            fill="#3498db"
        />
        <circle
            :cx="150 * scalingFactor"
            :cy="200 * scalingFactor"
            :r="20 * scalingFactor"
            fill="#3498db"
        />
        <line
            :x1="70 * scalingFactor"
            :y1="50 * scalingFactor"
            :x2="130 * scalingFactor"
            :y2="50 * scalingFactor"
            stroke="#ccc"
            stroke-width="2"
        />
        <line
            :x1="170 * scalingFactor"
            :y1="50 * scalingFactor"
            :x2="230 * scalingFactor"
            :y2="50 * scalingFactor"
            stroke="#ccc"
            stroke-width="2"
        />
    </svg>
</template>
