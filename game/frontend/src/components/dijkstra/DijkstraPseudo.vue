<script setup lang="ts">
import { ref } from "vue";
import { DijkstraStep } from "../../types/Dijkstra";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";

defineProps<{
    currentStep: DijkstraStep | null;
    noHighlighting?: boolean;
    isDiy: boolean;
}>();

const hideHighlights = ref<boolean>(false);
const toggleHighlights = () => {
    hideHighlights.value = !hideHighlights.value;
};
const isBlurred = ref<boolean>(false);
const toggleBlur = () => {
    isBlurred.value = !isBlurred.value;
};
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div class="flex justify-between mb-1">
            <div>
                <h2 class="text-xl font-bold">
                    Dijkstra's Shortest Path Algorithm
                </h2>
            </div>
            <div v-if="isDiy" class="flex">
                <button
                    class="bg-white text-black rounded-sm p-1 mx-1 w-7 h-8"
                    @click="toggleBlur()"
                >
                    <EyeSlashIcon v-if="isBlurred" class="w-5 h-5" />
                    <EyeIcon v-else class="w-5 h-5" />
                </button>
                <button
                    class="bg-white text-black rounded-sm p-1 mx-1 h-8 truncate"
                    @click="toggleHighlights()"
                >
                    {{ hideHighlights ? "Show" : "Hide" }} Highlights
                </button>
            </div>
        </div>
        <div :class="isBlurred ? 'blur-sm' : ''">
            <ul class="ml-4 list-disc">
                <li
                    :class="
                        currentStep === 'set-source-to-zero' &&
                        !noHighlighting &&
                        !hideHighlights
                            ? 'bg-white text-black rounded-sm'
                            : ''
                    "
                >
                    Set source vertex distance to zero
                </li>
                <li>While the priority queue is not empty:</li>
                <ul class="ml-8 list-disc">
                    <li
                        :class="
                            currentStep === 'remove-and-set-to-current' &&
                            !noHighlighting &&
                            !hideHighlights
                                ? 'bg-white text-black rounded-sm'
                                : ''
                        "
                    >
                        Remove the closest vertex to the source in the priority
                        queue, and make it the current vertex
                    </li>
                    <li>
                        For each neighbour of the current vertex that is in the
                        priority queue:
                    </li>
                    <ul class="ml-8 list-disc">
                        <li>
                            If distance to current vertex + edge weight to
                            neighbour is less than neighbour's distance:
                        </li>
                        <ul class="ml-8 list-disc">
                            <li
                                :class="
                                    currentStep === 'update-distance' &&
                                    !noHighlighting &&
                                    !hideHighlights
                                        ? 'bg-white text-black rounded-sm'
                                        : ''
                                "
                            >
                                Set the neighbour's distance to: distance to
                                current vertex + neighbour's edge weight
                            </li>
                            <li
                                :class="
                                    currentStep === 'set-adj-prev-to-current' &&
                                    !noHighlighting &&
                                    !hideHighlights
                                        ? 'bg-white text-black rounded-sm'
                                        : ''
                                "
                            >
                                Set the neighbour's previous vertex to the
                                current vertex
                            </li>
                        </ul>
                    </ul>
                </ul>
            </ul>
        </div>
    </div>
</template>
