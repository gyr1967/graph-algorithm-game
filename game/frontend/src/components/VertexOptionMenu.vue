<script setup lang="ts">
const props = defineProps<{
    text: string;
    disabled: boolean;
    nodeId: string;
    bfsOrDfs: "bfs" | "dfs";
}>();
defineEmits([
    "add-to-queue",
    "visit",
    "remove-and-set-to-current",
    "add-to-stack",
]);
const stackOrQueue = props.bfsOrDfs === "bfs" ? "queue" : "stack";
</script>
<template>
    <div class="flex justify-center">
        <span>{{ text }}</span>
    </div>
    <div class="grid grid-rows-3 gap-2">
        <div class="flex justify-center">
            <button
                :disabled="disabled"
                class="rounded-sm text-black p-1 hover:bg-gray-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                class="rounded-sm text-black p-1 hover:bg-gray-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                @click="$emit('visit', nodeId)"
            >
                Mark {{ nodeId }} as visited
            </button>
        </div>
        <div class="flex justify-center">
            <button
                :disabled="disabled"
                class="rounded-sm text-black p-1 hover:bg-gray-400 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                @click="$emit('remove-and-set-to-current', nodeId)"
            >
                Remove {{ nodeId }} from {{ stackOrQueue }} and set to current
                vertex
            </button>
        </div>
    </div>
</template>
