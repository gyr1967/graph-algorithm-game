<script setup lang="ts">
import VisBFSGraphDisplay from "../../components/VisBFSGraphDisplay.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import BFSSidePanel from "../../components/BFSSidePanel.vue";
import { ref } from "vue";
import { BFSStep } from "../../types/BFS";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const pseudoStep = ref<BFSStep | null>(null);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <BFSPseudo :current-step="pseudoStep" />
        </div>
        <div class="flex justify-center items-center">
            <div class="inline-block justify-self-center self-center">
                <VisBFSGraphDisplay
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
        </div>
        <div class="text-center">
            <BFSSidePanel
                :current-vertex-name="currentVertexName"
                :current-queue="currentQueue"
            />
        </div>
    </div>
</template>
