<script setup lang="ts">
import TEMPGUIDEDBFSGraphDisplay from "../../components/TEMPGUIDEDBFSGraphDisplay.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import TEMPGUIDEDBFSSidePanel from "../../components/TEMPGUIDEDBFSSidePanel.vue";
import HintBox from "../../components/HintBox.vue";
import { ref } from "vue";
import { BFSData } from "../../types/BFS";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const pseudoStep = ref<BFSData | null>(null);
const vertexNames = ref<string[]>([]);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <BFSPseudo :current-step="pseudoStep" />
            <HintBox class="mt-2" :text="pseudoStep" />
        </div>
        <div class="flex justify-center items-center">
            <div class="inline-block justify-self-center self-center">
                <TEMPGUIDEDBFSGraphDisplay
                    :which-graph-data="1"
                    :scaling-factor="graphSize"
                    stage="guided"
                    @update:vertex-names="
                        (newValue) => {
                            vertexNames = newValue;
                        }
                    "
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
            <TEMPGUIDEDBFSSidePanel
                :vertex-names="vertexNames"
                :current-vertex-name="currentVertexName"
                :current-queue="currentQueue"
            />
        </div>
    </div>
</template>
