<script setup lang="ts">
const props = defineProps<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    strokeWidth: string;
    text?: string;
}>();
const label = props.text ?? "";

const midpoint = (x1: number, y1: number, x2: number, y2: number) => {
    return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2,
    };
};
const { x, y } = midpoint(props.x1, props.y1, props.x2, props.y2);
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
        :x="x"
        :y="y - 10"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="white"
        font-size="15"
    >
        {{ label }}
    </text>
</template>
