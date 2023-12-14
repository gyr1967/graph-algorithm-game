<script setup lang="ts">
import Node from "../Node.vue";
import Link from "../Link.vue";
import DijkstraOptionMenu from "./DijkstraOptionMenu.vue";
import { DijkstraVertex } from "../../graph/Vertex.ts";
import { DijkstraGraph } from "../../graph/Graph.ts";
import { linkDatas, nodeDatas } from "../../utils/graph-data";
import { letterToNum } from "../../utils/num-to-letter";
import { ref } from "vue";
import { EdgeData } from "../../types/GraphData";
import { DijkstraStep } from "../../types/Dijkstra";
import AdjListVertex from "../../graph/AdjListVertex";
const props = defineProps<{
    whichGraphData: number;
    scalingFactor: number;
}>();
const emit = defineEmits([
    "update:currentVertexName",
    "update:pseudoStep",
    "update:verticesToCheck",
    "update:distances",
    "update:vertices",
    "update:started",
]);

const SOURCEVERTEXNAME = "A";

class VisDijkstraGraph extends DijkstraGraph {
    currentVertex = ref<DijkstraVertex | null>(null);
    constructor(n: number) {
        super(n);
        this.verticesToCheck = this.vertices.slice();
    }

    changeVertexColour = (nodeId: string, colour: string) => {
        nodeColours.value[nodeId] = colour;
    };

    findClosest() {
        let minDistance = Infinity;
        let closestVertex = null;
        for (let vertex of this.verticesToCheck) {
            if (vertex.getDistance() < minDistance) {
                minDistance = vertex.getDistance();
                closestVertex = vertex;
            }
        }
        return closestVertex;
    }

    removeAndSetCurrentVertex() {
        this.currentVertex.value = this.findClosest();
        if (!this.currentVertex.value) {
            throw new Error("currentVertex is null");
        }
        this.verticesToCheck = this.verticesToCheck.filter(
            (v) => v.getIndex() !== this.currentVertex.value?.getIndex(),
        );
        emit(
            "update:currentVertexName",
            this.currentVertex.value?.getTextName() ?? "",
        );
        emit(
            "update:verticesToCheck",
            this.verticesToCheck.map((v) => v.getTextName()),
        );
        if (this.verticesToCheck.length === 0) {
            setStep("done");
            return;
        }
        const adjVertices = this.currentVertex.value
            ?.getAdjList()
            .map((alv) => this.getVertex(alv.getVertexIndex()));
        const adjVerticesInQueue = adjVertices?.filter((v) =>
            this.verticesToCheck.includes(v),
        );
        if (adjVerticesInQueue?.length === 0) {
            return;
        }
        adjToVisit.value = adjVerticesInQueue;
        if (canAnyAdjVerticesBeMadeCheaper()) {
            setStep("update-distance");
            return;
        }
    }

    updateDistance(nodeId: string, distance: number) {
        const vertex = this.getVertex(letterToNum[nodeId] - 1);
        if (vertex) {
            vertex.setDistance(distance);
            distances.value[nodeId] = distance;
            emit("update:distances", distances.value);
            emit("update:vertices", this.vertices);
            if (vertex.getTextName() === SOURCEVERTEXNAME) {
                setStep("remove-and-set-to-current");
            } else {
                setStep("set-adj-prev-to-current");
            }
        }
    }

    setAdjPrevToCurrent(nodeId: string) {
        const vertex = this.getVertex(letterToNum[nodeId] - 1);
        if (vertex) {
            vertex.setPreviousVertex(this.currentVertex.value);
            adjToVisit.value = adjToVisit.value.filter(
                (v) => v.getIndex() !== vertex.getIndex(),
            );
            if (adjToVisit.value.length === 0) {
                setStep("remove-and-set-to-current");
            } else {
                if (canAnyAdjVerticesBeMadeCheaper()) {
                    setStep("update-distance");
                } else {
                    adjToVisit.value = [];
                    setStep("remove-and-set-to-current");
                }
            }
        }
    }
}

const canAnyAdjVerticesBeMadeCheaper = (): boolean => {
    const adjVerticesWithNewDistance = adjToVisit.value.filter((v) => {
        if (!graph.currentVertex.value) {
            return false;
        }
        const edgeWeight = graph.currentVertex.value
            .getAdjList()
            .find((alv) => alv.getVertexIndex() === v.getIndex())
            ?.getEdgeWeight();
        if (edgeWeight === undefined) {
            return false;
        }
        return (
            graph.currentVertex.value?.getDistance() + edgeWeight <
            v.getDistance()
        );
    });
    if (adjVerticesWithNewDistance?.length > 0) {
        return true;
    }
    return false;
};

const setStep = (step: DijkstraStep) => {
    currentStep.value = step;
    emit("update:pseudoStep", step);
};

const adjToVisit = ref<DijkstraVertex[]>([]);
const nodeData = nodeDatas[props.whichGraphData];
const distances = ref<Record<string, number>>({});
const linkData = ref<Record<string, EdgeData>>(linkDatas[props.whichGraphData]);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const randomiseLinkLengths = () => {
    Object.keys(linkData.value).forEach((key) => {
        linkData.value[key].weight = Math.floor(Math.random() * 14) + 1;
    });
    graph = setUpGraph(Object.entries(nodeData).length);
};
const nodeFill = "#3498db";
const nodeMenuOpen = ref<string>("");
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
const currentStep = ref<DijkstraStep | null>(null);

