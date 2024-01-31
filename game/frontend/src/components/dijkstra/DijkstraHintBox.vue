<script setup lang="ts">
import { computed, ref } from "vue";
import { DijkstraStep } from "../../types/Dijkstra.ts";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";
const props = defineProps<{
    text: DijkstraStep | null;
    currentVertexName: string;
    started: boolean;
    queue?: string[];
    adjacentVertexName: string;
    distances?: Record<string, number>;
}>();

const smallestVertexDistanceInQueue = computed(() => {
    if (props.queue) {
        let minDistance = Infinity;
        let minVertex = "";
        for (let vertex of props.queue) {
            if (props.distances && props.distances[vertex] < minDistance) {
                minDistance = props.distances[vertex];
                minVertex = vertex;
            }
        }
        return minVertex;
    }
    return null;
});

const isBlurred = ref<boolean>(false);
const toggleBlur = () => {
    isBlurred.value = !isBlurred.value;
};
</script>
<template>
    <div
        class="border border-white p-4 rounded-md shadow-md flex justify-between"
    >
        <div>
            <span class="font-bold">Hint: </span>
            <div :class="isBlurred ? 'blur-sm' : ''">
                <div v-if="!started">
                    <span>Click start!</span>
                </div>
                <div v-else>
                    <span v-if="text === 'set-source-to-zero'">
                        Set the source vertex distance to zero</span
                    >
                    <span v-else-if="text === 'update-distance'">
                        Update the distance of an adjacent vertex</span
                    >
                    <span v-else-if="text === 'remove-and-set-to-current'">
                        Remove {{ smallestVertexDistanceInQueue }} from the
                        queue and set it as the current vertex
                    </span>
                    <span v-else-if="text === 'set-adj-prev-to-current'">
                        Set {{ adjacentVertexName }}'s previous vertex to
                        {{ currentVertexName }}</span
                    >
                    <span v-else-if="text === 'done'">Done!</span>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <button
                class="bg-white text-black rounded-sm p-1 mx-1 w-7 h-8"
                @click="toggleBlur()"
            >
                <EyeSlashIcon v-if="isBlurred" class="w-5 h-5" />
                <EyeIcon v-else class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>
