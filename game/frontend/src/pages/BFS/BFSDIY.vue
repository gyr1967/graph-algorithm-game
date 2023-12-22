<script setup lang="ts">
import SearchPseudo from "../../components/SearchPseudo.vue";
import SidePanel from "../../components/SidePanel.vue";
import HintBox from "../../components/HintBox.vue";
import { ref } from "vue";
import Vertex from "../../graph/Vertex";
import { BFSDIYSteps } from "../../types/BFS";
import DIYBFSGraphDisplay from "../../components/DIYBFSGraphDisplay.vue";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const diyStep = ref<BFSDIYSteps | null>(null);
const vertexNames = ref<string[]>([]);
const started = ref<boolean>(false);
const visited = ref<Vertex[]>([]);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <SearchPseudo
                :current-step="
                    visited.length === 0 && diyStep === 'add-to-queue'
                        ? 'addFirstToQueue'
                        : diyStep
                "
                :no-highlighting="false"
                bfs-or-dfs="bfs"
                :is-diy="true"
            />
            <HintBox
                class="mt-2 cursor-pointer"
                :text="diyStep"
                :current-vertex-name="currentVertexName"
                :started="started"
                :visited="visited"
                :queue="currentQueue"
                guided-or-diy="diy"
                bfs-or-dfs="bfs"
            />
        </div>
        <div class="flex justify-center items-center">
            <div>
                <DIYBFSGraphDisplay
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
                    @update:current-queue="
                        (newValue) => {
                            currentQueue = newValue;
                        }
                    "
                    @update:guided-step="
                        (newValue) => {
                            diyStep = newValue;
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
                :current-queue="currentQueue"
                bfs-or-dfs="bfs"
            />
        </div>
    </div>
</template>
