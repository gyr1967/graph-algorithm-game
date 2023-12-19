<script setup lang="ts">
import { ref } from "vue";
// import type { Pages } from "../utils/pages";

defineProps<{
    title: string;
    algorithm: "BFS" | "DFS" | "Dijkstra";
}>();
const emit = defineEmits(["vis", "diy"]);
const page = ref<"vis" | "diy" | null>(null);
const setPage = (emitEvent: "vis" | "diy") => {
    emit(emitEvent);
};
</script>

<template>
    <div class="flex justify-center mb-2 p-2 text-xl font-bold">
        <span>{{ title }}</span>
    </div>
    <div class="flex justify-center">
        <div class="mx-1">
            <button
                :class="page === 'vis' ? 'bg-gray-500' : ''"
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                @click="setPage('vis')"
            >
                Visualisation
            </button>
        </div>
        <div class="mx-1">
            <button
                :class="page === 'diy' ? 'bg-gray-500' : ''"
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                @click="setPage('diy')"
            >
                DIY
            </button>
        </div>
    </div>
</template>
