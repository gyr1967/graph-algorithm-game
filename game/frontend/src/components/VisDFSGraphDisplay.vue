<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import AdjListVertex from "../graph/AdjListVertex.ts";
import Vertex from "../graph/Vertex.ts";
import Graph from "../graph/Graph.ts";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum, numToLetter } from "../utils/num-to-letter";
import { ref, watch } from "vue";
import type { DFSYieldData } from "../types/DFS.ts";
import { EdgeData, NodeData } from "../types/GraphData";
const props = defineProps<{
    scalingFactor: number;
    graphChoice: number;
    sourceChoice: Record<string, string>;
    started: boolean;
    resetCounter: number;
    nextStepCounter: number;
}>();
const emit = defineEmits([
    "update:currentVertexName",
    "update:currentStack",
    "update:pseudoStep",
    "update:started",
]);

const whichGraphData = ref<number>(1);

class VisDFSGraph extends Graph {
    currentVertex = ref<Vertex | null>(null);
    constructor(n: number) {
        super(n);
    }

    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    *dfsGenerator(startVertex: Vertex): Generator<DFSYieldData, void, unknown> {
        this.vertices.map((v) => {
            v.setVisited(false);
        });
        // put v into q
        this.stack.push(startVertex);
        yield {
            visited: this.visited,
            stack: this.stack,
            step: "addFirstToStack",
            currentVertex: null,
        };
        // while there is something in the stack do
        yield {
            visited: this.visited,
            stack: this.stack,
            step: "while",
            currentVertex: null,
        };
        while (this.stack.length !== 0) {
            // remove the first vertex in the stack, and make it the current vertex
            const temporary = this.stack.pop();
            if (temporary === undefined) {
                throw new Error("currentVertex is undefined");
            }
            const currentVertex: Vertex = temporary;
            emit(
                "update:currentVertexName",
                numToLetter[currentVertex.getIndex() + 1],
            );
            yield {
                visited: this.visited,
                stack: this.stack,
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
                stack: this.stack,
                step: "markVAsVisited",
                currentVertex,
            };
            const unvisitedAdjacents = currentVertex
                .getAdjList()
                .filter((alv: AdjListVertex) => {
                    return (
                        !this.visited.has(alv.getVertexIndex()) &&
                        !this.stack.includes(
                            this.vertices[alv.getVertexIndex()],
                        )
                    );
                });
            // add all of v's unvisited neighbours to the stack
            for (const vertex of unvisitedAdjacents) {
                const i = vertex.getVertexIndex();
                const nextVertex = this.vertices[i];
                this.stack.push(nextVertex);
                this.changeVertexColour(
                    numToLetter[nextVertex.getIndex() + 1],
                    "#f1c40f",
                );
            }
            yield {
                visited: this.visited,
                stack: this.stack,
                step: "addVNeighboursToStack",
                currentVertex,
            };
            for (const vertex of this.stack) {
                this.changeVertexColour(
                    numToLetter[vertex.getIndex() + 1],
                    "#3498db",
                );
            }
        }
    }
}

const startVertexId = ref<number>(letterToNum[props.sourceChoice.id] - 1);
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
    const graph = new VisDFSGraph(n);
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
const dfsGenerator = ref<Generator<DFSYieldData, void, unknown> | null>(null);
const startDFS = () => {
    setColoursDefault();
    graph = setUpGraph(Object.entries(nodeData.value).length);
    const generator = graph.dfsGenerator(graph.getVertex(startVertexId.value));
    dfsGenerator.value = generator;
};

const reset = () => {
    nodeData.value = nodeDatas[whichGraphData.value];
    linkData.value = linkDatas[whichGraphData.value];
    dfsGenerator.value = null;
    emit("update:started", false);
    emit("update:currentVertexName", "");
    emit("update:currentStack", []);
    emit("update:pseudoStep", null);
    setColoursDefault();
};

const performDFSStep = () => {
    if (dfsGenerator.value) {
        const result = dfsGenerator.value.next();
        if (result.done) {
            reset();
        } else {
            emit("update:pseudoStep", result.value.step);
            emit(
                "update:currentStack",
                result.value.stack.map((v) => {
                    return numToLetter[v.getIndex() + 1];
                }),
            );
            graph.currentVertex.value = result.value.currentVertex;
        }
    }
};

watch(
    () => props.graphChoice,
    () => {
        whichGraphData.value = props.graphChoice;
        reset();
    },
);
watch(
    () => props.sourceChoice,
    () => {
        startVertexId.value = letterToNum[props.sourceChoice.id] - 1;
    },
);
watch(
    () => props.started,
    () => {
        if (props.started) {
            startDFS();
        }
    },
);
watch(
    () => props.resetCounter,
    () => {
        reset();
    },
);
watch(
    () => props.started,
    () => {
        if (props.started) {
            performDFSStep();
        }
    },
);
watch(
    () => props.nextStepCounter,
    () => {
        performDFSStep();
    },
);
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
</template>
