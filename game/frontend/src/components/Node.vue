<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    cx: number;
    cy: number;
    r: number;
    fill: string;
    text?: string;
    currentVertex?: boolean;
    uncheckedDistance?: number;
}>();
const emit = defineEmits(["vertexClicked"]);
const label = props.text ?? "";
const distance = computed(() => {
    if (props.uncheckedDistance === undefined) {
        return undefined;
    }
    if (props.uncheckedDistance === 0) {
        return "0";
    }
    if (props.uncheckedDistance === Infinity) {
        return "∞";
    }
    return props.uncheckedDistance;
});
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
        :stroke-width="currentVertex ? '2' : ''"
        @click="handleClick()"
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
    <text
        v-if="distance"
        :x="cx"
        :y="cy + Math.floor(r / 1.5)"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="white"
        font-size="16"
    >
        {{ distance }}
    </text>
</template>
