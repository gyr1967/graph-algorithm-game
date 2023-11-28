import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AdjListVertex from "../src/graph/AdjListVertex";
import VisBFSGraphDisplay from "../src/components/VisBFSGraphDisplay.vue";

test("component renders with the correct width and height", () => {
    const scalingFactor = 2;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
            stage: "vis",
        },
    });

    const svgElement = wrapper.find(".graph-svg");
    const expectedWidth = 350 * scalingFactor;
    const expectedHeight = 300 * scalingFactor;

    expect(svgElement.attributes("width")).toBe(String(expectedWidth));
    expect(svgElement.attributes("height")).toBe(String(expectedHeight));
});

test("component renders the correct number of nodes and links", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
            stage: "vis",
        },
    });
    const svgHtml = wrapper.html();

    expect(svgHtml).toContain(`circle cx="50" cy="50"`);
    expect(svgHtml).toContain(`circle cx="150" cy="50"`);
    expect(svgHtml).toContain(`circle cx="250" cy="50"`);
    expect(svgHtml).toContain(`line x1="150" y1="50" x2="250" y2="50"`);
    expect(svgHtml).toContain(`line x1="50" y1="50" x2="150" y2="50"`);
});

test("graph data structure has the correct number of vertices", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
            stage: "vis",
        },
    });
    const graph = wrapper.vm.graph;
    expect(graph.getVertices().length).toBe(7);
});

test("vertices are correctly connected", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
            stage: "vis",
        },
    });
    const graph = wrapper.vm.graph;
    const vertices = graph.getVertices();
    expect(vertices[0].getAdjList()).toEqual([new AdjListVertex(1)]);
    expect(vertices[1].getAdjList()).toEqual([
        new AdjListVertex(2),
        new AdjListVertex(0),
        new AdjListVertex(3),
    ]);
    expect(vertices[2].getAdjList()).toEqual([
        new AdjListVertex(1),
        new AdjListVertex(4),
    ]);
    expect(vertices[3].getAdjList()).toEqual([
        new AdjListVertex(1),
        new AdjListVertex(6),
        new AdjListVertex(4),
    ]);
    expect(vertices[4].getAdjList()).toEqual([
        new AdjListVertex(2),
        new AdjListVertex(3),
    ]);
    expect(vertices[5].getAdjList()).toEqual([new AdjListVertex(6)]);
    expect(vertices[6].getAdjList()).toEqual([
        new AdjListVertex(3),
        new AdjListVertex(5),
    ]);
});

test("breadth first search works", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
            stage: "vis",
        },
    });
    const graph = wrapper.vm.graph;
    const vertices = graph.getVertices();
    const bfs = graph.bfsGenerator(vertices[0]);
    let result = bfs.next();
    while (result.done === false) {
        result = bfs.next();
    }
    const visited = graph.visited;
    expect(visited).toEqual(new Set([0, 1, 2, 3, 4, 6, 5]));
});
