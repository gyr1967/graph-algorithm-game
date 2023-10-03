<template>
    <div ref="d3Container" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as d3 from "d3";

const graphData = {
    nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
    links: [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "3", target: "4" },
        { source: "4", target: "1" },
    ],
};

const d3Container = ref<HTMLElement | null>(null);

onMounted(() => {
    if (d3Container.value) {
        const svg = d3
            .select(d3Container.value)
            .append("svg")
            .attr("width", 600)
            .attr("height", 600);

        const simulation = d3
            .forceSimulation(graphData.nodes)
            .force(
                "link",
                d3.forceLink(graphData.links).id((d: { id: any }) => d.id),
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(300, 300));

        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(graphData.links)
            .join("line")
            .attr("stroke-width", 2);

        const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(graphData.nodes)
            .join("circle")
            .attr("r", 10)
            .attr("fill", "#69b3a2");

        simulation.on("tick", () => {
            link.attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
        });
    }
});
</script>
