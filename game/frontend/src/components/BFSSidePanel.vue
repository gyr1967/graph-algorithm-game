<script setup lang="ts">
defineProps<{
    currentVertexName: string;
}>();
</script>
<template>
    <div>
        {{ currentVertexName }}
    </div>
</template>
