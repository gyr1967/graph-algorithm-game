<script setup lang="ts">
const root = "/graph-algorithm-game";
</script>

<template>
    <div class="flex justify-center mb-2 p-2 text-xl font-bold">
        <span>Breadth-first Search</span>
    </div>
    <div class="flex justify-center">
        <div class="mx-1">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/bfs/visualise`"
            >
                Visualisation
            </RouterLink>
        </div>
        <div class="mx-1">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/bfs/guided`"
            >
                Guided
            </RouterLink>
        </div>
        <div class="mx-1">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/bfs/diy`"
            >
                DIY
            </RouterLink>
        </div>
    </div>
</template>
