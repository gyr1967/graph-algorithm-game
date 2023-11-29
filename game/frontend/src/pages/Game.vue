<script setup lang="ts">
const root = "/graph-algorithm-game";
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <RouterLink
            class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
            :to="`${root}/game/bfs`"
        >
            Breadth-First Search
        </RouterLink>
        <RouterLink
            class="mt-2 bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
            :to="`${root}/game/dfs`"
        >
            Depth-First Search
        </RouterLink>
    </div>
</template>
