<script setup lang="ts">
import VisDFSGraphDisplay from "../../components/VisDFSGraphDisplay.vue";
import SearchPseudo from "../../components/SearchPseudo.vue";
import SidePanel from "../../components/SidePanel.vue";
import { ref } from "vue";
import { DFSStep } from "../../types/DFS";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentStack = ref<string[]>([]);
const pseudoStep = ref<DFSStep | null>(null);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <SearchPseudo :current-step="pseudoStep" bfs-or-dfs="dfs" />
        </div>
        <div class="flex justify-center items-center">
            <div class="inline-block justify-self-center self-center">
                <VisDFSGraphDisplay
                    :which-graph-data="1"
                    :scaling-factor="graphSize"
                    stage="vis"
                    @update:current-vertex-name="
                        (newValue) => {
                            currentVertexName = newValue;
                        }
                    "
                    @update:current-stack="
                        (newValue) => {
                            currentStack = newValue;
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
            <SidePanel
                :current-vertex-name="currentVertexName"
                :current-stack="currentStack"
                bfs-or-dfs="dfs"
            />
        </div>
    </div>
</template>
