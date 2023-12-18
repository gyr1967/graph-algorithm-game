<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";
import { ref, nextTick } from "vue";
const x = ref<number>(0);
const y = ref<number>(0);
const confettiExplode = ref<boolean>(false);
const error = ref<boolean>(false);
const confetti = async () => {
    confettiExplode.value = false;
    await nextTick();
    confettiExplode.value = true;
};

const whileYLessThanTen = () => {
    while (y.value < 10) {
        y.value++;
    }
};
</script>
<template>
    <ConfettiExplosion v-if="confettiExplode" />
    <div class="bg-white p-4 rounded-md shadow-md text-black">
        <p>
            Pseudocode is a way of representing an algorithm that is
            human-readable (think a cake recipe) but also similar to the code we
            would write that tells the computer what to do.
        </p>
        <p>It is to be read left to right, top to bottom.</p>
        <p>
            In the pseudocode on this website, we have some things to watch out
            for - 'if conditions' and 'while loops'.
        </p>
        <p>
            'If conditions' are like a fork in the road - if the condition is
            true, we go down one path, if it is false, we go down another
            (sometimes we do nothing and keep going!).
        </p>
        <p>
            'While loops' repeat a block of code until the condition is false.
        </p>
        <div class="grid grid-cols-2">
            <div>
                <div>
                    <h2 class="text-xl font-bold">An if condition</h2>
                </div>
                <div>
                    <ul class="ml-4 list-disc">
                        <li>if x is less than 10:</li>
                    </ul>
                    <ul class="ml-8 list-disc">
                        <li>confetti!</li>
                    </ul>
                    <ul class="ml-4 list-disc">
                        <li>else:</li>
                    </ul>
                    <ul class="ml-8 list-disc">
                        <li>show an error</li>
                    </ul>
                </div>
                <div class="mt-2">
                    <div class="flex">
                        <input
                            v-model="x"
                            class="border border-gray-400 rounded-md p-1 w-8"
                        />
                        <button
                            class="bg-gray-600 text-white font-bold py-2 px-4 mx-1 rounded"
                            @click="
                                () => {
                                    error = false;
                                    if (x < 10) {
                                        confetti();
                                    } else {
                                        error = true;
                                    }
                                }
                            "
                        >
                            Evaluate
                        </button>
                    </div>
                </div>
                <span v-if="error" class="text-red-500">an error!</span>
            </div>
            <div>
                <div>
                    <h2 class="text-xl font-bold">A while loop</h2>
                </div>
                <div>
                    <ul class="ml-4 list-disc">
                        <li>while y is less than 10:</li>
                    </ul>
                    <ul class="ml-8 list-disc">
                        <li>Add 1 to y</li>
                    </ul>
                </div>
                <div class="flex items-center mt-2">
                    <div>
                        <button
                            class="bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            @click="whileYLessThanTen()"
                        >
                            Evaluate
                        </button>
                    </div>
                    <div class="mx-4">
                        <span class="">y: {{ y }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