const startTheAlgorithm = () => {
    started.value = true;
    emit("update:started", true);
    graph.currentVertex.value = graph.getVertex(0);
    emit("update:currentVertexName", graph.currentVertex.value?.getTextName());
    emit("update:vertices", graph.vertices);
    emit("update:distances", distances.value);
    emit(
        "update:verticesToCheck",
        graph.verticesToCheck.map((v) => v.getTextName()),
    );
    currentStep.value = "set-source-to-zero";
    emit("update:pseudoStep", currentStep.value);
};

const handleVertexClicked = (nodeId: string) => {
    if (nodeMenuOpen.value === nodeId) {
        nodeMenuOpen.value = "";
        return;
    }
    nodeMenuOpen.value = nodeId;
};
const validateStep = (
    step: DijkstraStep,
    nodeId: string,
    distance: number = Infinity,
) => {
    if (currentStep.value === step) {
        if (step === "update-distance") {
            if (distance === Infinity) {
                return false;
            }
            if (validateUpdateDistance(nodeId, distance)) {
                return true;
            }
        } else if (step === "set-adj-prev-to-current") {
            if (validateSetAdjPrevToCurrent(nodeId)) {
                return true;
            }
        } else if (step === "remove-and-set-to-current") {
            if (validateRemoveAndSetToCurrent(nodeId)) {
                return true;
            }
        } else if (step === "set-source-to-zero") {
            if (validateSetSourceToZero(nodeId)) {
                return true;
            }
        }
    }
    console.log("wrong step");
    return false;
};
const validateUpdateDistance = (nodeId: string, distance: number) => {
    const adj = findAdjacency(nodeId);
    const vertex = graph.getVertex(letterToNum[nodeId] - 1);
    if (adj === null && vertex.getTextName() !== SOURCEVERTEXNAME) {
        console.log;
        return false;
    }
    if (adj === null && vertex.getTextName() === SOURCEVERTEXNAME) {
        if (distance === 0) {
            return true;
        }
        return false;
    }

    if (graph.currentVertex.value) {
        const currentVertexDistance = graph.currentVertex.value.getDistance();
        if (currentVertexDistance !== Infinity) {
            const edgeWeight = adj!.getEdgeWeight();
            if (currentVertexDistance + edgeWeight === distance) {
                return true;
            }
        }
    }
    return false;
};
const validateSetAdjPrevToCurrent = (nodeId: string) => {
    return !!findAdjacency(nodeId);
};
const validateRemoveAndSetToCurrent = (nodeId: string) => {
    if (graph.verticesToCheck.length > 0) {
        if (
            graph.verticesToCheck.includes(
                graph.getVertex(letterToNum[nodeId] - 1),
            )
        ) {
            return true;
        }
    }
};

const validateSetSourceToZero = (nodeId: string) => {
    if (nodeId === SOURCEVERTEXNAME) {
        return true;
    }
    return false;
};

const findAdjacency = (nodeId: string): AdjListVertex | null => {
    if (graph.currentVertex.value) {
        return (
            graph.currentVertex.value
                ?.getAdjList()
                .find(
                    (v) =>
                        graph.vertices[v.getVertexIndex()].getTextName() ===
                        nodeId,
                ) ?? null
        );
    }
    return null;
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
                        @vertex-clicked="
                            handleVertexClicked(nodeData[mykey].id)
                        "
                    />
                </g>
            </svg>
        </div>
    </div>
    <div class="border border-white p-2 rounded-md shadow-md mt-2">
        <div class="flex justify-center">
            <button
                v-if="!started"
                class="border border-white p-1 rounded-sm ml-1 hover:opacity-50"
                @click="startTheAlgorithm"
            >
                Start
            </button>
        </div>
        <DijkstraOptionMenu
            :text="nodeMenuOpen !== '' ? nodeMenuOpen : 'Click a vertex'"
            :disabled="nodeMenuOpen === '' || !started"
            :node-id="nodeMenuOpen"
            :current-vertex-name="graph.currentVertex.value?.getTextName()"
            @remove-and-set-to-current="
                () => {
                    if (
                        validateStep('remove-and-set-to-current', nodeMenuOpen)
                    ) {
                        graph.removeAndSetCurrentVertex();
                    } else {
                        console.log('failed validation');
                    }
                }
            "
            @update-distance="
                ({ nodeId, distance }) => {
                    let validation = false;
                    if (currentStep === 'set-source-to-zero') {
                        validation = validateStep(
                            'set-source-to-zero',
                            nodeId,
                            distance,
                        );
                    } else {
                        validation = validateStep(
                            'update-distance',
                            nodeId,
                            distance,
                        );
                    }
                    if (validation) {
                        graph.updateDistance(nodeId, distance);
                    } else {
                        console.log('failed validation');
                    }
                }
            "
            @set-adj-prev-to-current="
                () => {
                    if (validateStep('set-adj-prev-to-current', nodeMenuOpen)) {
                        graph.setAdjPrevToCurrent(nodeMenuOpen);
                    } else {
                        console.log('failed validation');
                    }
                }
            "
        />
    </div>
</template>
