<script setup lang="ts">
import SearchPseudo from "../../components/SearchPseudo.vue";
import SidePanel from "../../components/SidePanel.vue";
import HintBox from "../../components/HintBox.vue";
import { ref } from "vue";
import Vertex from "../../graph/Vertex";
import { DFSDIYSteps } from "../../types/DFS";
import DIYDFSGraphDisplay from "../../components/DIYDFSGraphDisplay.vue";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentStack = ref<string[]>([]);
const guidedStep = ref<DFSDIYSteps | null>(null);
const vertexNames = ref<string[]>([]);
const started = ref<boolean>(false);
const visited = ref<Vertex[]>([]);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <SearchPseudo
                class="cursor-pointer"
                :current-step="
                    visited.length === 0 && guidedStep === 'add-to-stack'
                        ? 'addFirstToStack'
                        : guidedStep
                "
                :no-highlighting="false"
                bfs-or-dfs="dfs"
                :is-diy="true"
            />
            <HintBox
                class="mt-2 cursor-pointer"
                :text="guidedStep"
                :current-vertex-name="currentVertexName"
                :started="started"
                :visited="visited"
                :stack="currentStack"
                guided-or-diy="diy"
                bfs-or-dfs="dfs"
            />
        </div>
        <div class="flex justify-center items-center">
            <div>
                <DIYDFSGraphDisplay
                    :which-graph-data="1"
                    :scaling-factor="graphSize"
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
                    @update:current-stack="
                        (newValue) => {
                            currentStack = newValue;
                        }
                    "
                    @update:guided-step="
                        (newValue) => {
                            guidedStep = newValue;
                        }
                    "
                    @update:started="
                        (newValue) => {
                            started = newValue;
                        }
                    "
                    @update:visited="
                        (newValue) => {
                            visited = newValue;
                        }
                    "
                />
            </div>
        </div>
        <div class="text-center mr-2">
            <SidePanel
                :vertex-names="vertexNames"
                :current-vertex-name="currentVertexName"
                :current-stack="currentStack"
                bfs-or-dfs="dfs"
            />
        </div>
    </div>
</template>
