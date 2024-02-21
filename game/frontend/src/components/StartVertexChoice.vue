<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { numToLetter } from "../utils/num-to-letter";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";
const props = defineProps<{
    disabled: boolean;
    numberOfVertices: number;
}>();
const emit = defineEmits(["update:sourceChoice"]);
const vertexChoices = computed(() => {
    return Array.from({ length: props.numberOfVertices }, (_, i) => ({
        id: numToLetter[i + 1],
    }));
});

const selectedVertexId = ref<Record<string, string>>(vertexChoices.value[0]);

watch(
    () => selectedVertexId.value,
    () => {
        emit("update:sourceChoice", selectedVertexId.value);
    },
);
</script>
<template>
    <div :class="disabled ? 'cursor-not-allowed' : ''">
        <Listbox v-model="selectedVertexId" :disabled="disabled">
            <div class="relative mt-1">
                <ListboxButton
                    :class="disabled ? 'bg-gray-600' : 'bg-white'"
                    class="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                    <span class="block truncate text-black">{{
                        selectedVertexId.id
                    }}</span>
                    <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                        <ChevronUpDownIcon
                            class="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </ListboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                        <ListboxOption
                            v-for="vertexId in vertexChoices"
                            v-slot="{ active, selected }"
                            :key="vertexId.id"
                            :value="vertexId"
                            as="template"
                        >
                            <li
                                :class="[
                                    active
                                        ? 'bg-amber-100 text-amber-900'
                                        : 'text-gray-900',
                                    'relative cursor-default select-none py-2 px-2',
                                ]"
                            >
                                <span
                                    :class="[
                                        selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                        'block truncate',
                                    ]"
                                    >{{ vertexId.id }}</span
                                >
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>
