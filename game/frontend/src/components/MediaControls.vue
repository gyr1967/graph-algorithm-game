<script setup lang="ts">
import { ref } from "vue";
import { letterToNum } from "../utils/num-to-letter";
import StartVertexChoice from "./StartVertexChoice.vue";
import GraphChoice from "./GraphChoice.vue";
defineProps<{
    started: boolean;
    isDijkstras?: boolean;
    numberOfVertices: number;
}>();
defineEmits([
    "start",
    "nextStep",
    "reset",
    "randomiseLinkLengths",
    "update:graphChoice",
]);
const choice = ref<Record<string, string>>({ id: "A" });
</script>
<template>
    <div>
        <div v-if="isDijkstras === true" class="flex justify-center mb-2">
            <button
                :disabled="started"
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('randomiseLinkLengths')"
            >
                Randomise Edge Weights
            </button>
        </div>
        <div class="my-2 flex justify-center items-center">
            <div class="mx-2 text-center">
                <span>Graph</span>
                <GraphChoice
                    :disabled="started"
                    :number-of-graphs="3"
                    :starting-graph="isDijkstras ? 2 : 1"
                    @update:graph-choice="
                        (newValue: number) => {
                            $emit('update:graphChoice', newValue);
                        }
                    "
                />
            </div>
            <div class="mx-2 text-center">
                <span>Start Vertex</span>
                <StartVertexChoice
                    :disabled="started"
                    :number-of-vertices="numberOfVertices"
                    @update:source-choice="
                        (newValue: Record<string, string>) => {
                            choice = newValue;
                        }
                    "
                />
            </div>
        </div>
        <div class="flex-row">
            <div class="flex justify-center">
                <button
                    :disabled="started"
                    class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    @click="$emit('start', letterToNum[choice.id] - 1)"
                >
                    Start
                </button>
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
    </div>
</template>
