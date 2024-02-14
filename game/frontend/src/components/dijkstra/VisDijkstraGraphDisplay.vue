<script setup lang="ts">
import Node from "../Node.vue";
import Link from "../Link.vue";
import type { DijkstraYieldData } from "../../types/Dijkstra.ts";
import { DijkstraVertex } from "../../graph/Vertex.ts";
import { DijkstraGraph } from "../../graph/Graph.ts";
import { linkDatas, nodeDatas } from "../../utils/graph-data";
import { letterToNum } from "../../utils/num-to-letter";
import { ref, watch } from "vue";
import { EdgeData, NodeData } from "../../types/GraphData";
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
    "update:pseudoStep",
    "update:verticesToCheck",
    "update:distances",
    "update:vertices",
    "update:sourceName",
    "update:started",
]);

const whichGraphData = ref<number>(2);

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

    *dijkstraGenerator(
        startVertex: DijkstraVertex,
    ): Generator<DijkstraYieldData, void, unknown> {
        startVertex.setDistance(0);
        distances.value[startVertex.getTextName()] = 0;
        yield {
            step: "set-source-to-zero",
            currentVertex: null,
            verticesToCheck: this.verticesToCheck,
        };

        while (this.verticesToCheck.length > 0) {
            const currentVertex = this.findClosest();
            if (!currentVertex) {
                throw new Error("currentVertex is null");
            }
            this.verticesToCheck = this.verticesToCheck.filter(
                (v) => v.getIndex() !== currentVertex.getIndex(),
            );
            yield {
                step: "remove-and-set-to-current",
                currentVertex: currentVertex,
                verticesToCheck: this.verticesToCheck,
            };
            const neighboursInQueue = currentVertex.getAdjList().filter((v) => {
                return this.verticesToCheck.some(
                    (q) => q.getIndex() === v.getVertexIndex(),
                );
            });
            for (let adjListVertex of neighboursInQueue) {
                const v = this.getVertex(adjListVertex.getVertexIndex());
                this.changeVertexColour(v.getTextName(), "#2ecc71");
                const alt =
                    currentVertex.getDistance() + adjListVertex.getEdgeWeight();
                if (alt < v.getDistance()) {
                    v.setDistance(alt);
                    distances.value[v.getTextName()] = alt;
                    yield {
                        step: "update-distance",
                        currentVertex: currentVertex,
                        verticesToCheck: this.verticesToCheck,
                    };
                    v.setPreviousVertex(currentVertex);
                    // change the colour of all the predecessors of v
                    let prev = v.getPreviousVertex();
                    while (prev) {
                        this.changeVertexColour(prev.getTextName(), "#ff00ff");
                        prev = prev.getPreviousVertex();
                    }
                    yield {
                        step: "set-adj-prev-to-current",
                        currentVertex: currentVertex,
                        verticesToCheck: this.verticesToCheck,
                    };
                    // change the predecessors back to normal
                    prev = v.getPreviousVertex();
                    while (prev) {
                        this.changeVertexColour(prev.getTextName(), nodeFill);
                        prev = prev.getPreviousVertex();
                    }
                }
                this.changeVertexColour(v.getTextName(), nodeFill);
            }
        }
        yield {
            step: "done",
            currentVertex: null,
            verticesToCheck: this.verticesToCheck,
        };
    }
}

const startVertexId = ref<number>(letterToNum[props.sourceChoice.id] - 1);
const nodeData = ref<Record<string, NodeData>>(nodeDatas[whichGraphData.value]);
const distances = ref<Record<string, number>>({});
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
    Object.keys(nodeData.value).forEach((key) => {
        distances.value[nodeData.value[key].id] = Infinity;
    });
    return graph;
};
let graph = setUpGraph(Object.entries(nodeData.value).length);
const dijkstraGenerator = ref<Generator<
    DijkstraYieldData,
    void,
    unknown
> | null>(null);
const start = () => {
    setColoursDefault();
    graph = setUpGraph(Object.entries(nodeData.value).length);
    emit("update:vertices", graph.vertices);
    const generator = graph.dijkstraGenerator(
        graph.getVertex(startVertexId.value),
    );
    dijkstraGenerator.value = generator;
    emit("update:distances", distances.value);
    emit(
        "update:verticesToCheck",
        graph.verticesToCheck.map((v) => v.getTextName()),
    );
};

const reset = () => {
    nodeData.value = nodeDatas[whichGraphData.value];
    linkData.value = linkDatas[whichGraphData.value];
    dijkstraGenerator.value = null;
    emit("update:started", false);
    emit("update:currentVertexName", "");
    emit("update:pseudoStep", null);
    setColoursDefault();
    graph = setUpGraph(Object.entries(nodeData.value).length);
};

const performStep = () => {
    if (dijkstraGenerator.value) {
        const result = dijkstraGenerator.value.next();
        if (result.done) {
            reset();
        } else {
            emit("update:pseudoStep", result.value.step);
            emit(
                "update:verticesToCheck",
                graph.verticesToCheck.map((v) => v.getTextName()),
            );
            if (result.value.currentVertex) {
                emit(
                    "update:currentVertexName",
                    result.value.currentVertex.getTextName(),
                );
            }
            emit("update:vertices", graph.vertices);
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
            start();
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
    () => props.nextStepCounter,
    () => {
        performStep();
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
                        :weight="link.weight"
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
    </div>
</template>
