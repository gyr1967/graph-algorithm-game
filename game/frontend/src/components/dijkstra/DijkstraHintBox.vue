<script setup lang="ts">
import { ref } from "vue";
import { DijkstraStep } from "../../types/Dijkstra.ts";
const props = defineProps<{
    text: DijkstraStep | null;
    currentVertexName: string;
    started: boolean;
    queue?: string[];
    guidedOrDiy: "guided" | "diy";
}>();
const obscureHint = ref<boolean>(props.guidedOrDiy === "diy");
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div class="flex justify-between">
            <div v-if="!started">
                <span>Click start!</span>
            </div>
            <div v-else :class="obscureHint ? 'blur-sm select-none' : ''">
                <span v-if="text === 'set-source-to-zero'">
                    Set the source vertex distance to zero</span
                >
                <span v-else-if="text === 'update-distance'">
                    Add {{ currentVertexName }} to the queue</span
                >
                <span v-else-if="text === 'remove-and-set-to-current'">
                    Remove the vertex with the least distance from the queue and
                    set it as the current vertex
                </span>
                <span v-else-if="text === 'set-adj-prev-to-current'">
                    >Mark {{ currentVertexName }} as visited</span
                >
                <span v-else-if="text === 'done'">Done!</span>
            </div>
            <div v-if="started && guidedOrDiy === 'diy'" class="ml-2">
                <span
                    class="cursor-help"
                    @mouseenter="
                        () => {
                            obscureHint = false;
                        }
                    "
                    @mouseleave="
                        () => {
                            obscureHint = true;
                        }
                    "
                    >Hint</span
                >
            </div>
        </div>
    </div>
</template>
