<script setup lang="ts">
import { ref } from "vue";
import BFSVis from "./BFS/BFSVis.vue";
import BFSDIY from "./BFS/BFSDIY.vue";
import DFSVis from "./DFS/DFSVis.vue";
import DFSDIY from "./DFS/DFSDIY.vue";
import DijkstraVis from "./Dijkstra/DijkstraVis.vue";
import DijkstraDIY from "./Dijkstra/DijkstraDIY.vue";
import Footer from "../components/Footer.vue";
import type { Pages } from "../utils/pages";

const page = ref<Pages | null>(null);

const pagesList: { key: Pages; label: string }[] = [
    { key: "BFS_Vis", label: "BFS Visualisation" },
    { key: "BFS_DIY", label: "BFS DIY" },
    { key: "DFS_Vis", label: "DFS Visualisation" },
    { key: "DFS_DIY", label: "DFS DIY" },
    { key: "Dijkstra_Vis", label: "Dijkstra Visualisation" },
    { key: "Dijkstra_DIY", label: "Dijkstra DIY" },
];
</script>

<template>
    <div class="border-b">
        <div v-if="page === null">
            <div class="text-center text-2xl font-bold my-2">
                Select an algorithm to begin!
            </div>
        </div>
        <div class="flex justify-center my-2">
            <div>
                <div class="bg-gray-500 text-black rounded-md flex">
                    <button
                        v-for="currentPage in pagesList"
                        :key="currentPage.key"
                        :class="
                            page === currentPage.key
                                ? 'bg-white'
                                : 'bg-gray-500'
                        "
                        class="p-2 rounded-md"
                        @click="page = currentPage.key"
                    >
                        {{ currentPage.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-4 h-screen">
        <div
            v-if="page === 'BFS_Vis' || page === 'BFS_DIY'"
            class="text-center text-2xl font-bold my-2"
        >
            Breadth-First Search
        </div>
        <div
            v-else-if="page === 'DFS_Vis' || page === 'DFS_DIY'"
            class="text-center text-2xl font-bold my-2"
        >
            Depth-First Search
        </div>
        <div
            v-else-if="page === 'Dijkstra_Vis' || page === 'Dijkstra_DIY'"
            class="text-center text-2xl font-bold my-2"
        >
            Dijkstra's Shortest Path Algorithm
        </div>
        <template v-if="page === 'BFS_Vis'">
            <BFSVis />
        </template>
        <template v-else-if="page === 'BFS_DIY'">
            <BFSDIY />
        </template>
        <template v-else-if="page === 'DFS_Vis'">
            <DFSVis />
        </template>
        <template v-else-if="page === 'DFS_DIY'">
            <DFSDIY />
        </template>
        <template v-else-if="page === 'Dijkstra_Vis'">
            <DijkstraVis />
        </template>
        <template v-else-if="page === 'Dijkstra_DIY'">
            <DijkstraDIY />
        </template>
    </div>
    <div class="w-full mt-64">
        <Footer />
    </div>
</template>
