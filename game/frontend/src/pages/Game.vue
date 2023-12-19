<script setup lang="ts">
import { ref } from "vue";
import PageSelector from "./PageSelector.vue";
import BFSVis from "./BFS/BFSVis.vue";
import BFSDIY from "./BFS/BFSDIY.vue";
import DFSVis from "./DFS/DFSVis.vue";
import DFSDIY from "./DFS/DFSDIY.vue";
import DijkstraVis from "./Dijkstra/DijkstraVis.vue";
import DijkstraDIY from "./Dijkstra/DijkstraDIYbustcache.vue";
import type { Pages } from "../utils/pages";

const page = ref<Pages | null>(null);
</script>

<template>
    <div class="border-b">
        <div class="mb-2 grid grid-cols-3 mx-5">
            <div>
                <PageSelector
                    title="Breadth-first Search"
                    algorithm="BFS"
                    :left-button-selected="page === 'BFS_Vis'"
                    :right-button-selected="page === 'BFS_DIY'"
                    @vis="page = 'BFS_Vis'"
                    @diy="page = 'BFS_DIY'"
                />
            </div>
            <div>
                <PageSelector
                    title="Depth-first Search"
                    algorithm="DFS"
                    :left-button-selected="page === 'DFS_Vis'"
                    :right-button-selected="page === 'DFS_DIY'"
                    @vis="page = 'DFS_Vis'"
                    @diy="page = 'DFS_DIY'"
                />
            </div>
            <div>
                <PageSelector
                    title="Dijkstra's Shortest Path"
                    algorithm="Dijkstra"
                    :left-button-selected="page === 'Dijkstra_Vis'"
                    :right-button-selected="page === 'Dijkstra_DIY'"
                    @vis="page = 'Dijkstra_Vis'"
                    @diy="page = 'Dijkstra_DIY'"
                />
            </div>
        </div>
    </div>
    <div class="mt-4 h-screen">
        <template v-if="page === null">
            <div class="text-center text-2xl font-bold">
                Select an algorithm to begin!
            </div>
        </template>
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
</template>
