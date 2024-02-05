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
                                Breadth-First Search
                            </DialogTitle>
                            <div class="mt-2">
                                <div class="text-sm text-gray-500">
                                    <p>
                                        Breadth-First Search (BFS) is a graph
                                        traversal algorithm. This means that it
                                        aims to find or 'visit' all the vertices
                                        in an unexplored graph.
                                    </p>
                                    <p>
                                        It does this by making use of a 'queue'.
                                        A queue is a data structure that works
                                        exactly the same as the queues we humans
                                        make when waiting in line; The first
                                        person in is the first person out.
                                    </p>
                                    <p>
                                        BFS adds vertices to the queue, then
                                        removes the first in the queue, 'visits'
                                        it, then adds all of that vertex's
                                        unvisited neighbours to the queue, until
                                        there are no more vertices to visit.
                                    </p>
                                    <p>
                                        The reason it's called Breadth-First is
                                        because the algorithm explores wide
                                        instead of tunneling deep down one
                                        avenue like Depth-First Search does.
                                    </p>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
