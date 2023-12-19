<script setup lang="ts">
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
</script>

<template>
    <div class="flex justify-center mb-2 p-2 text-xl font-bold">
        <span>{{ title }}</span>
    </div>
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
