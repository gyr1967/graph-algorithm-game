<script setup lang="ts">
defineProps<{
    nodeId: string;
}>();
</script>
<template>
    <div class="flex justify-center items-center">
        <span>{{ nodeId }}</span>
        <button class="border border-white p-1 rounded-sm ml-1">
            Add to Queue
        </button>
        <button class="border border-white p-1 rounded-sm ml-1">Visit</button>
        <button class="border border-white p-1 rounded-sm ml-1">
            Set to v
        </button>
    </div>
</template>
