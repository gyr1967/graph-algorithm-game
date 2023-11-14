<script setup lang="ts">
import GraphDisplay from "../../components/GraphDisplay.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import BFSSidePanel from "../../components/BFSSidePanel.vue";
import { ref } from "vue";
import { BFSData } from "../../types/BFS";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const pseudoStep = ref<BFSData | null>(null);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <BFSPseudo :current-step="pseudoStep" />
        </div>
        <div class="text-center">
            <GraphDisplay
                :which-graph-data="1"
                :scaling-factor="graphSize"
                stage="vis"
                @update:current-vertex-name="
                    (newValue) => {
                        currentVertexName = newValue;
                    }
                "
                @update:current-queue="
                    (newValue) => {
                        currentQueue = newValue;
                    }
                "
                @update:pseudo-step="
                    (newValue) => {
                        pseudoStep = newValue;
                    }
                "
            />
        </div>
        <div class="text-center">
            <BFSSidePanel
                :current-vertex-name="currentVertexName"
                :current-queue="currentQueue"
            />
        </div>
    </div>
</template>
