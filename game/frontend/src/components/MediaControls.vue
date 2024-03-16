<script setup lang="ts">
import { ref } from "vue";
import { nodeDatas } from "../utils/graph-data";
import StartVertexChoice from "./StartVertexChoice.vue";
import GraphChoice from "./GraphChoice.vue";
const props = defineProps<{
    started: boolean;
    isDijkstras: boolean;
    numberOfVertices: number;
    numberOfGraphs: number;
}>();
defineEmits([
    "start",
    "nextStep",
    "reset",
    "update:graphChoice",
    "update:source-choice",
]);
const numberOfVerticesRef = ref<number>(props.numberOfVertices);
</script>
<template>
    <div
        class="border boder-white p-4 rounded-md shadow-md mt-2 flex justify-center"
    >
        <div class="flex justify-center mt-auto">
            <button
                :disabled="started"
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('start')"
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
        <div>
            <div class="flex justify-center items-end">
                <div class="mx-2 text-center">
                    <span>Graph</span>
                    <GraphChoice
                        :disabled="started"
                        :number-of-graphs="3"
                        :starting-graph="isDijkstras ? 2 : 1"
                        @update:graph-choice="
                            (newValue: number) => {
                                $emit('update:graphChoice', newValue);
                                numberOfVerticesRef = Object.entries(
                                    nodeDatas[newValue],
                                ).length;
                            }
                        "
                    />
                </div>
                <div class="mx-2 text-center">
                    <span>Start Vertex</span>
                    <StartVertexChoice
                        :disabled="started"
                        :number-of-vertices="numberOfVerticesRef"
                        @update:source-choice="
                            (newValue: Record<string, string>) => {
                                $emit('update:source-choice', newValue);
                            }
                        "
                    />
                </div>
            </div>
        </div>
    </div>
</template>
