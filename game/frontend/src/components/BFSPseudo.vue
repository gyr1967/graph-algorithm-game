<script setup lang="ts">
import type { BFSData } from "../types/BFS.ts";
defineProps<{
    currentStep: BFSData | null;
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <ul class="ml-4 list-disc">
            <li
                :class="
                    currentStep == 'addFirstToQueue'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Add the start vertex to the queue
            </li>
            <li
                :class="
                    currentStep == 'while'
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
                    currentStep == 'removeFirstAndMakeItCurrent'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Remove the first vertex in the queue, and make it the current
                vertex
            </li>
            <li
                :class="
                    currentStep == 'markVAsVisited'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Mark the current vertex as visited
            </li>
            <li
                :class="
                    currentStep == 'addVNeighboursToQueue'
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
