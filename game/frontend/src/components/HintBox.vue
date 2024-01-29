<script setup lang="ts">
import Vertex from "../graph/Vertex";
import { DFSDIYSteps } from "../types/DFS";
import { BFSDIYSteps } from "../types/BFS";
import { ref } from "vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
    text: DFSDIYSteps | BFSDIYSteps | null;
    currentVertexName: string;
    started: boolean;
    visited: Vertex[];
    stack?: string[];
    queue?: string[];
    bfsOrDfs: "bfs" | "dfs";
}>();
const stackOrQueue = props.bfsOrDfs === "bfs" ? "queue" : "stack";

const isBlurred = ref<boolean>(false);
const toggleBlur = () => {
    isBlurred.value = !isBlurred.value;
};
</script>
<template>
    <div
        class="border border-white p-4 rounded-md shadow-md flex justify-between"
    >
        <div>
            <span class="font-bold">Hint: </span>
            <div :class="isBlurred ? 'blur-sm' : ''">
                <div v-if="!started">
                    <span>Click start!</span>
                </div>
                <div v-else>
                    <span
                        v-if="
                            (text === 'add-to-stack' ||
                                text === 'add-to-queue') &&
                            visited.length > 0
                        "
                    >
                        Add all of {{ currentVertexName }}'s neighbours (that
                        aren't already in the {{ stackOrQueue }} or visited) to
                        the {{ stackOrQueue }}
                    </span>
                    <span
                        v-else-if="
                            (text === 'add-to-stack' ||
                                text === 'add-to-queue') &&
                            visited.length === 0
                        "
                    >
                        Add {{ currentVertexName }} to the
                        {{ stackOrQueue }}</span
                    >
                    <span v-else-if="text === 'remove-and-set-to-current'"
                        >Remove {{ stack ? stack[0] : queue![0] }} from the
                        {{ stackOrQueue }} and set it as the current
                        vertex</span
                    >
                    <span v-else-if="text === 'visit'"
                        >Mark {{ currentVertexName }} as visited</span
                    >
                    <span v-else-if="text === 'done'">Done!</span>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <button
                class="bg-white text-black rounded-sm p-1 mx-1 w-7 h-8"
                @click="toggleBlur()"
            >
                <EyeSlashIcon v-if="isBlurred" class="w-5 h-5" />
                <EyeIcon v-else class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>
