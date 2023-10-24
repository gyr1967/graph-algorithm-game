<script setup lang="ts">
import Graph from "../components/Graph.vue";
import GraphSizeSelector from "../components/GraphSizeSelector.vue";
import { ref } from "vue";
const graphSize = ref(1);
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <Graph :scaling-factor="graphSize" />
        <GraphSizeSelector v-model="graphSize" />
    </div>
</template>
