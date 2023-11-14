<script setup lang="ts">
import GraphDisplay from "../../components/GraphDisplay.vue";
import GraphSizeSelector from "../../components/GraphSizeSelector.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import { ref } from "vue";
import { BFSData } from "../../types/BFS";
const graphSize = ref(1);
const pseudoStep = ref<BFSData | null>(null);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="">
            <BFSPseudo :current-step="pseudoStep" />
        </div>
        <div class="text-center">
            <GraphDisplay
                stage="guided"
                :which-graph-data="1"
                :scaling-factor="graphSize"
            />
            <GraphSizeSelector v-model="graphSize" />
        </div>
    </div>
</template>
