<script setup lang="ts">
import Vertex from "../graph/Vertex";
import { DFSGuidedSteps } from "../types/DFS";
import { BFSGuidedSteps } from "../types/BFS";
const props = defineProps<{
    text: DFSGuidedSteps | BFSGuidedSteps | null;
    currentVertexName: string;
    started: boolean;
    visited: Vertex[];
    stack?: string[];
    queue?: string[];
    guidedOrDiy: "guided" | "diy";
    bfsOrDfs: "bfs" | "dfs";
}>();
const stackOrQueue = props.bfsOrDfs === "bfs" ? "queue" : "stack";
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div class="flex justify-between">
            <div v-if="!started">
                <span>Click start!</span>
            </div>
            <div v-else>
                <span
                    v-if="
                        (text === 'add-to-stack' || text === 'add-to-queue') &&
                        visited.length > 0
                    "
                >
                    Add all of {{ currentVertexName }}'s neighbours (that aren't
                    already in the {{ stackOrQueue }} or visited) to the
                    {{ stackOrQueue }}</span
                >
                <span
                    v-else-if="
                        (text === 'add-to-stack' || text === 'add-to-queue') &&
                        visited.length === 0
                    "
                >
                    Add {{ currentVertexName }} to the {{ stackOrQueue }}</span
                >
                <span v-else-if="text === 'remove-and-set-to-current'"
                    >Remove {{ stack ? stack[0] : queue![0] }} from the
                    {{ stackOrQueue }} and set it as the current vertex</span
                >
                <span v-else-if="text === 'visit'"
                    >Mark {{ currentVertexName }} as visited</span
                >
                <span v-else-if="text === 'done'">Done!</span>
            </div>
        </div>
    </div>
</template>
