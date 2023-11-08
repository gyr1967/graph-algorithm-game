<script setup lang="ts">
defineProps<{ started: boolean }>();
defineEmits(["startBFS", "nextStepBFS", "prevStepBFS"]);
</script>
<template>
    <button
        :disabled="started"
        class="bg-white text-black rounded-sm p-1 mr-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="$emit('startBFS')"
    >
        Start
    </button>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 ml-1 mr-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="$emit('prevStepBFS')"
    >
        Previous (TODO)
    </button>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 ml-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
        @click="$emit('nextStepBFS')"
    >
        Next
    </button>
</template>
