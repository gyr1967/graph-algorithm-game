<script setup lang="ts">
import Node from "../Node.vue";
import Link from "../Link.vue";
import DijkstraMediaControls from "./DijkstraMediaControls.vue";
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
defineEmits([
    "update:currentVertexName",
    "update:pseudoStep",
    "update:verticesToCheck",
    "update:distances",
    "update:vertices",
]);

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
}
const nodeData = nodeDatas[props.whichGraphData];
const distances = ref<Record<string, number>>({});
const linkData = ref<Record<string, EdgeData>>(linkDatas[props.whichGraphData]);
const randomiseLinkLengths = () => {
    Object.keys(linkData.value).forEach((key) => {
        linkData.value[key].weight = Math.floor(Math.random() * 14) + 1;
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
