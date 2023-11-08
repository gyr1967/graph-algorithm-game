<script setup lang="ts">
import GraphDisplay from "../../components/GraphDisplay.vue";
import GraphSizeSelector from "../../components/GraphSizeSelector.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import { ref } from "vue";
const graphSize = ref(1);
const pseudoStep = ref<number>(0);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="">
            <BFSPseudo :current-step="pseudoStep" />
        </div>
        <div class="text-center">
            <GraphDisplay
                stage="diy"
                :which-graph-data="1"
                :scaling-factor="graphSize"
            />
            <GraphSizeSelector v-model="graphSize" />
        </div>
    </div>
</template>
