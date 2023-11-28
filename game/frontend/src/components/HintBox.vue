<script setup lang="ts">
import { BFSStep } from "../types/BFS";

defineProps<{
    text: BFSStep | null;
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <span>{{ text ?? "Something is up..." }}</span>
    </div>
</template>
