<script setup lang="ts">
defineProps<{ started: boolean }>();
defineEmits(["startBFS", "nextStepBFS", "prevStepBFS"]);
</script>
<template>
    <button
        class="bg-white text-black rounded-sm p-1 mr-1"
        @click="$emit('startBFS')"
    >
        Start
    </button>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 mr-1 disabled:bg-gray-600"
        @click="$emit('prevStepBFS')"
    >
        Previous
    </button>
    <button
        :disabled="!started"
        class="bg-white text-black rounded-sm p-1 ml-1 disabled:bg-gray-600"
        @click="$emit('nextStepBFS')"
    >
        Next
    </button>
</template>
