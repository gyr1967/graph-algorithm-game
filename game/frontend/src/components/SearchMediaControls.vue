<script setup lang="ts">
import { ref } from "vue";
import { letterToNum } from "../utils/num-to-letter";
import StartVertexChoice from "./StartVertexChoice.vue";

defineProps<{
    started: boolean;
    bfsOrDfs: "bfs" | "dfs";
    numberOfVertices: number;
}>();
defineEmits([
    "startBFS",
    "nextStepBFS",
    "prevStepBFS",
    "startDFS",
    "nextStepDFS",
    "prevStepDFS",
]);
const choice = ref<Record<string, string>>({ id: "A" });
</script>
<template>
    <div class="flex">
        <StartVertexChoice
            :disabled="started"
            :number-of-vertices="numberOfVertices"
            @update:source-choice="
                (newValue: Record<string, string>) => {
                    choice = newValue;
                }
            "
        />
        <button
            :disabled="started"
            class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
            @click="
                bfsOrDfs === 'bfs'
                    ? $emit('startBFS', letterToNum[choice.id] - 1)
                    : $emit('startDFS', letterToNum[choice.id] - 1)
            "
        >
            Start
        </button>
    </div>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 ml-1 mr-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="
            bfsOrDfs === 'bfs' ? $emit('prevStepBFS') : $emit('prevStepDFS')
        "
    >
        Previous (TODO)
    </button>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 ml-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="
            bfsOrDfs === 'bfs' ? $emit('nextStepBFS') : $emit('nextStepDFS')
        "
    >
        Next
    </button>
</template>
