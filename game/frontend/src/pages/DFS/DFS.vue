<script setup lang="ts">
const root = "/graph-algorithm-game";
</script>

<template>
    <div class="flex justify-center mb-2 p-2 text-xl font-bold">
        <span>Depth-first Search</span>
    </div>
    <div class="flex justify-center">
        <div class="mx-1">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/dfs/visualise`"
            >
                Visualisation
            </RouterLink>
        </div>
        <div class="mx-1">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/dfs/guided`"
            >
                Guided
            </RouterLink>
        </div>
        <div class="mx-1">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/dfs/diy`"
            >
                DIY
            </RouterLink>
        </div>
    </div>
</template>
