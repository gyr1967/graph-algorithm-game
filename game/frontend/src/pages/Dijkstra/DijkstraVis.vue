<script setup lang="ts">
import VisDijkstraGraph from "../../components/dijkstra/VisDijkstraGraphDisplay.vue";
import DijkstraPseudo from "../../components/dijkstra/DijkstraPseudo.vue";
import DijkstraSidePanel from "../../components/dijkstra/DijkstraSidePanel.vue";
import ShortestPaths from "../../components/dijkstra/ShortestPaths.vue";
import { ref } from "vue";
import { DijkstraStep } from "../../types/Dijkstra.ts";
import { DijkstraVertex } from "../../graph/Vertex";
const currentVertexName = ref<string>("");
const verticesToCheck = ref<string[]>([]);
const pseudoStep = ref<DijkstraStep | null>(null);
const distances = ref<Record<string, number>>({});
const vertices = ref<DijkstraVertex[]>([]);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <DijkstraPseudo :current-step="pseudoStep" />
        </div>
        <div class="flex justify-center items-center">
            <div class="inline-block justify-self-center self-center">
                <VisDijkstraGraph
                    :which-graph-data="2"
                    :scaling-factor="1.2"
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
                />
            </div>
        </div>
        <div class="text-center">
            <DijkstraSidePanel
                :current-vertex-name="currentVertexName"
                :vertices-to-check="verticesToCheck"
                :distances="distances"
            />
            <ShortestPaths
                :current-vertex-name="currentVertexName"
                :vertices="vertices"
                :distances="distances"
                :source-name="'A'"
            />
        </div>
    </div>
</template>
