import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AdjListVertex from "../src/graph/AdjListVertex";
import DIYBFSGraphDisplay from "../src/components/DIYBFSGraphDisplay.vue";
test("component renders with the correct width and height", () => {
    const scalingFactor = 2;
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
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
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
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
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
        },
    });
    const graph = wrapper.vm.graph;
    expect(graph.getVertices().length).toBe(7);
});

test("vertices are correctly connected", () => {
    const scalingFactor = 1;
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
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

test("breadth first starts", () => {
    const scalingFactor = 1;
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
        },
    });
    const graph = wrapper.vm.graph;
    const vertices = graph.getVertices();
    wrapper.vm.sourceVertexName = "A";
    wrapper.vm.startTheAlgorithm();
    expect(graph.currentVertex.value).toEqual(vertices[0]);
});
