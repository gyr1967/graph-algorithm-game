<script setup lang="ts">
import Vertex from "../graph/Vertex";
import { GuidedSteps } from "../types/BFS";
defineProps<{
    text: GuidedSteps | null;
    currentVertexName: string;
    started: boolean;
    visited: Vertex[];
    queue: string[];
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div v-if="!started">
            <span>Click start!</span>
        </div>
        <div v-else>
            <span v-if="text === 'add-to-queue' && visited.length > 0"
                >Add all of {{ currentVertexName }}'s neighbours (that aren't
                already in the queue or visited) to the queue</span
            >
            <span v-else-if="text === 'add-to-queue' && visited.length === 0"
                >Add {{ currentVertexName }} to the queue</span
            >
            <span v-else-if="text === 'remove-and-set-to-current'"
                >Remove {{ queue[0] }} from the queue and set it as the current
                vertex</span
            >
            <span v-else-if="text === 'visit'"
                >Mark {{ currentVertexName }} as visited</span
            >
            <span v-else-if="text === 'done'">Done!</span>
        </div>
    </div>
</template>
