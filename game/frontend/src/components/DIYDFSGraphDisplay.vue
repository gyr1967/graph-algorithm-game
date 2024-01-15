<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import Vertex from "../graph/Vertex.ts";
import Graph from "../graph/Graph.ts";
import VertexOptionMenu from "./VertexOptionMenu.vue";
import StartVertexChoice from "./StartVertexChoice.vue";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum } from "../utils/num-to-letter";
import { ref } from "vue";
import type { DFSDIYSteps } from "../types/DFS";
import AdjListVertex from "../graph/AdjListVertex";
const props = defineProps<{
    whichGraphData: number;
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
const wrongChoice = ref<boolean>(false);
const started = ref<boolean>(false);
const sourceVertexName = ref<string>("A");
const currentStep = ref<DFSDIYSteps | null>(null);
emit("update:diyStep", currentStep.value);
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
    const graph = new DIYDFSGraph(n);
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

const startTheAlgorithm = () => {
    started.value = true;
    emit("update:started", true);
    setStep("add-to-stack");
    emit("update:diyStep", "add-to-stack");
    graph.currentVertex.value = graph.getVertex(
        letterToNum[sourceVertexName.value] - 1,
    );
    emit("update:currentVertexName", graph.currentVertex.value?.getTextName());
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
        <div v-if="!started" class="flex justify-center">
            <StartVertexChoice
                :disabled="false"
                :number-of-vertices="Object.keys(nodeData).length"
                @update:source-choice="
                    (newValue: Record<string, string>) => {
                        sourceVertexName = newValue.id;
                    }
                "
            />
            <button
                class="rounded-sm text-black p-1 hover:bg-gray-400 bg-white mx-1"
                @click="startTheAlgorithm"
            >
                Start
            </button>
        </div>
        <VertexOptionMenu
            v-if="started"
            :wrong-choice="wrongChoice"
            :text="nodeMenuOpen !== '' ? nodeMenuOpen : 'Click a vertex'"
            :disabled="nodeMenuOpen === ''"
            :node-id="nodeMenuOpen"
            bfs-or-dfs="dfs"
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
                        ('failed validation');
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
        />
    </div>
</template>
