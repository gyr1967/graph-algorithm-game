<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";
defineProps<{
    isOpen: boolean;
}>();
defineEmits(["closeModal"]);
</script>
<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="$emit('closeModal')">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                                Dijkstra's Shortest Path
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    Depth-First search is an algorithm that
                                    finds the shortest distance from a source
                                    vertex to all other vertices in a graph.
                                    Unlike the other two algorithms, Dijkstra's
                                    algorithm only works on graphs that are
                                    weighted. If a graph has is weighted, that
                                    means that each edge has a certain cost tied
                                    to it. Imagine a map of a country, where
                                    each city is a vertex and each road is an
                                    edge. The weight of each edge would be the
                                    distance between the two cities. It is a
                                    common problem in computing science to find
                                    the shortest path between two vertices in a
                                    graph. An example of where this kind of
                                    algorithm is used is Google Maps on your
                                    phone. When you ask for directions from one
                                    place to another, Google Maps uses an
                                    algorithm similar to Dijkstra's to find the
                                    shortest path from the source (where you
                                    are) to the destination.
                                </p>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
