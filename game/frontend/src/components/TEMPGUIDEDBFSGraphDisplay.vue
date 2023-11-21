<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import Vertex from "../graph/Vertex.ts";
import VertexOptionMenu from "./VertexOptionMenu.vue";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum, numToLetter } from "../utils/num-to-letter";
import { ref } from "vue";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
    stage: "vis" | "guided" | "diy";
}>();
const emit = defineEmits([
    "update:vertexNames",
    "update:current-queue",
    "update:pseudo-step",
]);

type GuidedSteps =
    | "markFirstAsVisited"
    | "while"
    | "removeFirstAndMakeItCurrent"
    | "markVAsVisited"
    | "addVNeighboursToQueue"
    | "visit"
    | "add-to-queue"
    | "set-to-current";

class Graph {
    numVertices: number;
    vertices: Vertex[];
    visited: Set<number> = new Set<number>();
    queue: Vertex[] = [];
    currentVertex: Vertex | null = null;
    constructor(n: number) {
        this.numVertices = n;
        this.vertices = [];
        for (let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i, numToLetter[i + 1]));
        }
    }

    getVertex(i: number) {
        return this.vertices[i];
    }

    setVertex(i: number) {
        this.vertices[i] = new Vertex(i, numToLetter[i + 1]);
    }

    getVertices() {
        return this.vertices;
    }
    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    addToQueue(nodeId: string) {
        this.queue.push(this.getVertex(letterToNum[nodeId] - 1));
        emit(
            "update:current-queue",
            this.queue.map((v) => v.getTextName()),
        );
        setStep("visit");
    }

    visit(nodeId: string) {
        this.changeVertexColour(nodeId, "#e74c3c");
        setStep("add-to-queue");
    }

    setCurrentVertex(nodeId: string) {
        this.currentVertex = this.getVertex(letterToNum[nodeId] - 1);
        setStep("set-to-current");
    }
}

const validateStep = (step: GuidedSteps) => {
    if (currentStep.value == step) {
        return true;
    }
    return false;
};

const setStep = (step: GuidedSteps) => {
    currentStep.value = step;
    emit("update:pseudo-step", step);
};

const currentStep = ref<GuidedSteps | null>("visit");
emit("update:pseudo-step", currentStep.value);
const nodeData = nodeDatas[props.whichGraphData];
emit("update:vertexNames", Object.keys(nodeData));
const nodeMenuOpen = ref<string>("");
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
    const graph = new Graph(n);
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

const handleVertexClicked = (nodeId: string) => {
    if (nodeMenuOpen.value == nodeId) {
        nodeMenuOpen.value = "";
        return;
    }
    nodeMenuOpen.value = nodeId;
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
                        :text="link.text"
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
                            graph.currentVertex?.getTextName() ===
                            nodeData[mykey].id
                        "
                        @vertex-clicked="
                            handleVertexClicked(nodeData[mykey].id)
                        "
                    />
                </g>
            </svg>
        </div>
        <div>
            <VertexOptionMenu
                :text="nodeMenuOpen !== '' ? nodeMenuOpen : 'Click a vertex'"
                :node-id="nodeMenuOpen"
                @add-to-queue="
                    (nodeId: string) => {
                        if (validateStep('add-to-queue')) {
                            graph.addToQueue(nodeId);
                        } else {
                            console.log('Incorrect step');
                        }
                    }
                "
                @visit="
                    (nodeId: string) => {
                        if (validateStep('visit')) {
                            graph.visit(nodeId);
                        } else {
                            ('Incorrect step');
                        }
                    }
                "
                @set-to-current="
                    (nodeId: string) => {
                        if (validateStep('set-to-current')) {
                            graph.setCurrentVertex(nodeId);
                        } else {
                            console.log('Incorrect step');
                        }
                    }
                "
            />
        </div>
    </div>
</template>
