<script setup lang="ts">
import { ref } from "vue";
import StartVertexChoice from "../StartVertexChoice.vue";
import { letterToNum } from "../../utils/num-to-letter";
defineProps<{
    started: boolean;
    numberOfVertices: number;
}>();
defineEmits([
    "startDijkstras",
    "nextStepDijkstras",
    "prevStepDijkstras",
    "randomiseLinkLengths",
]);
const choice = ref<Record<string, string>>({ id: "A" });
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
                    @click="$emit('startDijkstras', letterToNum[choice.id] - 1)"
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
