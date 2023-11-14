<script setup lang="ts">
defineProps<{
    currentVertexName: string;
    currentQueue: string[];
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div class="mb-2">
            <span class="font-bold">V:</span>
            <span class="ml-2">{{ currentVertexName }}</span>
        </div>
        <div>
            <span class="font-bold">Queue:</span>
            <span class="ml-2">{{ currentQueue }}</span>
        </div>
    </div>
</template>
