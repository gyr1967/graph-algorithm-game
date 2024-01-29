import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AdjListVertex from "../src/graph/AdjListVertex";
import DIYBFSGraphDisplay from "../src/components/DIYBFSGraphDisplay.vue";
test("component renders with the correct width and height", () => {
    const scalingFactor = 2;
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
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
            scalingFactor,
        },
    });
    const svgHtml = wrapper.html();
    const graphData = wrapper.vm.nodeData;
    for (const node in graphData) {
        expect(svgHtml).toContain(
            `circle cx="${graphData[node].x}" cy="${graphData[node].y}"`,
        );
    }
});

test("graph data structure has the correct number of vertices", () => {
    const scalingFactor = 1;
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
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
            scalingFactor,
        },
    });
    const graph = wrapper.vm.graph;
    const vertices = graph.getVertices();
    expect(new Set(vertices[0].getAdjList())).toEqual(
        new Set([new AdjListVertex(1), new AdjListVertex(2)]),
    );
    expect(new Set(vertices[1].getAdjList())).toEqual(
        new Set([
            new AdjListVertex(2),
            new AdjListVertex(0),
            new AdjListVertex(3),
        ]),
    );
    expect(new Set(vertices[2].getAdjList())).toEqual(
        new Set([
            new AdjListVertex(0),
            new AdjListVertex(1),
            new AdjListVertex(4),
        ]),
    );
    expect(new Set(vertices[3].getAdjList())).toEqual(
        new Set([
            new AdjListVertex(1),
            new AdjListVertex(6),
            new AdjListVertex(5),
            new AdjListVertex(4),
        ]),
    );
    expect(new Set(vertices[4].getAdjList())).toEqual(
        new Set([new AdjListVertex(2), new AdjListVertex(3)]),
    );
    expect(new Set(vertices[5].getAdjList())).toEqual(
        new Set([new AdjListVertex(6), new AdjListVertex(3)]),
    );
    expect(new Set(vertices[6].getAdjList())).toEqual(
        new Set([new AdjListVertex(3), new AdjListVertex(5)]),
    );
});

test("breadth first starts", () => {
    const scalingFactor = 1;
    const wrapper = mount(DIYBFSGraphDisplay, {
        props: {
            scalingFactor,
        },
    });
    wrapper.vm.startTheAlgorithm(0);
    const started = wrapper.vm.started;
    const step = wrapper.vm.currentStep;
    expect(started).toEqual(true);
    expect(step).toEqual("add-to-queue");
});
