<script setup lang="ts">
import SearchPseudo from "../../components/SearchPseudo.vue";
import SearchLegend from "../../components/SearchLegend.vue";
import SidePanel from "../../components/SidePanel.vue";
import HintBox from "../../components/HintBox.vue";
import { ref } from "vue";
import Vertex from "../../graph/Vertex";
import { DFSDIYSteps } from "../../types/DFS";
import DIYDFSGraphDisplay from "../../components/DIYDFSGraphDisplay.vue";
import GraphConfigurator from "../../components/GraphConfigurator.vue";
import { nodeDatas } from "../../utils/graph-data";
import { NodeData } from "../../types/GraphData";
const graphSize = ref<number>(1);
const currentVertexName = ref<string>("");
const currentStack = ref<string[]>([]);
const diyStep = ref<DFSDIYSteps | null>(null);
const vertexNames = ref<string[]>([]);
const started = ref<boolean>(false);
const visited = ref<Vertex[]>([]);
const graphChoice = ref<number>(1);
const sourceChoice = ref<Record<string, string>>({ id: "A", value: "A" });
const nodeData = ref<Record<string, NodeData>>(nodeDatas[graphChoice.value]);
const resetCounter = ref<number>(0);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <SearchPseudo
                :current-step="
                    visited.length === 0 && diyStep === 'add-to-stack'
                        ? 'addFirstToStack'
                        : diyStep
                "
                :no-highlighting="false"
                bfs-or-dfs="dfs"
                :is-diy="true"
            />
            <GraphConfigurator
                :started="started"
                :number-of-vertices="Object.keys(nodeData).length"
                :starting-graph="1"
                :number-of-graphs="3"
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
                @start-the-algorithm="
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
            <HintBox
                class="mt-2"
                :text="diyStep"
                :current-vertex-name="currentVertexName"
                :started="started"
                :visited="visited"
                :stack="currentStack"
                bfs-or-dfs="dfs"
            />
            <SearchLegend class="mt-2" stack-or-queue="stack" />
        </div>
        <div class="flex justify-center">
            <div>
                <DIYDFSGraphDisplay
                    :scaling-factor="graphSize"
                    :graph-choice="graphChoice"
                    :source-choice="sourceChoice"
                    :started="started"
                    :reset-counter="resetCounter"
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
                    @update:diy-step="
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
                :current-stack="currentStack"
                bfs-or-dfs="dfs"
            />
        </div>
    </div>
</template>
