<script setup lang="ts">
defineProps<{
    started: boolean;
}>();
defineEmits([
    "startDijkstras",
    "nextStepDijkstras",
    "prevStepDijkstras",
    "randomiseLinkLengths",
]);
</script>
<template>
    <button
        :disabled="started"
        class="bg-white text-black rounded-sm p-1 mr-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="$emit('randomiseLinkLengths')"
    >
        Randomise Link Lengths
    </button>
    <button
        :disabled="started"
        class="bg-white text-black rounded-sm p-1 mr-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="$emit('startDijkstras')"
    >
        Start
    </button>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 ml-1 mr-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="$emit('prevStepDijkstras')"
    >
        Previous (TODO)
    </button>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 ml-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="$emit('nextStepDijkstras')"
    >
        Next
    </button>
</template>
