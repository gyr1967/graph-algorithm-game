<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <NavBar />
        <RouterView class="mb-auto" />
        <Footer />
    </div>
</template>
