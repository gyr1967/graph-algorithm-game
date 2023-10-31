<template>
    Create a queue q Mark start as visited and add to q While there is something
    in the queue do:
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
