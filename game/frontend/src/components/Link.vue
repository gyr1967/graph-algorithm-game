<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    strokeWidth: string;
    text?: string;
}>();
const label = computed(() => {
    return props.text ?? "";
});

const midpoint = (x1: number, y1: number, x2: number, y2: number) => {
    return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2,
    };
};

const calculateAngle = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
};

const angle = calculateAngle(props.x1, props.y1, props.x2, props.y2);

let textX = 0;
let textY = 0;

// Adjust text position based on line angle
if (angle >= -90 && angle < 90) {
    textX = midpoint(props.x1, props.y1, props.x2, props.y2).x + 5;
    textY = midpoint(props.x1, props.y1, props.x2, props.y2).y;
} else {
    textX = midpoint(props.x1, props.y1, props.x2, props.y2).x - 5;
    textY = midpoint(props.x1, props.y1, props.x2, props.y2).y;
}
</script>
<template>
    <line
        :x1="x1"
        :y1="y1"
        :x2="x2"
        :y2="y2"
        :stroke="stroke"
        :stroke-width="strokeWidth"
    />
    <text
        v-if="label"
        :x="textX"
        :y="textY - 10"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="white"
        font-size="15"
    >
        {{ label }}
    </text>
</template>
