<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
    wrongChoice: boolean;
    text: string;
    disabled: boolean;
    nodeId: string;
    currentVertexName: string | undefined;
    numberOfVertices: number;
    started: boolean;
}>();
const emit = defineEmits([
    "update-distance",
    "remove-and-set-to-current",
    "set-adj-prev-to-current",
    "startTheAlgorithm",
    "reset",
    "update:graphChoice",
]);
const newDistance = ref<number>(0);
const submitDistance = () => {
    if (newDistance.value !== null) {
        emit("update-distance", {
            nodeId: props.nodeId,
            distance: newDistance.value,
        });
        newDistance.value = 0;
    }
};
</script>
<template>
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
                @click="$emit('remove-and-set-to-current', nodeId)"
            >
                Remove {{ nodeId }} from Queue and set to current vertex
            </button>
        </div>
        <div
            :class="disabled ? 'bg-opacity-50 cursor-not-allowed' : ''"
            class="border border-white p-1 rounded-sm flex justify-evenly items-center"
        >
            <span>Set {{ nodeId }}'s distance from source</span>
            <div>
                <input
                    v-model="newDistance"
                    class="text-black rounded-md"
                    type="number"
                    min="0"
                    max="100"
                />
                <button
                    :disabled="newDistance === null || disabled"
                    :class="
                        wrongChoice
                            ? 'bg-red-500'
                            : 'bg-white hover:bg-gray-400'
                    "
                    class="rounded-sm text-black p-1 disabled:bg-opacity-50 disabled:cursor-not-allowed mx-1"
                    @click="submitDistance"
                >
                    Submit
                </button>
            </div>
        </div>
        <div class="flex justify-center">
            <button
                :disabled="disabled"
                :class="
                    wrongChoice ? 'bg-red-500' : 'bg-white hover:bg-gray-400'
                "
                class="rounded-sm text-black p-1 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                @click="$emit('set-adj-prev-to-current', nodeId)"
            >
                Set {{ nodeId }}'s previous vertex to
                {{ currentVertexName }}
            </button>
        </div>
    </div>
</template>
