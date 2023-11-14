<script setup lang="ts">
import type { BFSData } from "../types/BFS.ts";
defineProps<{
    currentStep: BFSData | null;
}>();
</script>
<template>
    <div :class="currentStep == 'createQueue' ? 'bg-white text-black' : ''">
        Create a queue q
    </div>
    <div
        :class="
            currentStep == 'markFirstAsVisited' ? 'bg-white text-black' : ''
        "
    >
        Mark start as visited and add to q
    </div>
    <div :class="currentStep == 'while' ? 'bg-white text-black' : ''">
        While there is something in the queue do:
    </div>
    <ul>
        <li :class="currentStep == 'removeFirst' ? 'bg-white text-black' : ''">
            Remove the next vertex in the queue
        </li>
        <li :class="currentStep == 'callItV' ? 'bg-white text-black' : ''">
            We will call this 'v'
        </li>
        <li
            :class="
                currentStep == 'markVAsVisited' ? 'bg-white text-black' : ''
            "
        >
            Mark v as visited
        </li>
        <li
            :class="
                currentStep == 'addVNeighboursToQueue'
                    ? 'bg-white text-black'
                    : ''
            "
        >
            Add all of v's neighbors (that aren't already visited, or in the
            queue) to the queue
        </li>
    </ul>
</template>
