<script setup lang="ts">
import BFS from "./BFS/BFS.vue";
import DFS from "./DFS/DFS.vue";
import Dijkstras from "./Dijkstra/Dijkstras.vue";
</script>

<template>
    <div class="grid grid-cols-3 mx-5">
        <div>
            <BFS />
        </div>
        <div>
            <DFS />
        </div>
        <div>
            <Dijkstras />
        </div>
    </div>
</template>
