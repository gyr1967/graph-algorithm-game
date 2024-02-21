<script setup lang="ts">
import VisBFSGraphDisplay from "../../components/VisBFSGraphDisplay.vue";
import SearchPseudo from "../../components/SearchPseudo.vue";
import SearchLegend from "../../components/SearchLegend.vue";
import SidePanel from "../../components/SidePanel.vue";
import MediaControls from "../../components/MediaControls.vue";
import { NodeData } from "../../types/GraphData";
import { nodeDatas } from "../../utils/graph-data";
import { ref } from "vue";
import { BFSStep } from "../../types/BFS";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentQueue = ref<string[]>([]);
const pseudoStep = ref<BFSStep | null>(null);
const started = ref<boolean>(false);
const graphChoice = ref<number>(1);
const sourceChoice = ref<Record<string, string>>({ id: "A", value: "A" });
const nodeData = ref<Record<string, NodeData>>(nodeDatas[graphChoice.value]);
const resetCounter = ref<number>(0);
const nextStepCounter = ref<number>(0);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <SearchPseudo
                :current-step="pseudoStep"
                bfs-or-dfs="bfs"
                :is-diy="false"
            />
            <MediaControls
                :started="started"
                :starting-graph="1"
                :number-of-graphs="3"
                :number-of-vertices="Object.keys(nodeData).length"
                @next-step="
                    () => {
                        nextStepCounter++;
                    }
                "
                @update:graph-choice="
                    (newValue) => {
                        graphChoice = newValue;
                        nodeData = nodeDatas[graphChoice];
                    }
                "
                @update:source-choice="
                    (newValue) => {
                        sourceChoice = newValue;
                    }
                "
                @start="
                    () => {
                        started = true;
                    }
                "
                @reset="
                    () => {
                        started = false;
                        resetCounter++;
                    }
                "
            />
            <SearchLegend class="mt-2" />
        </div>
        <div class="flex justify-center">
            <div>
                <VisBFSGraphDisplay
                    :scaling-factor="graphSize"
                    :graph-choice="graphChoice"
                    :source-choice="sourceChoice"
                    :started="started"
                    :reset-counter="resetCounter"
                    :next-step-counter="nextStepCounter"
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
                    @update:started="
                        (newValue) => {
                            started = newValue;
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
