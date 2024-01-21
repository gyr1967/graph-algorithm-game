<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import MediaControls from "./MediaControls.vue";
import AdjListVertex from "../graph/AdjListVertex.ts";
import Vertex from "../graph/Vertex.ts";
import Graph from "../graph/Graph.ts";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum, numToLetter } from "../utils/num-to-letter";
import { ref } from "vue";
import type { BFSYieldData } from "../types/BFS.ts";
import { EdgeData, NodeData } from "../types/GraphData";
defineProps<{
    scalingFactor: number;
}>();
const emit = defineEmits([
    "update:currentVertexName",
    "update:currentQueue",
    "update:pseudoStep",
]);

const whichGraphData = ref<number>(1);

class VisBFSGraph extends Graph {
    currentVertex = ref<Vertex | null>(null);
    constructor(n: number) {
        super(n);
    }

    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    *bfsGenerator(startVertex: Vertex): Generator<BFSYieldData, void, unknown> {
        this.vertices.map((v) => {
            v.setVisited(false);
        });
        // put v into q
        this.queue.push(startVertex);
        yield {
            visited: this.visited,
            queue: this.queue,
            step: "addFirstToQueue",
            currentVertex: startVertex,
        };
        // while there is something in the queue do
        yield {
            visited: this.visited,
            queue: this.queue,
            step: "while",
            currentVertex: startVertex,
        };
        while (this.queue.length !== 0) {
            // remove the first vertex in the queue, and make it the current vertex
            const temporary = this.queue.shift();
            if (temporary === undefined) {
                throw new Error("currentVertex is undefined");
            }
            const currentVertex: Vertex | undefined = temporary;
            emit(
                "update:currentVertexName",
                numToLetter[currentVertex.getIndex() + 1],
            );
            yield {
                visited: this.visited,
                queue: this.queue,
                step: "removeFirstAndMakeItCurrent",
                currentVertex,
            };
            // mark v as visited
            currentVertex.setVisited(true);
            this.visited.add(currentVertex.getIndex());
            this.changeVertexColour(
                numToLetter[currentVertex.getIndex() + 1],
                "#e74c3c",
            );
            yield {
                visited: this.visited,
                queue: this.queue,
                step: "markVAsVisited",
                currentVertex,
            };
            const unvisitedAdjacents = currentVertex
                .getAdjList()
                .filter((alv: AdjListVertex) => {
                    return (
                        !this.visited.has(alv.getVertexIndex()) &&
                        !this.queue.includes(
                            this.vertices[alv.getVertexIndex()],
                        )
                    );
                });
            // add all of v's unvisited neighbours to the queue
            for (const vertex of unvisitedAdjacents) {
                const i = vertex.getVertexIndex();
                const nextVertex = this.vertices[i];
                this.queue.push(nextVertex);
            }
            yield {
                visited: this.visited,
                queue: this.queue,
                step: "addVNeighboursToQueue",
                currentVertex,
            };
        }
    }
}

const nodeData = ref<Record<string, NodeData>>(nodeDatas[whichGraphData.value]);
const linkData = ref<Record<string, EdgeData>>(linkDatas[whichGraphData.value]);
const nodeFill = "#3498db";
const nodeColours = ref<Record<string, string>>({});
const setColoursDefault = () => {
    Object.keys(nodeData.value).forEach((key) => {
        nodeColours.value[nodeData.value[key].id] = nodeFill;
    });
};
setColoursDefault();
const setUpGraph = (n: number) => {
    const graph = new VisBFSGraph(n);
    Object.keys(linkData.value).forEach((key) => {
        const link = linkData.value[key];
        const v1id = letterToNum[link.v1] - 1;
        const v2id = letterToNum[link.v2] - 1;
        const v1 = graph.getVertex(v1id);
        const v2 = graph.getVertex(v2id);
        v1.addToAdjList(v2id);
        v2.addToAdjList(v1id);
    });
    return graph;
};
let graph = setUpGraph(Object.entries(nodeData.value).length);
const started = ref<boolean>(false);
const bfsGenerator = ref<Generator<BFSYieldData, void, unknown> | null>(null);
const startBFS = (startIndex: number) => {
    setColoursDefault();
    graph = setUpGraph(Object.entries(nodeData.value).length);
    const generator = graph.bfsGenerator(graph.getVertex(startIndex));
    bfsGenerator.value = generator;
    started.value = true;
};

const reset = () => {
    nodeData.value = nodeDatas[whichGraphData.value];
    linkData.value = linkDatas[whichGraphData.value];
    bfsGenerator.value = null;
    started.value = false;
    emit("update:currentVertexName", "");
    emit("update:currentQueue", []);
    emit("update:pseudoStep", null);
    setColoursDefault();
};

const performBFSStep = () => {
    if (bfsGenerator.value) {
        const result = bfsGenerator.value.next();
        if (result.done) {
            reset();
        } else {
            emit("update:pseudoStep", result.value.step);
            emit(
                "update:currentQueue",
                result.value.queue.map((v) => {
                    return numToLetter[v.getIndex() + 1];
                }),
            );
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
                    />
                </g>
            </svg>
        </div>
    </div>
    <div class="border boder-white p-2 rounded-md shadow-md mt-2">
        <div class="bottom-0 left-0 w-full flex justify-center">
            <MediaControls
                :started="started"
                bfs-or-dfs="bfs"
                :number-of-vertices="Object.entries(nodeData).length"
                @start="(startIndex) => startBFS(startIndex)"
                @next-step="performBFSStep()"
                @reset="reset()"
                @update:graph-choice="
                    (newValue: number) => {
                        whichGraphData = newValue;
                        reset();
                    }
                "
            />
        </div>
    </div>
</template>
