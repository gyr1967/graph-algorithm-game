<script setup lang="ts">
import type { BFSStep, GuidedSteps } from "../types/BFS.ts";
defineProps<{
    currentStep: BFSStep | GuidedSteps | null;
    noHighlighting?: boolean;
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <ul class="ml-4 list-disc">
            <li
                :class="
                    currentStep === 'addFirstToQueue' && !noHighlighting
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Add the start vertex to the queue
            </li>
            <li
                :class="
                    currentStep === 'while' && !noHighlighting
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                While there is something in the queue do:
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
                Remove the first vertex in the queue, and make it the current
                vertex
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
                        currentStep === 'add-to-queue') &&
                    !noHighlighting
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Add all of the current vertex's neighbors (that aren't already
                visited, or in the queue) to the queue
            </li>
        </ul>
    </div>
</template>
