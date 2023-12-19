<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["hideHints", "hidePseudo", "hideHighlights"]);
const hideHints = ref<boolean>(false);
const hidePseudocode = ref<boolean>(false);
const hideHighlights = ref<boolean>(false);

const toggleVisibility = (
    emitEvent: "hideHints" | "hidePseudo" | "hideHighlights",
) => {
    if (emitEvent === "hideHints") hideHints.value = !hideHints.value;
    else if (emitEvent === "hidePseudo")
        hidePseudocode.value = !hidePseudocode.value;
    else if (emitEvent === "hideHighlights")
        hideHighlights.value = !hideHighlights.value;

    emit(emitEvent);
};
</script>

<template>
    <div class="border border-white p-4 rounded-md shadow-md">
        <div class="flex justify-between">
            <button
                class="rounded-sm text-black p-2 hover:bg-gray-400 bg-white"
                @click="toggleVisibility('hidePseudo')"
            >
                {{ hidePseudocode ? "Show" : "Hide" }} Pseudocode
            </button>
            <button
                class="rounded-sm text-black p-2 hover:bg-gray-400 bg-white"
                @click="toggleVisibility('hideHighlights')"
            >
                {{ hideHighlights ? "Show" : "Hide" }} highlighting
            </button>
            <button
                class="rounded-sm text-black p-2 hover:bg-gray-400 bg-white"
                @click="toggleVisibility('hideHints')"
            >
                {{ hideHints ? "Show" : "Hide" }} Hints
            </button>
        </div>
    </div>
</template>
