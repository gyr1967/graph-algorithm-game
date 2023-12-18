<script setup lang="ts">
import { ref } from "vue";
import { Pages } from "../../utils/pages";

defineEmits(["vis", "guided", "diy"]);
const page = ref<Pages | null>(null);
</script>

<template>
    <div class="flex justify-center mb-2 p-2 text-xl font-bold">
        <span>Depth-first Search</span>
    </div>
    <div class="flex justify-center">
        <div class="mx-1">
            <button
                :class="page === Pages.DFS_Vis ? 'bg-gray-500' : ''"
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                @click="
                    () => {
                        page = Pages.DFS_Vis;
                        $emit('vis');
                    }
                "
            >
                Visualisation
            </button>
        </div>
        <div class="mx-1">
            <button
                :class="page === Pages.DFS_Guided ? 'bg-gray-500' : ''"
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                @click="
                    () => {
                        page = Pages.DFS_Guided;
                        $emit('guided');
                    }
                "
            >
                Guided
            </button>
        </div>
        <div class="mx-1">
            <button
                :class="page === Pages.DFS_DIY ? 'bg-gray-500' : ''"
                class="bg-white rounded-sm text-black p-2 text-xl hover:bg-gray-400"
                @click="
                    () => {
                        page = Pages.DFS_DIY;
                        $emit('diy');
                    }
                "
            >
                DIY
            </button>
        </div>
    </div>
</template>
