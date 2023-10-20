<script setup lang="ts">
const props = defineProps<{
    cx: number;
    cy: number;
    r: number;
    fill: string;
    text?: string;
}>();
const label = props.text ?? "";
</script>
<template>
    <circle :cx="cx" :cy="cy" :r="r" :fill="fill" />
    <text
        v-if="label"
        :x="cx"
        :y="cy"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="white"
        font-size="20"
    >
        {{ label }}
    </text>
</template>
