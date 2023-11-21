<script setup lang="ts">
defineProps<{
    currentVertexName: string;
    currentQueue: string[];
}>();
</script>
<template>
    <div class="border border-white p-3 rounded-md shadow-md grid grid-cols-2">
        <div class="mb-2">
            <span class="font-bold">Current Vertex:</span>
            <span class="ml-2">{{ currentVertexName }}</span>
        </div>
        <div>
            <span class="font-bold mr-2">Queue</span>
            <div>
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
