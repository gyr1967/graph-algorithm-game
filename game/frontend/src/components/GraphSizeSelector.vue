<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);

const graphSize = ref(4);

watch(graphSize, (newGraphSize) => {
    emit("update:modelValue", newGraphSize);
});
</script>

<template>
    <div class="flex items-center">
        <label class="mr-2">Number of Vertices</label>
        <div class="flex">
            <input
                v-model="graphSize"
                type="range"
                min="4"
                max="12"
                step="1"
                class="mr-2"
            />
            <p>{{ graphSize }}</p>
        </div>
    </div>
</template>
