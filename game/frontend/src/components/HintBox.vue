<script setup lang="ts">
defineProps<{
    text: string;
}>();
</script>
<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <span>{{ text }}</span>
    </div>
</template>
