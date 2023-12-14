<script setup lang="ts">
const props = defineProps<{
    currentVertexName: string;
    currentQueue?: string[];
    currentStack?: string[];
    bfsOrDfs: "bfs" | "dfs";
}>();
const stackOrQueue = props.bfsOrDfs === "bfs" ? "Queue" : "Stack";
</script>
<template>
    <div class="border border-white p-3 rounded-md shadow-md grid grid-cols-2">
        <div class="mb-2">
            <div>
                <span class="font-bold">Current Vertex</span>
            </div>
            <div>
                <span class="ml-2 text-4xl">{{ currentVertexName }}</span>
            </div>
        </div>
        <div>
            <span class="font-bold mr-2">{{ stackOrQueue }}</span>
            <div v-if="bfsOrDfs === 'bfs' && currentQueue !== undefined">
                <div
                    v-for="(item, index) in [...currentQueue].reverse()"
                    :key="index"
                    class="border border-gray-300 rounded-sm px-2 py-1 mr-1"
                >
                    <span>{{ item }}</span>
                    <span v-if="index === currentQueue.length - 1">
                        (Front)
                    </span>
                </div>
            </div>
            <div v-else-if="currentStack !== undefined">
                <div
                    v-for="(item, index) in [...currentStack].reverse()"
                    :key="index"
                    class="border border-gray-300 rounded-sm px-2 py-1 mr-1"
                >
                    <span>{{ item }}</span>
                    <span v-if="index === 0"> (Top) </span>
                </div>
            </div>
        </div>
    </div>
</template>
