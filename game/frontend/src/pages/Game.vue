<script setup lang="ts">
import { ref } from "vue";
import BFS from "./BFS/BFS.vue";
import DFS from "./DFS/DFS.vue";
import Dijkstras from "./Dijkstra/Dijkstras.vue";
import BFSVis from "./BFS/BFSVis.vue";
import BFSGuided from "./BFS/BFSGuided.vue";
import BFSDIY from "./BFS/BFSDIY.vue";
import DFSVis from "./DFS/DFSVis.vue";
import DFSGuided from "./DFS/DFSGuided.vue";
import DFSDIY from "./DFS/DFSDIY.vue";
import DijkstraVis from "./Dijkstra/DijkstraVis.vue";
import DijkstraGuided from "./Dijkstra/DijkstraGuided.vue";
import DijkstraDIY from "./Dijkstra/DijkstraDIYbustcache.vue";
import { Pages } from "../utils/pages";

const page = ref<Pages | null>(null);
</script>

<template>
    <div class="border-b">
        <div class="mb-2 grid grid-cols-3 mx-5">
            <div>
                <BFS
                    @vis="page = Pages.BFS_Vis"
                    @guided="page = Pages.BFS_Guided"
                    @diy="page = Pages.BFS_DIY"
                />
            </div>
            <div>
                <DFS
                    @vis="page = Pages.DFS_Vis"
                    @guided="page = Pages.DFS_Guided"
                    @diy="page = Pages.DFS_DIY"
                />
            </div>
            <div>
                <Dijkstras
                    @vis="page = Pages.Dijkstra_Vis"
                    @guided="page = Pages.Dijkstra_Guided"
                    @diy="page = Pages.Dijkstra_DIY"
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
        <template v-if="page === Pages.BFS_Vis">
            <BFSVis />
        </template>
        <template v-else-if="page === Pages.BFS_Guided">
            <BFSGuided />
        </template>
        <template v-else-if="page === Pages.BFS_DIY">
            <BFSDIY />
        </template>
        <template v-else-if="page === Pages.DFS_Vis">
            <DFSVis />
        </template>
        <template v-else-if="page === Pages.DFS_Guided">
            <DFSGuided />
        </template>
        <template v-else-if="page === Pages.DFS_DIY">
            <DFSDIY />
        </template>
        <template v-else-if="page === Pages.Dijkstra_Vis">
            <DijkstraVis />
        </template>
        <template v-else-if="page === Pages.Dijkstra_Guided">
            <DijkstraGuided />
        </template>
        <template v-else-if="page === Pages.Dijkstra_DIY">
            <DijkstraDIY />
        </template>
    </div>
</template>
