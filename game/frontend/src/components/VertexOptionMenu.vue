<script setup lang="ts">
import { ref } from "vue";
import { letterToNum } from "../utils/num-to-letter";
import StartVertexChoice from "./StartVertexChoice.vue";
import GraphChoice from "./GraphChoice.vue";
const props = defineProps<{
    wrongChoice: boolean;
    text: string;
    disabled: boolean;
    nodeId: string;
    bfsOrDfs: "bfs" | "dfs";
    numberOfVertices: number;
    started: boolean;
}>();
defineEmits([
    "add-to-queue",
    "visit",
    "remove-and-set-to-current",
    "add-to-stack",
    "startTheAlgorithm",
    "reset",
    "update:graphChoice",
]);
const choice = ref<Record<string, string>>({ id: "A", value: "A" });
const stackOrQueue = props.bfsOrDfs === "bfs" ? "queue" : "stack";
</script>
<template>
    <div>
        <div class="my-2 flex justify-center items-center">
            <div class="mx-2 text-center">
                <span>Graph</span>
                <GraphChoice
                    :disabled="started"
                    :number-of-graphs="3"
                    :starting-graph="1"
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
        <div class="flex justify-center items-center">
            <button
                :disabled="started"
                class="rounded-sm text-black p-1 hover:bg-gray-400 bg-white mx-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="
                    $emit('startTheAlgorithm', letterToNum[choice.value] - 1)
                "
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
    </div>
    <div class="flex justify-center">
        <span>{{ text }}</span>
    </div>
    <div class="grid grid-rows-3 gap-2">
        <div class="flex justify-center">
            <button
                :disabled="disabled"
                :class="
                    wrongChoice ? 'bg-red-500' : 'bg-white hover:bg-gray-400'
                "
                class="rounded-sm text-black p-1 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                @click="
                    bfsOrDfs === 'bfs'
                        ? $emit('add-to-queue', nodeId)
                        : $emit('add-to-stack', nodeId)
                "
            >
                Add {{ nodeId }} to {{ stackOrQueue }}
            </button>
        </div>
        <div class="flex justify-center">
            <button
                :disabled="disabled"
                :class="
                    wrongChoice ? 'bg-red-500' : 'bg-white hover:bg-gray-400'
                "
                class="rounded-sm text-black p-1 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                @click="$emit('visit', nodeId)"
            >
                Mark {{ nodeId }} as visited
            </button>
        </div>
        <div class="flex justify-center">
            <button
                :disabled="disabled"
                :class="
                    wrongChoice ? 'bg-red-500' : 'bg-white hover:bg-gray-400'
                "
                class="rounded-sm text-black p-1 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                @click="$emit('remove-and-set-to-current', nodeId)"
            >
                Remove {{ nodeId }} from {{ stackOrQueue }} and set to current
                vertex
            </button>
        </div>
    </div>
</template>
