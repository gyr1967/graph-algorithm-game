<script setup lang="ts">
import VisBFSGraphDisplay from "../../components/VisBFSGraphDisplay.vue";
import SearchPseudo from "../../components/SearchPseudo.vue";
import SidePanel from "../../components/SidePanel.vue";
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
            <SearchPseudo
                :current-step="pseudoStep"
                bfs-or-dfs="bfs"
                :hide-highlights="false"
            />
        </div>
        <div class="flex justify-center items-center">
            <div>
                <VisBFSGraphDisplay
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
        </div>
        <div class="text-center mr-2">
            <SidePanel
                :current-vertex-name="currentVertexName"
                :current-queue="currentQueue"
                bfs-or-dfs="bfs"
            />
        </div>
    </div>
</template>
