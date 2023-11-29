<script setup lang="ts">
const root = "/graph-algorithm-game";
</script>

<template>
    <div class="flex justify-center h-screen items-center w-screen">
        <div class="mr-2">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/dfs/visualise`"
            >
                Visualisation
            </RouterLink>
        </div>
        <div class="mr-2">
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/dfs/guided`"
            >
                Guided
            </RouterLink>
        </div>
        <div>
            <RouterLink
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                :to="`${root}/game/dfs/solo`"
            >
                DIY
            </RouterLink>
        </div>
    </div>
</template>
