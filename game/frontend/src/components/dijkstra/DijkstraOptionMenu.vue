<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    text: string;
    disabled: boolean;
    nodeId: string;
    currentVertexName: string | undefined;
}>();
const emit = defineEmits([
    "update-distance",
    "remove-and-set-to-current",
    "set-adj-prev-to-current",
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
    <div class="flex justify-center items-center">
        <button
            :disabled="disabled"
            class="border border-white p-1 rounded-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-60"
            @click="$emit('remove-and-set-to-current', nodeId)"
        >
            Remove {{ nodeId }} from Queue and set to current vertex
        </button>
        <div
            :disabled="disabled"
            class="border border-white p-1 rounded-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Set {{ nodeId }} distance from source
            <input
                v-model="newDistance"
                class="text-black"
                type="number"
                min="0"
                max="100"
            />
            <button
                :disabled="newDistance === null || disabled"
                class="border border-white p-1 rounded-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-60"
                @click="submitDistance"
            >
                Submit
            </button>
        </div>
    </div>
    <div class="flex justify-center mt-2">
        <button
            :disabled="disabled"
            class="border border-white p-1 rounded-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-60"
            @click="$emit('set-adj-prev-to-current', nodeId)"
        >
            Set {{ nodeId }}'s adjacent vertices' previous vertex to
            {{ currentVertexName }}
        </button>
    </div>
</template>
