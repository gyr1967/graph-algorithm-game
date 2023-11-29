<script setup lang="ts">
defineProps<{
    started: boolean;
    bfsOrDfs: "bfs" | "dfs";
}>();
defineEmits([
    "startBFS",
    "nextStepBFS",
    "prevStepBFS",
    "startDFS",
    "nextStepDFS",
    "prevStepDFS",
]);
</script>
<template>
    <button
        :disabled="started"
        class="bg-white text-black rounded-sm p-1 mr-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="bfsOrDfs === 'bfs' ? $emit('startBFS') : $emit('startDFS')"
    >
        Start
    </button>
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
