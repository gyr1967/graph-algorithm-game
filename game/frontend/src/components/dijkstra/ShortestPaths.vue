<script setup lang="ts">
import { DijkstraVertex } from "../../graph/Vertex";
defineProps<{
    currentVertexName: string;
    vertices: DijkstraVertex[];
    distances: Record<string, number>;
    sourceName: string;
}>();

const getPredecessors = (v: DijkstraVertex) => {
    const predecessors = [];
    let current = v;
    while (current.getPreviousVertex()) {
        const prev = current.getPreviousVertex();
        if (!prev) {
            break;
        }
        predecessors.push(prev.getTextName());
        current = prev;
    }
    predecessors.push(current.getTextName());
    return predecessors.slice(0, predecessors.length - 1).join(" -> ");
};
</script>
<template>
    <div class="border border-white p-3 rounded-md shadow-md grid grid-cols-2">
        <div class="mb-2">
            <span class="font-bold">Shortest Paths</span>
            <div v-for="v of vertices" :key="v.getTextName()">
                <span v-if="v.getPreviousVertex() !== null"
                    >{{ v.getTextName() }} : {{ getPredecessors(v) }}</span
                >
                <span v-else-if="v.getTextName() === sourceName"
                    >{{ sourceName }} : {{ sourceName }}</span
                >
                <span v-else>{{ v.getTextName() }} : No path found</span>
            </div>
        </div>
    </div>
</template>
