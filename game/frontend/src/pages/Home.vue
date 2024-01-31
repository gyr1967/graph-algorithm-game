<script setup lang="ts">
import FAQ from "../components/FAQ.vue";
import Explanations from "../components/Explanations.vue";
</script>

<template>
    <div class="flex flex-col items-center h-screen mx-2">
        <h1>Welcome!</h1>
        <FAQ />
        <Explanations class="my-4" />
    </div>
</template>
