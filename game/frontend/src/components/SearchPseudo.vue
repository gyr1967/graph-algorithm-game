<script setup lang="ts">
import type { BFSStep, BFSGuidedSteps } from "../types/BFS.ts";
import type { DFSStep, DFSGuidedSteps } from "../types/DFS";
const props = defineProps<{
    currentStep: DFSStep | BFSStep | BFSGuidedSteps | DFSGuidedSteps | null;
    noHighlighting?: boolean;
    bfsOrDfs: "bfs" | "dfs";
}>();

const stackOrQueue = props.bfsOrDfs === "bfs" ? "Queue" : "Stack";
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <ul class="ml-4 list-disc">
            <li
                :class="
                    (currentStep === 'addFirstToQueue' ||
                        currentStep === 'addFirstToStack') &&
                    !noHighlighting
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
                    !noHighlighting
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Remove the first vertex in the {{ stackOrQueue }}, and make it
                the current vertex
            </li>
            <li
                :class="
                    (currentStep === 'markVAsVisited' ||
                        currentStep === 'visit') &&
                    !noHighlighting
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
                    !noHighlighting
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Add all of the current vertex's neighbors (that aren't already
                visited, or in the {{ stackOrQueue }}) to the {{ stackOrQueue }}
            </li>
        </ul>
    </div>
</template>
