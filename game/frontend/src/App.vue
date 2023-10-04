<script setup lang="ts">
import Graph from "./components/Graph.vue";
import GraphSizeSelector from "./components/GraphSizeSelector.vue";
import { ref } from "vue";

const graphSize = ref(4);
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <Graph :key="graphSize" :graph-size="graphSize" />
        <GraphSizeSelector v-model="graphSize" />
    </div>
</template>
