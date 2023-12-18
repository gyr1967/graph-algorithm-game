<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import PseudoExplain from "./PseudoExplain.vue";
</script>
<template>
    <div class="w-full px-4 pt-16">
        <div class="mx-auto w-full max-w-xl rounded-2xl bg-gray-600 p-2">
            <Disclosure v-slot="{ open }">
                <DisclosureButton
                    class="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm text-black font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring"
                >
                    <span>What's this website about?</span>
                    <ChevronUpIcon
                        :class="open ? 'rotate-180 transform' : ''"
                        class="h-5 w-5 text-gray-500"
                    />
                </DisclosureButton>
                <DisclosurePanel class="px-4 pb-2 pt-4 text-sm">
                    <div class="bg-white p-4 rounded-md shadow-md text-black">
                        <p>
                            The purpose of this website is to help build
                            understanding of simple graph algorithms. Right now
                            the scope covers Breadth First Search, Depth First
                            Search, and Dijkstra's Algorithm.
                        </p>
                        <p>
                            It is very common to see visualisation of
                            algorithms, whether it's in a youtube video or on a
                            website similar to this one, however it is not as
                            common to find a way to do the algorithms yourself
                            without using pen and paper which can be hard to
                            keep track of and is quite a lot of effort.
                        </p>
                        <p>
                            I find I can learn much better if I go through the
                            motions of whatever I'm learning myself, which is
                            the motivation behind these 'games' that let you,
                            the player, carry out the steps of some different
                            algorithms.
                        </p>
                        <p>Hopefully you enjoy!</p>
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <Disclosure v-slot="{ open }">
                <DisclosureButton
                    class="flex w-full justify-between rounded-lg bg-white px-4 py-2 mt-2 text-left text-sm text-black font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring"
                >
                    <span>How does pseudocode work?</span>
                    <ChevronUpIcon
                        :class="open ? 'rotate-180 transform' : ''"
                        class="h-5 w-5 text-gray-500"
                    />
                </DisclosureButton>
                <DisclosurePanel class="px-4 pb-2 pt-4 text-sm">
                    <PseudoExplain />
                </DisclosurePanel>
            </Disclosure>
        </div>
    </div>
</template>
