<script setup lang="ts">
const props = defineProps<{
    cx: number;
    cy: number;
    r: number;
    fill: string;
    text?: string;
    currentVertex?: boolean;
}>();
const emit = defineEmits(["vertexClicked"]);
const label = props.text ?? "";
const handleClick = () => {
    emit("vertexClicked");
};
</script>
<template>
    <circle
        :cx="cx"
        :cy="cy"
        :r="r"
        :fill="fill"
        :stroke="currentVertex ? 'white' : ''"
        @click="handleClick()"
        :stroke-width="currentVertex ? '2' : ''"
    />
    <text
        v-if="label"
        :x="cx"
        :y="cy"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="white"
        font-size="20"
        @click="handleClick()"
    >
        {{ label }}
    </text>
</template>
