<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import Vertex from "../graph/Vertex.ts";
import Graph from "../graph/Graph.ts";
import VertexOptionMenu from "./VertexOptionMenu.vue";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum } from "../utils/num-to-letter";
import { ref } from "vue";
import type { DFSDIYSteps } from "../types/DFS";
import AdjListVertex from "../graph/AdjListVertex";
import { NodeData, EdgeData } from "../types/GraphData";
defineProps<{
    scalingFactor: number;
}>();
const emit = defineEmits([
    "update:vertexNames",
    "update:currentStack",
    "update:diyStep",
    "update:currentVertexName",
    "update:started",
    "update:visited",
]);

class DIYDFSGraph extends Graph {
    currentVertex = ref<Vertex | null>(null);
    constructor(n: number) {
        super(n);
    }

    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    addToStack(nodeId: string) {
        this.stack.push(this.getVertex(letterToNum[nodeId] - 1));
        emit(
            "update:currentStack",
            this.stack.map((v) => v.getTextName()),
        );
        const adjVertices = this.currentVertex.value
            ?.getAdjList()
            .map((alv) => this.getVertex(alv.getVertexIndex()));
        if (
            adjVertices?.every(
                (v) => this.stack.includes(v) || this.visited.has(v.getIndex()),
            ) ||
            this.visited.size === 0
        ) {
            setStep("remove-and-set-to-current");
        }
    }

    visit(nodeId: string) {
        this.changeVertexColour(nodeId, "#e74c3c");
        this.visited.add(letterToNum[nodeId] - 1);
        emit("update:visited", Array.from(this.visited.values()));
        this.currentVertex.value?.setVisited(true);
        const adjVertices = this.currentVertex.value
            ?.getAdjList()
            .map((alv) => this.getVertex(alv.getVertexIndex()));
        if (this.visited.size === this.numVertices) {
            setStep("done");
            return;
        }
        if (
            adjVertices?.every(
                (v) => this.stack.includes(v) || this.visited.has(v.getIndex()),
            ) ||
            this.visited.size === 0
        ) {
            setStep("remove-and-set-to-current");
            return;
        }
        setStep("add-to-stack");
    }

    removeAndSetCurrentVertex() {
        this.currentVertex.value = this.stack.pop() ?? null;
        emit(
            "update:currentVertexName",
            this.currentVertex.value?.getTextName() ?? "",
        );
        emit(
            "update:currentStack",
            this.stack.map((v) => v.getTextName()),
        );
        setStep("visit");
    }
}
const whichGraphData = ref<number>(1);
const wrongChoice = ref<boolean>(false);
const started = ref<boolean>(false);
const currentStep = ref<DFSDIYSteps | null>(null);
emit("update:diyStep", currentStep.value);
const nodeData = ref<Record<string, NodeData>>(nodeDatas[whichGraphData.value]);
emit("update:vertexNames", Object.keys(nodeData));
const nodeMenuOpen = ref<string>("");
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
    const graph = new DIYDFSGraph(n);
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

const handleVertexClicked = (nodeId: string) => {
    if (nodeMenuOpen.value === nodeId) {
        nodeMenuOpen.value = "";
        return;
    }
    nodeMenuOpen.value = nodeId;
};

const validateStep = (step: DFSDIYSteps, nodeId: string) => {
    if (currentStep.value === step) {
        if (step === "visit") {
            if (validateVisit(nodeId)) {
                return true;
            }
        } else if (step === "add-to-stack") {
            if (validateAddToStack(nodeId)) {
                return true;
            }
        } else if (step === "remove-and-set-to-current") {
            if (validateRemoveAndSetToCurrent(nodeId)) {
                return true;
            }
        }
    }
    wrongChoice.value = true;
    setTimeout(() => {
        wrongChoice.value = false;
    }, 500);
    return false;
};

const validateVisit = (nodeId: string) => {
    if (graph.currentVertex) {
        if (graph.currentVertex.value?.getTextName() === nodeId) {
            return true;
        }
    }
    return false;
};

const validateAddToStack = (nodeId: string) => {
    if (
        graph.stack.includes(graph.getVertex(letterToNum[nodeId] - 1)) ||
        graph.visited.has(letterToNum[nodeId] - 1)
    ) {
        return false;
    }
    if (
        !checkIndexInAdjList(nodeId, graph.currentVertex.value?.getAdjList()) &&
        graph.visited.size > 0
    ) {
        return false;
    }
    if (
        graph.visited.size === 0 &&
        nodeId !== graph.currentVertex.value?.getTextName()
    ) {
        return false;
    }
    return true;
};

const validateRemoveAndSetToCurrent = (nodeId: string) => {
    if (graph.stack.length > 0) {
        if (graph.stack[graph.stack.length - 1].getTextName() === nodeId) {
            return true;
        }
    }
    return false;
};

const checkIndexInAdjList = (
    nodeId: string,
    adjList: AdjListVertex[] | undefined,
) => {
    if (!adjList) {
        return false;
    }
    let result = false;
    adjList.map((alv: AdjListVertex) => {
        if (alv.getVertexIndex() === letterToNum[nodeId] - 1) {
            result = true;
        }
    });
    return result;
};

const setStep = (step: DFSDIYSteps) => {
    currentStep.value = step;
    emit("update:diyStep", step);
};

const startTheAlgorithm = (startIndex: number) => {
    started.value = true;
    emit("update:started", true);
    setStep("add-to-stack");
    emit("update:diyStep", "add-to-stack");
    graph.currentVertex.value = graph.getVertex(startIndex);
    emit("update:currentVertexName", graph.currentVertex.value?.getTextName());
};
const reset = () => {
    nodeData.value = nodeDatas[whichGraphData.value];
    linkData.value = linkDatas[whichGraphData.value];
    started.value = false;
    emit("update:currentVertexName", "");
    emit("update:currentStack", []);
    emit("update:diyStep", null);
    emit("update:visited", []);
    graph = setUpGraph(Object.entries(nodeData.value).length);
    setColoursDefault();
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
                        @vertex-clicked="
                            handleVertexClicked(nodeData[mykey].id)
                        "
                    />
                </g>
            </svg>
        </div>
    </div>
    <div class="border boder-white p-2 rounded-md shadow-md mt-2">
        <VertexOptionMenu
            :wrong-choice="wrongChoice"
            :text="nodeMenuOpen !== '' ? nodeMenuOpen : 'Click a vertex'"
            :disabled="nodeMenuOpen === ''"
            :node-id="nodeMenuOpen"
            bfs-or-dfs="dfs"
            :number-of-vertices="Object.keys(nodeData).length"
            :started="started"
            :is-dijkstras="false"
            @add-to-stack="
                (nodeId: string) => {
                    if (validateStep('add-to-stack', nodeId)) {
                        graph.addToStack(nodeId);
                    } else {
                        console.log('failed validation');
                    }
                }
            "
            @visit="
                (nodeId: string) => {
                    if (validateStep('visit', nodeId)) {
                        graph.visit(nodeId);
                    } else {
                        console.log('failed validation');
                    }
                }
            "
            @remove-and-set-to-current="
                (nodeId: string) => {
                    if (validateStep('remove-and-set-to-current', nodeId)) {
                        graph.removeAndSetCurrentVertex();
                    } else {
                        console.log('failed validation');
                    }
                }
            "
            @start-the-algorithm="startTheAlgorithm"
            @reset="reset()"
            @update:graph-choice="
                (newValue: number) => {
                    whichGraphData = newValue;
                    reset();
                }
            "
        />
    </div>
</template>
