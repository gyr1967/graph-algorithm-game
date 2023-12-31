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
import type { DFSYieldData } from "../types/DFS.ts";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
}>();
const emit = defineEmits([
    "update:currentVertexName",
    "update:currentStack",
    "update:pseudoStep",
]);

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
            currentVertex: startVertex,
        };
        // while there is something in the stack do
        yield {
            visited: this.visited,
            stack: this.stack,
            step: "while",
            currentVertex: startVertex,
        };
        while (this.stack.length !== 0) {
            // remove the first vertex in the stack, and make it the current vertex
            const temporary = this.stack.pop();
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
            }
            yield {
                visited: this.visited,
                stack: this.stack,
                step: "addVNeighboursToStack",
                currentVertex,
            };
        }
    }
}

const nodeData = nodeDatas[props.whichGraphData];
const linkData = linkDatas[props.whichGraphData];
const nodeFill = "#3498db";
const nodeColours = ref<Record<string, string>>({});
const setColoursDefault = () => {
    Object.keys(nodeData).forEach((key) => {
        nodeColours.value[nodeData[key].id] = nodeFill;
    });
};
setColoursDefault();
const setUpGraph = (n: number) => {
    const graph = new VisDFSGraph(n);
    Object.keys(linkData).forEach((key) => {
        const link = linkData[key];
        const v1id = letterToNum[link.v1] - 1;
        const v2id = letterToNum[link.v2] - 1;
        const v1 = graph.getVertex(v1id);
        const v2 = graph.getVertex(v2id);
        v1.addToAdjList(v2id);
        v2.addToAdjList(v1id);
    });
    return graph;
};
let graph = setUpGraph(Object.entries(nodeData).length);
const started = ref<boolean>(false);
const dfsGenerator = ref<Generator<DFSYieldData, void, unknown> | null>(null);
const startDFS = (startIndex: number) => {
    setColoursDefault();
    graph = setUpGraph(Object.entries(nodeData).length);
    const generator = graph.dfsGenerator(graph.getVertex(startIndex));
    dfsGenerator.value = generator;
    started.value = true;
};

const reset = () => {
    dfsGenerator.value = null;
    started.value = false;
    emit("update:currentVertexName", "");
    emit("update:currentStack", []);
    emit("update:pseudoStep", null);
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
                bfs-or-dfs="dfs"
                :number-of-vertices="Object.entries(nodeData).length"
                @start="(startIndex) => startDFS(startIndex)"
                @next-step="performDFSStep()"
                @reset="reset()"
            />
        </div>
    </div>
</template>
