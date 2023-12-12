<script setup lang="ts">
import { DijkstraStep } from "../../types/Dijkstra";

defineProps<{
    currentStep: DijkstraStep | null;
    noHighlighting?: boolean;
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <ul class="ml-4 list-disc">
            <li
                :class="
                    currentStep === 'set-source-to-zero' && !noHighlighting
                        ? 'bg-white text-black rounded-sm'
                        : ''
                "
            >
                Set source vertex distance to zero
            </li>
            <li>While the queue is not empty:</li>
            <ul class="ml-8 list-disc">
                <li
                    :class="
                        currentStep === 'remove-and-set-to-current' &&
                        !noHighlighting
                            ? 'bg-white text-black rounded-sm'
                            : ''
                    "
                >
                    Remove the closest vertex to the source in the queue, and
                    make it the current vertex
                </li>
                <li>
                    For each vertex adjacent to the current vertex that is in
                    the queue:
                </li>
                <ul class="ml-8 list-disc">
                    <li>
                        If distance to current vertex + edge weight to adjacent
                        is less than adjacent's distance:
                    </li>
                    <ul class="ml-8 list-disc">
                        <li
                            :class="
                                currentStep === 'update-distance' &&
                                !noHighlighting
                                    ? 'bg-white text-black rounded-sm'
                                    : ''
                            "
                        >
                            Set the adjacent vertex's distance to distance to
                            current vertex + adjacent's edge weight
                        </li>
                        <li
                            :class="
                                currentStep === 'set-adj-prev-to-current' &&
                                !noHighlighting
                                    ? 'bg-white text-black rounded-sm'
                                    : ''
                            "
                        >
                            Set the adjacent vertex's previous vertex to the
                            current vertex
                        </li>
                    </ul>
                </ul>
            </ul>
        </ul>
    </div>
</template>
