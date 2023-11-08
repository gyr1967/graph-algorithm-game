<script setup lang="ts">
import GraphDisplay from "../../components/GraphDisplay.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import BFSSidePanel from "../../components/BFSSidePanel.vue";
import { ref } from "vue";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const pseudoStep = ref<number>(0);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="">
            <BFSPseudo :current-step="pseudoStep" />
        </div>
        <div class="text-center">
            <GraphDisplay
                :which-graph-data="1"
                :scaling-factor="graphSize"
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
