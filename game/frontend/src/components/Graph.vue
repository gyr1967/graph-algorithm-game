<template>
    <div ref="d3Container" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import { generateGraphData } from "../utils/generate-graph";

const props = defineProps<{
    graphSize: number;
}>();

const graphData = generateGraphData(props.graphSize);

const d3Container = ref<HTMLElement | null>(null);

onMounted(() => {
    if (d3Container.value) {
        const svg = d3
            .select(d3Container.value)
            .append("svg")
            .attr("width", 600)
            .attr("height", 600);

        const simulation = d3
            .forceSimulation(graphData.nodesData)
            .force(
                "link",
                d3.forceLink(graphData.edgesData).id((d: any) => d.id),
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(300, 300));

        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(graphData.edgesData)
            .join("line")
            .attr("stroke-width", 2);

        const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(graphData.nodesData)
            .join("circle")
            .attr("r", 10)
            .attr("fill", "#69b3a2");

        const labels = svg
            .append("g")
            .selectAll("text")
            .data(graphData.nodesData)
            .join("text")
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y)
            .text((d: any) => d.name)
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em");

        simulation.on("tick", () => {
            link.attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
            labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
        });
    }
});
</script>
