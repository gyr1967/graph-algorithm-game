<script setup lang="ts">
import { ref } from "vue";
import StartVertexChoice from "../StartVertexChoice.vue";
defineProps<{
    started: boolean;
}>();
defineEmits([
    "startDijkstras",
    "nextStepDijkstras",
    "prevStepDijkstras",
    "randomiseLinkLengths",
]);
const choice = ref<string>("A");
</script>
<template>
    <div class="flex-row">
        <div class="flex justify-center mb-2">
            <button
                :disabled="started"
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('randomiseLinkLengths')"
            >
                Randomise Edge Weights
            </button>
        </div>
        <div class="flex">
            <div class="flex">
                <StartVertexChoice v-model="choice" />
                <button
                    :disabled="started"
                    class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    @click="$emit('startDijkstras', 4)"
                >
                    Start
                </button>
            </div>
            <button
                :disabled="!started"
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('prevStepDijkstras')"
            >
                Previous (TODO)
            </button>
            <button
                :disabled="!started"
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('nextStepDijkstras')"
            >
                Next
            </button>
        </div>
    </div>
</template>
