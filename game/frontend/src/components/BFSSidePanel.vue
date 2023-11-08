<script setup lang="ts">
defineProps<{
    currentVertexName: string;
    currentQueue: string[];
}>();
</script>
<template>
    <div>Current vertex: {{ currentVertexName }}</div>
    <div>Current queue: {{ currentQueue }}</div>
</template>
