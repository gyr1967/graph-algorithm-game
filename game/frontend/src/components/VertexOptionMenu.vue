<script setup lang="ts">
defineProps<{
    text: string;
    nodeId: string;
}>();
defineEmits(["add-to-queue", "visit", "set-to-current"]);
</script>
<template>
    <div class="flex justify-center">
        <span>{{ text }}</span>
    </div>
    <div class="flex justify-center items-center">
        <button
            class="border border-white p-1 rounded-sm ml-1"
            @click="$emit('add-to-queue', nodeId)"
        >
            Add to Queue
        </button>
        <button
            class="border border-white p-1 rounded-sm ml-1"
            @click="$emit('visit', nodeId)"
        >
            Visit
        </button>
        <button
            class="border border-white p-1 rounded-sm ml-1"
            @click="$emit('set-to-current', nodeId)"
        >
            Set to current vertex
        </button>
    </div>
</template>
