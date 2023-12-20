<script setup lang="ts">
import DijkstraGraphDisplay from "../../components/dijkstra/DijkstraGraphDisplay.vue";
import DijkstraPseudo from "../../components/dijkstra/DijkstraPseudo.vue";
import DijkstraSidePanel from "../../components/dijkstra/DijkstraSidePanel.vue";
import ShortestPaths from "../../components/dijkstra/ShortestPaths.vue";
import DijkstraHintBox from "../../components/dijkstra/DijkstraHintBox.vue";
import DisplayOptions from "../../components/DisplayOptions.vue";
import { ref } from "vue";
import { DijkstraStep } from "../../types/Dijkstra.ts";
import { DijkstraVertex } from "../../graph/Vertex";
const currentVertexName = ref<string>("");
const verticesToCheck = ref<string[]>([]);
const pseudoStep = ref<DijkstraStep | null>(null);
const distances = ref<Record<string, number>>({});
const vertices = ref<DijkstraVertex[]>([]);
const started = ref<boolean>(false);
const adjacentVertexName = ref<string>("");
const hidePseudo = ref<boolean>(false);
const hideHint = ref<boolean>(false);
const hideHighlights = ref<boolean>(false);
const sourceName = ref<string>("");
</script>

<template>
    <div class="grid grid-cols-3 gap-1">
        <div class="ml-2">
            <DijkstraPseudo
                :class="hidePseudo ? 'blur-sm' : ''"
                class="cursor-pointer"
                :current-step="pseudoStep"
                :hide-highlights="hideHighlights"
            />
            <DijkstraHintBox
                class="mt-2 cursor-pointer"
                :class="hideHint ? 'blur-sm' : ''"
                :text="pseudoStep"
                :current-vertex-name="currentVertexName"
                :started="started"
                :queue="verticesToCheck"
                guided-or-diy="guided"
                :adjacent-vertex-name="adjacentVertexName"
                :distances="distances"
            />
            <DisplayOptions
                class="mt-2"
                @hide-hints="hideHint = !hideHint"
                @hide-pseudo="hidePseudo = !hidePseudo"
                @hide-highlights="hideHighlights = !hideHighlights"
            />
        </div>
        <div class="flex justify-center">
            <div>
                <DijkstraGraphDisplay
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
                    @update:source-name="
                        (newValue) => {
                            sourceName = newValue;
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
                />
            </div>
            <div>
                <ShortestPaths
                    :current-vertex-name="currentVertexName"
                    :vertices="vertices"
                    :distances="distances"
                    :source-name="sourceName"
                />
            </div>
        </div>
    </div>
</template>
