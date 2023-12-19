<script setup lang="ts">
import SearchPseudo from "../../components/SearchPseudo.vue";
import SidePanel from "../../components/SidePanel.vue";
import HintBox from "../../components/HintBox.vue";
import DisplayOptions from "../../components/DisplayOptions.vue";
import { ref } from "vue";
import Vertex from "../../graph/Vertex";
import { BFSGuidedSteps } from "../../types/BFS";
import DIYBFSGraphDisplay from "../../components/DIYBFSGraphDisplay.vue";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const guidedStep = ref<BFSGuidedSteps | null>(null);
const vertexNames = ref<string[]>([]);
const started = ref<boolean>(false);
const visited = ref<Vertex[]>([]);
const hidePseudo = ref<boolean>(false);
const hideHint = ref<boolean>(false);
const hideHighlights = ref<boolean>(false);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <SearchPseudo
                :class="hidePseudo ? 'blur-sm' : ''"
                :current-step="
                    visited.length === 0 && guidedStep === 'add-to-queue'
                        ? 'addFirstToQueue'
                        : guidedStep
                "
                :no-highlighting="false"
                bfs-or-dfs="bfs"
                :hide-highlights="hideHighlights"
            />
            <HintBox
                class="mt-2 cursor-pointer"
                :class="hideHint ? 'blur-sm' : ''"
                :text="guidedStep"
                :current-vertex-name="currentVertexName"
                :started="started"
                :visited="visited"
                :queue="currentQueue"
                guided-or-diy="diy"
                bfs-or-dfs="bfs"
            />
            <DisplayOptions
                class="mt-2"
                @hide-hints="hideHint = !hideHint"
                @hide-pseudo="hidePseudo = !hidePseudo"
                @hide-highlights="hideHighlights = !hideHighlights"
            />
        </div>
        <div class="flex justify-center items-center">
            <div class="inline-block justify-self-center self-center">
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
        <div class="text-center">
            <SidePanel
                :vertex-names="vertexNames"
                :current-vertex-name="currentVertexName"
                :current-queue="currentQueue"
                bfs-or-dfs="bfs"
            />
        </div>
    </div>
</template>
