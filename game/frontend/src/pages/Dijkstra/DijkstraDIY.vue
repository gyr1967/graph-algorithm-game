<script setup lang="ts">
import DIYDijkstraGraphDisplay from "../../components/dijkstra/DIYDijkstraGraphDisplay.vue";
import DijkstraPseudo from "../../components/dijkstra/DijkstraPseudo.vue";
import DijkstraLegend from "../../components/dijkstra/DijkstraLegend.vue";
import DijkstraSidePanel from "../../components/dijkstra/DijkstraSidePanel.vue";
import ShortestPaths from "../../components/dijkstra/ShortestPaths.vue";
import DijkstraHintBox from "../../components/dijkstra/DijkstraHintBox.vue";
import GraphConfigurator from "../../components/GraphConfigurator.vue";
import { ref } from "vue";
import { DijkstraStep } from "../../types/Dijkstra.ts";
import { DijkstraVertex } from "../../graph/Vertex";
import { NodeData } from "../../types/GraphData";
import { nodeDatas } from "../../utils/graph-data";

const currentVertexName = ref<string>("");
const verticesToCheck = ref<string[]>([]);
const pseudoStep = ref<DijkstraStep | null>(null);
const distances = ref<Record<string, number>>({});
const vertices = ref<DijkstraVertex[]>([]);
const started = ref<boolean>(false);
const adjacentVertexName = ref<string>("");
const graphChoice = ref<number>(2);
const sourceChoice = ref<Record<string, string>>({ id: "A", value: "A" });
const nodeData = ref<Record<string, NodeData>>(nodeDatas[graphChoice.value]);
const resetCounter = ref<number>(0);
</script>

<template>
    <div class="grid grid-cols-3 gap-1">
        <div class="ml-2">
            <DijkstraPseudo :current-step="pseudoStep" :is-diy="true" />
            <GraphConfigurator
                :started="started"
                :number-of-vertices="Object.keys(nodeData).length"
                :starting-graph="2"
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
            <DijkstraHintBox
                class="mt-2 cursor-pointer"
                :text="pseudoStep"
                :current-vertex-name="currentVertexName"
                :started="started"
                :queue="verticesToCheck"
                :adjacent-vertex-name="adjacentVertexName"
                :distances="distances"
            />
            <DijkstraLegend class="mt-2" />
        </div>
        <div class="flex justify-center">
            <div>
                <DIYDijkstraGraphDisplay
                    :scaling-factor="1.2"
                    :started="started"
                    :reset-counter="resetCounter"
                    :graph-choice="graphChoice"
                    :source-choice="sourceChoice"
                    @update:current-vertex-name="
                        (newValue) => {
                            currentVertexName = newValue;
                        }
                    "
                    @update:pseudo-step="
                        (newValue) => {
                            pseudoStep = newValue;
                        }
                    "
                    @update:vertices-to-check="
                        (newValue) => {
                            verticesToCheck = newValue;
                        }
                    "
                    @update:distances="
                        (newValue) => {
                            distances = newValue;
                        }
                    "
                    @update:vertices="
                        (newValue) => {
                            vertices = newValue;
                        }
                    "
                    @update:started="
                        (newValue) => {
                            started = newValue;
                        }
                    "
                    @update:adjacent-vertex-name="
                        (newValue) => {
                            adjacentVertexName = newValue;
                        }
                    "
                />
            </div>
        </div>
        <div class="grid grid-rows-2 gap-1 text-center mr-2">
            <div>
                <DijkstraSidePanel
                    class="h-full"
                    :current-vertex-name="currentVertexName"
                    :vertices-to-check="verticesToCheck"
                    :distances="distances"
                    :vertices="vertices"
                    :source-name="sourceChoice.id"
                />
            </div>
            <div>
                <ShortestPaths
                    :current-vertex-name="currentVertexName"
                    :vertices="vertices"
                    :distances="distances"
                    :source-name="sourceChoice.id"
                />
            </div>
        </div>
    </div>
</template>
