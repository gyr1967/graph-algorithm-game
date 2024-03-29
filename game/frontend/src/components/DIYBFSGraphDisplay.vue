<script setup lang="ts">
import Node from "./Node.vue";
import Link from "./Link.vue";
import Vertex from "../graph/Vertex.ts";
import Graph from "../graph/Graph.ts";
import VertexOptionMenu from "./VertexOptionMenu.vue";
import { linkDatas, nodeDatas } from "../utils/graph-data";
import { letterToNum, numToLetter } from "../utils/num-to-letter";
import { ref, watch } from "vue";
import type { BFSDIYSteps } from "../types/BFS";
import AdjListVertex from "../graph/AdjListVertex";
import { NodeData, EdgeData } from "../types/GraphData";
const props = defineProps<{
    scalingFactor: number;
    graphChoice: number;
    sourceChoice: Record<string, string>;
    started: boolean;
    resetCounter: number;
}>();
const emit = defineEmits([
    "update:vertexNames",
    "update:currentQueue",
    "update:diyStep",
    "update:currentVertexName",
    "update:visited",
    "update:started",
]);

class DIYBFSGraph extends Graph {
    currentVertex = ref<Vertex | null>(null);
    constructor(n: number) {
        super(n);
    }

    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    addToQueue(nodeId: string) {
        this.queue.push(this.getVertex(letterToNum[nodeId] - 1));
        emit(
            "update:currentQueue",
            this.queue.map((v) => v.getTextName()),
        );
        this.changeVertexColour(nodeId, nodeFill);
        const adjVertices = this.currentVertex.value
            ?.getAdjList()
            .map((alv) => this.getVertex(alv.getVertexIndex()));
        if (
            adjVertices?.every(
                (v) => this.queue.includes(v) || this.visited.has(v.getIndex()),
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
                (v) => this.queue.includes(v) || this.visited.has(v.getIndex()),
            ) ||
            this.visited.size === 0
        ) {
            setStep("remove-and-set-to-current");
            return;
        }
        const queueEligibleVertices = adjVertices?.filter(
            (v) => !this.visited.has(v.getIndex()) && !this.queue.includes(v),
        );
        if (queueEligibleVertices) {
            queueEligibleVertices.forEach((v) => {
                this.changeVertexColour(v.getTextName(), "#f1c40f");
            });
        }
        setStep("add-to-queue");
    }

    removeAndSetCurrentVertex() {
        this.currentVertex.value = this.queue.shift() ?? null;
        emit(
            "update:currentVertexName",
            this.currentVertex.value?.getTextName() ?? "",
        );
        emit(
            "update:currentQueue",
            this.queue.map((v) => v.getTextName()),
        );
        setStep("visit");
    }
}
const whichGraphData = ref<number>(props.graphChoice);
const startVertexId = ref<number | null>(
    letterToNum[props.sourceChoice.id] - 1,
);
const wrongChoice = ref<boolean>(false);
const currentStep = ref<BFSDIYSteps | null>(null);
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
    const graph = new DIYBFSGraph(n);
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
    nodeMenuOpen.value = nodeId;
};

const validateStep = (step: BFSDIYSteps, nodeId: string) => {
    if (currentStep.value === step) {
        if (step === "visit") {
            if (validateVisit(nodeId)) {
                return true;
            }
        } else if (step === "add-to-queue") {
            if (validateAddToQueue(nodeId)) {
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

const validateAddToQueue = (nodeId: string) => {
    if (startVertexId.value === null) {
        return false;
    }
    if (
        graph.visited.size === 0 &&
        nodeId !== numToLetter[startVertexId.value + 1]
    ) {
        return false;
    }
    if (
        graph.queue.includes(graph.getVertex(letterToNum[nodeId] - 1)) ||
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
    if (graph.queue.length > 0) {
        if (graph.queue[0].getTextName() === nodeId) {
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

const setStep = (step: BFSDIYSteps) => {
    currentStep.value = step;
    emit("update:diyStep", step);
};

const startTheAlgorithm = () => {
    setStep("add-to-queue");
    emit("update:diyStep", "add-to-queue");
};
const reset = () => {
    nodeData.value = nodeDatas[whichGraphData.value];
    linkData.value = linkDatas[whichGraphData.value];
    emit("update:started", false);
    emit("update:currentVertexName", "");
    emit("update:currentQueue", []);
    emit("update:diyStep", null);
    emit("update:visited", []);
    graph = setUpGraph(Object.entries(nodeData.value).length);
    setColoursDefault();
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
            startTheAlgorithm();
        }
    },
);
watch(
    () => props.resetCounter,
    () => {
        reset();
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
            :disabled="nodeMenuOpen === '' || !started"
            :node-id="nodeMenuOpen"
            bfs-or-dfs="bfs"
            :number-of-vertices="Object.keys(nodeData).length"
            :started="started"
            :is-dijkstras="false"
            @add-to-queue="
                (nodeId: string) => {
                    if (validateStep('add-to-queue', nodeId)) {
                        graph.addToQueue(nodeId);
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
