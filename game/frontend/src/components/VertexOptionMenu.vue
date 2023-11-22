<script setup lang="ts">
defineProps<{
    text: string;
    disabled: boolean;
    nodeId: string;
}>();
defineEmits(["add-to-queue", "visit", "remove-and-set-to-current"]);
</script>
<template>
    <div class="flex justify-center">
        <span>{{ text }}</span>
    </div>
    <div class="flex justify-center items-center">
        <button
            :disabled="disabled"
            class="border border-white p-1 rounded-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('add-to-queue', nodeId)"
        >
            Add {{ nodeId }} to Queue
        </button>
        <button
            :disabled="disabled"
            class="border border-white p-1 rounded-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('visit', nodeId)"
        >
            Mark {{ nodeId }} as visited
        </button>
    </div>
    <div class="flex justify-center mt-2">
        <button
            :disabled="disabled"
            class="border border-white p-1 rounded-sm ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('remove-and-set-to-current', nodeId)"
        >
            Remove {{ nodeId }} from queue and set to current vertex
        </button>
    </div>
</template>
