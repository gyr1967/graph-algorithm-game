<script setup lang="ts">
import { ref } from "vue";
import { letterToNum } from "../utils/num-to-letter";
import StartVertexChoice from "./StartVertexChoice.vue";

defineProps<{
    started: boolean;
    isDijkstras?: boolean;
    numberOfVertices: number;
}>();
defineEmits(["start", "nextStep", "reset", "randomiseLinkLengths"]);
const choice = ref<Record<string, string>>({ id: "A" });
</script>
<template>
    <div class="flex-row">
        <div v-if="isDijkstras === true" class="flex justify-center mb-2">
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
                    @click="$emit('start', letterToNum[choice.id] - 1)"
                >
                    Start
                </button>
            </div>
            <button
                :disabled="!started"
                class="bg-white text-black rounded-sm p-1 ml-1 mr-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('reset')"
            >
                Reset
            </button>
            <button
                :disabled="!started"
                class="bg-white text-black rounded-sm p-1 ml-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('nextStep')"
            >
                Next
            </button>
        </div>
    </div>
</template>
