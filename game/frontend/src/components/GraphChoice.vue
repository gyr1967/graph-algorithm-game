<script setup lang="ts">
import { ref, watch } from "vue";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";
const props = defineProps<{
    disabled?: boolean;
    numberOfGraphs: number;
    startingGraph?: number;
}>();
const emit = defineEmits(["update:graphChoice"]);

const graphChoices = [1, 2, 3];

const selectedGraph = ref<number>(props.startingGraph ?? 1);

watch(
    () => selectedGraph.value,
    () => {
        emit("update:graphChoice", selectedGraph.value);
    },
);
</script>
<template>
    <div :class="disabled ? 'cursor-not-allowed' : ''">
        <Listbox v-model="selectedGraph" :disabled="disabled">
            <div class="relative mt-1">
                <ListboxButton
                    :class="disabled ? 'bg-gray-600' : 'bg-white'"
                    class="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md sm:text-sm"
                >
                    <span class="block truncate text-black">{{
                        selectedGraph
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
                >
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                    >
                        <ListboxOption
                            v-for="graph in graphChoices"
                            v-slot="{ active, selected }"
                            :key="graph"
                            :value="graph"
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
                                    >{{ graph }}</span
                                >
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>
