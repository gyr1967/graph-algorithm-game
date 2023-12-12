<script setup lang="ts">
import VisDijkstraGraph from "../../components/dijkstra/VisDijkstraGraphDisplay.vue";
import DijkstraPseudo from "../../components/dijkstra/DijkstraPseudo.vue";
import SidePanel from "../../components/SidePanel.vue";
import { ref } from "vue";
import { DFSStep } from "../../types/DFS";
const currentVertexName = ref<string>("");
const currentStack = ref<string[]>([]);
const pseudoStep = ref<DFSStep | null>(null);
</script>

<template>
    <div class="grid grid-cols-3">
        <div class="ml-2">
            <DijkstraPseudo :current-step="pseudoStep" bfs-or-dfs="dfs" />
        </div>
        <div class="flex justify-center items-center">
            <div class="inline-block justify-self-center self-center">
                <VisDijkstraGraph :which-graph-data="1" :scaling-factor="1.2" />
            </div>
        </div>
        <div class="text-center">
            <SidePanel
                :current-vertex-name="currentVertexName"
                :current-stack="currentStack"
                bfs-or-dfs="dfs"
            />
        </div>
    </div>
</template>
