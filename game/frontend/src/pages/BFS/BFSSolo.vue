<script setup lang="ts">
import Graph from "../../components/Graph.vue";
import GraphSizeSelector from "../../components/GraphSizeSelector.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import { ref } from "vue";
const graphSize = ref(1);
</script>

<template>
    Solo
    <div class="grid grid-cols-3">
        <div class="">
            <BFSPseudo />
        </div>
        <div class="text-center">
            <Graph :scaling-factor="graphSize" />
            <GraphSizeSelector v-model="graphSize" />
        </div>
    </div>
</template>
