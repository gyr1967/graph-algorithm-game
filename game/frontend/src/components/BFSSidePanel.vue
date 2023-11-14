<script setup lang="ts">
defineProps<{
    currentVertexName: string;
    currentQueue: string[];
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div class="mb-2 flex items-center">
            <span class="font-bold">V:</span>
            <span class="ml-2">{{ currentVertexName }}</span>
        </div>
        <div class="flex items-center">
            <span class="font-bold mr-2">Queue:</span>
            <div class="flex">
                <div
                    v-for="(item, index) in currentQueue"
                    :key="index"
                    class="border border-gray-300 rounded-sm px-2 py-1 mr-1"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>
