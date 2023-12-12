<script setup lang="ts">
import Node from "../Node.vue";
import Link from "../Link.vue";
import DijkstraMediaControls from "./DijkstraMediaControls.vue";
import type { DijkstraYieldData } from "../../types/Dijkstra.ts";
import { DijkstraVertex } from "../../graph/Vertex.ts";
import { DijkstraGraph } from "../../graph/Graph.ts";
import { linkDatas, nodeDatas } from "../../utils/graph-data";
import { letterToNum } from "../../utils/num-to-letter";
import { ref } from "vue";
import { EdgeData } from "../../types/GraphData";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
}>();
const emit = defineEmits([
    "update:currentVertexName",
    "update:pseudoStep",
    "update:queue",
]);

class VisDijkstraGraph extends DijkstraGraph {
    currentVertex = ref<DijkstraVertex | null>(null);
    constructor(n: number) {
        super(n);
    }

    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    findClosest() {
        let minDistance = Infinity;
        let closestVertex = null;
        for (let vertex of this.queue) {
            if (vertex.getDistance() < minDistance) {
                minDistance = vertex.getDistance();
                closestVertex = vertex;
            }
        }
        return closestVertex;
    }

    *dijkstraGenerator(
        startVertex: DijkstraVertex,
    ): Generator<DijkstraYieldData, void, unknown> {
        this.queue = this.vertices.slice();
        startVertex.setDistance(0);
        distances.value[startVertex.getTextName()] = 0;
        yield {
            step: "set-source-to-zero",
            currentVertex: startVertex,
            queue: this.queue,
        };

        while (this.queue.length > 0) {
            const currentVertex = this.findClosest();
            if (!currentVertex) {
                throw new Error("currentVertex is null");
            }
            this.queue = this.queue.filter(
                (v) => v.getIndex() !== currentVertex.getIndex(),
            );
            yield {
                step: "remove-and-set-to-current",
                currentVertex: currentVertex,
                queue: this.queue,
            };
            const neighboursInQueue = currentVertex.getAdjList().filter((v) => {
                return this.queue.some(
                    (q) => q.getIndex() === v.getVertexIndex(),
                );
            });
            for (let adjListVertex of neighboursInQueue) {
                const alt =
                    currentVertex.getDistance() + adjListVertex.getEdgeWeight();
                const v = this.getVertex(adjListVertex.getVertexIndex());
                if (alt < v.getDistance()) {
                    v.setDistance(alt);
                    distances.value[v.getTextName()] = alt;
                    yield {
                        step: "update-distance",
                        currentVertex: currentVertex,
                        queue: this.queue,
                    };
                    v.setPreviousVertex(currentVertex);
                    yield {
                        step: "set-adj-prev-to-current",
                        currentVertex: currentVertex,
                        queue: this.queue,
                    };
                }
            }
        }
        yield {
            step: "done",
            currentVertex: null,
            queue: this.queue,
        };
    }
}
const nodeData = nodeDatas[props.whichGraphData];
const distances = ref<Record<string, number>>({});
const linkData = ref<Record<string, EdgeData>>(linkDatas[props.whichGraphData]);
const randomiseLinkLengths = () => {
    Object.keys(linkData.value).forEach((key) => {
        linkData.value[key].weight = Math.floor(Math.random() * 6) + 1;
    });
    graph = setUpGraph(Object.entries(nodeData).length);
};
const nodeFill = "#3498db";
const nodeColours = ref<Record<string, string>>({});
const setColoursDefault = () => {
    Object.keys(nodeData).forEach((key) => {
        nodeColours.value[nodeData[key].id] = nodeFill;
    });
};
setColoursDefault();
const setUpGraph = (n: number) => {
    const graph = new VisDijkstraGraph(n);
    Object.keys(linkData.value).forEach((key) => {
        const link = linkData.value[key];
        const v1id = letterToNum[link.v1] - 1;
        const v2id = letterToNum[link.v2] - 1;
        const v1 = graph.getVertex(v1id);
        const v2 = graph.getVertex(v2id);
        const edgeWeight = link.weight ?? 0;
        v1.addToAdjList(v2id, edgeWeight);
        v2.addToAdjList(v1id, edgeWeight);
    });
    Object.keys(nodeData).forEach((key) => {
        distances.value[nodeData[key].id] = Infinity;
    });
    return graph;
};
let graph = setUpGraph(Object.entries(nodeData).length);
const started = ref<boolean>(false);
const dijkstraGenerator = ref<Generator<
    DijkstraYieldData,
    void,
    unknown
> | null>(null);
const startDijkstras = () => {
    setColoursDefault();
    graph = setUpGraph(Object.entries(nodeData).length);
    const generator = graph.dijkstraGenerator(graph.getVertex(0));
    dijkstraGenerator.value = generator;
    started.value = true;
};

const performDijkstraStep = () => {
    if (dijkstraGenerator.value) {
        const result = dijkstraGenerator.value.next();
        if (result.done) {
            dijkstraGenerator.value = null;
            started.value = false;
            emit("update:currentVertexName", "");
            emit("update:pseudoStep", null);
        } else {
            emit("update:pseudoStep", result.value.step);
            graph.currentVertex.value = result.value.currentVertex;
        }
    }
};
</script>
<template>
    <div class="border border-white p-2 rounded-md shadow-md">
        <div>
            <svg
                class="graph-svg"
                :width="350 * scalingFactor"
                :height="300 * scalingFactor"
            >
                <g
                    v-for="link in linkData"
                    :key="link.x1 + link.y1 + link.x2 + link.y2"
                >
                    <Link
                        :x1="link.x1 * scalingFactor"
                        :y1="link.y1 * scalingFactor"
                        :x2="link.x2 * scalingFactor"
                        :y2="link.y2 * scalingFactor"
                        :stroke="link.stroke"
                        :stroke-width="link.strokeWidth"
                        :text="link.weight ? link.weight.toString() : ''"
                    />
                </g>
                <g v-for="mykey in Object.keys(nodeData)" :key="mykey">
                    <Node
                        :cx="nodeData[mykey].x * scalingFactor"
                        :cy="nodeData[mykey].y * scalingFactor"
                        :r="20 * scalingFactor"
                        :fill="nodeColours[nodeData[mykey].id]"
                        :text="nodeData[mykey].id"
                        :current-vertex="
                            graph.currentVertex.value?.getTextName() ===
                            nodeData[mykey].id
                        "
                        :unchecked-distance="distances[nodeData[mykey].id]"
                    />
                </g>
            </svg>
        </div>
        <div class="bottom-0 left-0 w-full flex justify-center">
            <DijkstraMediaControls
                :started="started"
                @start-dijkstras="startDijkstras"
                @next-step-dijkstras="performDijkstraStep"
                @prev-step-dijkstras="
                    () => {
                        console.log('to do');
                    }
                "
                @randomise-link-lengths="randomiseLinkLengths"
            />
        </div>
    </div>
</template>
