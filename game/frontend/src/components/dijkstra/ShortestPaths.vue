<script setup lang="ts">
import { computed } from "vue";
import { DijkstraVertex } from "../../graph/Vertex";
const props = defineProps<{
    currentVertexName: string;
    vertices: DijkstraVertex[];
    distances: Record<string, number>;
    sourceName: string;
}>();

const predecessors = computed(() => {
    return props.vertices.map((v) => {
        if (v.getPreviousVertex() !== null) {
            return `${v.getTextName()} : ${getPredecessors(v)}`;
        } else if (props.distances[v.getTextName()] === 0) {
            return `${props.sourceName} : ${props.sourceName}`;
        } else {
            return `${v.getTextName()} : No path found`;
        }
    });
});

function getPredecessors(v: DijkstraVertex) {
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
}
</script>
<template>
    <div class="border border-white p-3 rounded-md shadow-md grid grid-cols-2">
        <div class="mb-2">
            <span class="font-bold">Shortest Paths</span>
            <div v-for="(path, index) of predecessors" :key="index">
                <span>{{ path }}</span>
            </div>
        </div>
    </div>
</template>
