<script setup lang="ts">
import { ref } from "vue";
import BFSExplainDialog from "./BFSExplainDialog.vue";
import DFSExplainDialog from "./DFSExplainDialog.vue";
import DijkstraExplainDialog from "./DijkstraExplainDialog.vue";

const bfsOpen = ref<boolean>(false);
const dfsOpen = ref<boolean>(false);
const dijkstraOpen = ref<boolean>(false);
</script>
<template>
    <div>
        <div>
            <button
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="bfsOpen = !bfsOpen"
            >
                What is BFS?
            </button>
            <BFSExplainDialog
                :is-open="bfsOpen"
                @close-modal="bfsOpen = false"
            />
            <button
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="dfsOpen = !dfsOpen"
            >
                What is DFS?
            </button>
            <DFSExplainDialog
                :is-open="dfsOpen"
                @close-modal="dfsOpen = false"
            />
            <button
                class="bg-white text-black rounded-sm p-1 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
                @click="dijkstraOpen = !dijkstraOpen"
            >
                What is Dijkstra's?
            </button>
            <DijkstraExplainDialog
                :is-open="dijkstraOpen"
                @close-modal="dijkstraOpen = false"
            />
        </div>
    </div>
</template>
