import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AdjListVertex from "../src/graph/AdjListVertex";
import VisBFSGraphDisplay from "../src/components/VisBFSGraphDisplay.vue";

test("component renders with the correct width and height", () => {
    const scalingFactor = 2;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            scalingFactor,
            graphChoice: "2",
            sourceChoice: { id: "A" },
            started: false,
            resetCounter: 0,
            nextStepCounter: 0,
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
            scalingFactor,
            graphChoice: "2",
            sourceChoice: { id: "A" },
            started: false,
            resetCounter: 0,
            nextStepCounter: 0,
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
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            scalingFactor,
            graphChoice: "2",
            sourceChoice: { id: "A" },
            started: false,
            resetCounter: 0,
            nextStepCounter: 0,
        },
    });
    const graph = wrapper.vm.graph;
    expect(graph.getVertices().length).toBe(7);
});

test("vertices are correctly connected", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            scalingFactor,
            graphChoice: "2",
            sourceChoice: { id: "A" },
            started: false,
            resetCounter: 0,
            nextStepCounter: 0,
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
            new AdjListVertex(1),
            new AdjListVertex(4),
            new AdjListVertex(0),
        ]),
    );
    expect(new Set(vertices[3].getAdjList())).toEqual(
        new Set([
            new AdjListVertex(1),
            new AdjListVertex(6),
            new AdjListVertex(4),
            new AdjListVertex(5),
        ]),
    );
    expect(new Set(vertices[4].getAdjList())).toEqual(
        new Set([new AdjListVertex(2), new AdjListVertex(3)]),
    );
    expect(new Set(vertices[5].getAdjList())).toEqual(
        new Set([new AdjListVertex(3), new AdjListVertex(6)]),
    );
    expect(new Set(vertices[6].getAdjList())).toEqual(
        new Set([new AdjListVertex(3), new AdjListVertex(5)]),
    );
});

test("breadth first search works", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisBFSGraphDisplay, {
        props: {
            scalingFactor,
            graphChoice: "2",
            sourceChoice: { id: "A" },
            started: false,
            resetCounter: 0,
            nextStepCounter: 0,
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
