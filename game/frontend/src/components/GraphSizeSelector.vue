<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);

const graphSize = ref(1);

watch(graphSize, (newGraphSize) => {
    emit("update:modelValue", newGraphSize);
});
</script>

<template>
    <div class="flex items-center">
        <label class="mr-2">Zoom</label>
        <div class="flex">
            <input
                v-model="graphSize"
                type="range"
                min="1"
                max="2"
                step="0.1"
                class="mr-2"
            />
            <p>{{ graphSize }}</p>
        </div>
    </div>
</template>
