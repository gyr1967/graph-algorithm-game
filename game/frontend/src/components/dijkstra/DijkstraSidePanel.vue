<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    currentVertexName: string;
    verticesToCheck: string[];
    distances: Record<string, number>;
}>();

const sortedVerticesToCheck = computed(() =>
    [...props.verticesToCheck].sort(
        (a, b) => props.distances[a] - props.distances[b],
    ),
);
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
            <span class="font-bold mr-2">Priority Queue</span>
            <div>
                <div
                    v-for="(item, index) in [
                        ...sortedVerticesToCheck,
                    ].reverse()"
                    :key="index"
                    class="border border-gray-300 rounded-sm px-2 py-1 mr-1"
                >
                    <span>{{ item }}</span>
                    <span class="text-sm ml-2">
                        d:
                        {{
                            distances[item] === Infinity ? "∞" : distances[item]
                        }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
