<script setup lang="ts">
const root = "/graph-algorithm-game";
</script>

<template>
    <div class="border-b mb-6 bg-gray-800">
        <nav
            class="container px-6 py-6 mx-auto md:flex md:justify-between md:items-center"
        >
            <div class="flex items-center justify-between">
                <router-link
                    :to="`${root}/`"
                    class="text-xl font-bold text-white-800 md:text-2xl hover:text-gray-400"
                >
                    Graph Algorithm Game
                </router-link>
            </div>
            <ul
                class="flex flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
            >
                <li
                    class="text-sm font-bold text-white-800 hover:text-gray-400"
                >
                    <RouterLink :to="`${root}/`"> Home </RouterLink>
                </li>
                <li
                    class="text-sm font-bold text-white-800 hover:text-gray-400"
                >
                    <RouterLink :to="`${root}/game`"> Game </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
