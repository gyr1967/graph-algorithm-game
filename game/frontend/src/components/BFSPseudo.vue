<script setup lang="ts">
defineProps<{
    currentStep: number;
}>();
</script>
<template>
    <div :class="currentStep == 0 ? 'bg-white text-black' : ''">
        Create a queue q
    </div>
    <div :class="currentStep == 1 ? 'bg-white text-black' : ''">
        Mark start as visited and add to q
    </div>
    <div>While there is something in the queue do:</div>
    <ul>
        <li>Remove the next vertex in the queue</li>
        <li>We will call this 'v'</li>
        <li>Mark v as visited</li>
        <li>
            Add all of v's neighbors (that aren't already visited, or in the
            queue) to the queue
        </li>
    </ul>
</template>
