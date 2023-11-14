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
                    currentStep == 'createQueue'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Create a queue q
            </li>
            <li
                :class="
                    currentStep == 'markFirstAsVisited'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Mark start as visited and add to q
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
                    currentStep == 'removeFirst'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Remove the next vertex in the queue
            </li>
            <li
                :class="
                    currentStep == 'callItV'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                We will call this 'v'
            </li>
            <li
                :class="
                    currentStep == 'markVAsVisited'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Mark v as visited
            </li>
            <li
                :class="
                    currentStep == 'addVNeighboursToQueue'
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Add all of v's neighbors (that aren't already visited, or in the
                queue) to the queue
            </li>
        </ul>
    </div>
</template>
