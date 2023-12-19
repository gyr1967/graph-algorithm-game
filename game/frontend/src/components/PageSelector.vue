<script setup lang="ts">
import BFSExplainDialog from "./BFSExplainDialog.vue";
import DFSExplainDialog from "./DFSExplainDialog.vue";
import DijkstraExplainDialog from "./DijkstraExplainDialog.vue";
import { ref } from "vue";

defineProps<{
    title: string;
    algorithm: "BFS" | "DFS" | "Dijkstra";
    leftButtonSelected: boolean;
    rightButtonSelected: boolean;
}>();
const emit = defineEmits(["vis", "diy"]);
const page = ref<"vis" | "diy" | null>(null);
const setPage = (emitEvent: "vis" | "diy") => {
    page.value = emitEvent;
    emit(emitEvent);
};
const showHelp = ref(false);

const openModal = () => {
    showHelp.value = true;
};
const closeModal = () => {
    showHelp.value = false;
};
</script>

<template>
    <div class="flex justify-center items-center mb-2 p-2">
        <span class="text-xl font-bold">{{ title }}</span>
        <button class="mx-2" @click="openModal()">?</button>
    </div>
    <BFSExplainDialog
        v-if="algorithm === 'BFS'"
        :is-open="showHelp"
        @close-modal="closeModal()"
    />
    <DFSExplainDialog
        v-else-if="algorithm === 'DFS'"
        :is-open="showHelp"
        @close-modal="closeModal()"
    />
    <DijkstraExplainDialog
        v-else-if="algorithm === 'Dijkstra'"
        :is-open="showHelp"
        @close-modal="closeModal()"
    />
    <div class="flex justify-center">
        <div class="mx-1">
            <button
                :class="leftButtonSelected ? 'bg-gray-600' : 'bg-white'"
                class="rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                @click="setPage('vis')"
            >
                Visualisation
            </button>
        </div>
        <div class="mx-1">
            <button
                :class="rightButtonSelected ? 'bg-gray-500' : 'bg-white'"
                class="rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                @click="setPage('diy')"
            >
                DIY
            </button>
        </div>
    </div>
</template>
