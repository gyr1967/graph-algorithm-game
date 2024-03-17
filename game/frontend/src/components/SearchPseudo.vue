<script setup lang="ts">
import { ref } from "vue";
import type { BFSStep, BFSDIYSteps } from "../types/BFS.ts";
import type { DFSStep, DFSDIYSteps } from "../types/DFS";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";
const props = defineProps<{
    currentStep: DFSStep | BFSStep | BFSDIYSteps | DFSDIYSteps | null;
    noHighlighting?: boolean;
    bfsOrDfs: "bfs" | "dfs";
    isDiy: boolean;
}>();

const hideHighlights = ref<boolean>(false);
const toggleHighlights = () => {
    hideHighlights.value = !hideHighlights.value;
};
const isBlurred = ref<boolean>(false);
const toggleBlur = () => {
    isBlurred.value = !isBlurred.value;
};

const stackOrQueue = props.bfsOrDfs === "bfs" ? "Queue" : "Stack";
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div class="flex justify-between mb-1">
            <div>
                <h2 class="text-xl font-bold">
                    {{ bfsOrDfs === "bfs" ? "Breadth" : "Depth" }}-First Search
                </h2>
            </div>
            <div v-if="isDiy" class="flex">
                <button
                    class="bg-white text-black rounded-sm p-1 mx-1 w-7 h-8"
                    @click="toggleBlur()"
                >
                    <EyeSlashIcon v-if="isBlurred" class="w-5 h-5" />
                    <EyeIcon v-else class="w-5 h-5" />
                </button>
                <button
                    class="bg-white text-black rounded-sm p-1 mx-1 h-8 truncate"
                    @click="toggleHighlights()"
                >
                    {{ hideHighlights ? "Show" : "Hide" }} Highlights
                </button>
            </div>
        </div>
        <div :class="isBlurred ? 'blur-sm' : ''">
            <ul class="ml-4 list-disc">
                <li
                    :class="
                        (currentStep === 'addFirstToQueue' ||
                            currentStep === 'addFirstToStack') &&
                        !noHighlighting &&
                        !hideHighlights
                            ? 'bg-white text-black rounded-sm'
                            : ''
                    "
                >
                    Add the start vertex to the {{ stackOrQueue }}
                </li>
                <li
                    :class="
                        currentStep === 'while' && !noHighlighting
                            ? 'bg-white text-black rounded-sm'
                            : ''
                    "
                >
                    While there is something in the {{ stackOrQueue }} do:
                </li>
            </ul>
            <ul class="ml-8 list-disc">
                <li
                    :class="
                        (currentStep === 'removeFirstAndMakeItCurrent' ||
                            currentStep === 'remove-and-set-to-current') &&
                        !noHighlighting &&
                        !hideHighlights
                            ? 'bg-white text-black rounded-sm'
                            : ''
                    "
                >
                    Remove the first vertex in the {{ stackOrQueue }}, and make
                    it the current vertex
                </li>
                <li
                    :class="
                        (currentStep === 'markVAsVisited' ||
                            currentStep === 'visit') &&
                        !noHighlighting &&
                        !hideHighlights
                            ? 'bg-white text-black rounded-sm'
                            : ''
                    "
                >
                    Mark the current vertex as visited
                </li>
                <li
                    :class="
                        (currentStep === 'addVNeighboursToQueue' ||
                            currentStep === 'addVNeighboursToStack' ||
                            currentStep === 'add-to-queue' ||
                            currentStep === 'add-to-stack') &&
                        !noHighlighting &&
                        !hideHighlights
                            ? 'bg-white text-black rounded-sm'
                            : ''
                    "
                >
                    Add all of the current vertex's neighbours (that aren't
                    already visited, or in the {{ stackOrQueue }}) to the
                    {{ stackOrQueue }}
                </li>
            </ul>
        </div>
    </div>
</template>
