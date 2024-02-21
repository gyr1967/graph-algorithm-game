<script setup lang="ts">
import FAQ from "../components/FAQ.vue";
import Explanations from "../components/Explanations.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
    <div class="flex flex-col items-center h-screen mx-2">
        <h1>Welcome!</h1>
        <FAQ />
        <Explanations class="my-4" />
        <div class="mt-4">
            <router-link
                to="/graph-algorithm-game/game"
                class="bg-white text-black text-xl rounded-sm p-4 mx-1 hover:bg-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                The Game Section!
            </router-link>
        </div>
        <Footer class="mt-auto w-full" />
    </div>
</template>
