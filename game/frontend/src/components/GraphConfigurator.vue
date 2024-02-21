<script setup lang="ts">
import StartVertexChoice from "./StartVertexChoice.vue";
import GraphChoice from "./GraphChoice.vue";

defineProps<{
    started: boolean;
    numberOfVertices: number;
    startingGraph: number;
    numberOfGraphs: number;
}>();

defineEmits([
    "update:graphChoice",
    "update:source-choice",
    "startTheAlgorithm",
    "reset",
]);
</script>
<template>
    <div
        class="border border-white p-4 rounded-md shadow-md my-2 flex justify-center"
    >
        <div class="flex justify-center mt-auto">
            <button
                :disabled="started"
                class="rounded-sm text-black p-1 hover:bg-gray-400 bg-white mx-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="$emit('startTheAlgorithm')"
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
        </div>
        <div class="mx-2 text-center">
            <span>Graph</span>
            <GraphChoice
                :disabled="started"
                :number-of-graphs="numberOfGraphs"
                :starting-graph="startingGraph"
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
                        $emit('update:source-choice', newValue);
                    }
                "
            />
        </div>
    </div>
</template>
