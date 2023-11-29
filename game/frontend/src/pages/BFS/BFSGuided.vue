<script setup lang="ts">
import GuidedBFSGraphDisplay from "../../components/GuidedBFSGraphDisplay.vue";
import BFSPseudo from "../../components/BFSPseudo.vue";
import BFSSidePanel from "../../components/BFSSidePanel.vue";
import HintBox from "../../components/HintBox.vue";
import { ref } from "vue";
import Vertex from "../../graph/Vertex";
import { GuidedSteps } from "../../types/BFS";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const guidedStep = ref<GuidedSteps | null>(null);
const vertexNames = ref<string[]>([]);
const started = ref<boolean>(false);
const visited = ref<Vertex[]>([]);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <BFSPseudo
                :current-step="
                    visited.length === 0 && guidedStep === 'add-to-queue'
                        ? 'addFirstToQueue'
                        : guidedStep
                "
            />
            <HintBox
                class="mt-2"
                :text="guidedStep"
                :current-vertex-name="currentVertexName"
                :started="started"
                :visited="visited"
                :queue="currentQueue"
                guided-or-diy="guided"
            />
        </div>
        <div class="flex justify-center items-center">
            <div class="inline-block justify-self-center self-center">
                <GuidedBFSGraphDisplay
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
            <BFSSidePanel
                :vertex-names="vertexNames"
                :current-vertex-name="currentVertexName"
                :current-queue="currentQueue"
            />
        </div>
    </div>
</template>
