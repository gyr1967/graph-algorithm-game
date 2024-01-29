import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AdjListVertex from "../src/graph/AdjListVertex";
import VisDijkstraGraphDisplay from "../src/components/dijkstra/VisDijkstraGraphDisplay.vue";

test("component renders with the correct width and height", () => {
    const scalingFactor = 2;
    const wrapper = mount(VisDijkstraGraphDisplay, {
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
    let wrapper = mount(VisDijkstraGraphDisplay, {
        props: {
            whichGraphData: 1,
            scalingFactor,
        },
    });
    let svgHtml = wrapper.html();

    const graphData1 = wrapper.vm.nodeData;
    for (const node in graphData1) {
        expect(svgHtml).toContain(
            `circle cx="${graphData1[node].x}" cy="${graphData1[node].y}"`,
        );
    }

    wrapper = mount(VisDijkstraGraphDisplay, {
        props: {
            whichGraphData: 2,
            scalingFactor,
        },
    });
    svgHtml = wrapper.html();

    const graphData2 = wrapper.vm.nodeData;
    for (const node in graphData2) {
        expect(svgHtml).toContain(
            `circle cx="${graphData2[node].x}" cy="${graphData2[node].y}"`,
        );
    }
});

test("graph data structure has the correct number of vertices", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisDijkstraGraphDisplay, {
        props: {
            whichGraphData: 2,
            scalingFactor,
        },
    });
    const graph = wrapper.vm.graph;
    expect(graph.getVertices().length).toBe(6);
});

test("vertices are correctly connected", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisDijkstraGraphDisplay, {
        props: {
            whichGraphData: 2,
            scalingFactor,
        },
    });
    const graph = wrapper.vm.graph;
    const vertices = graph.getVertices();

    expect(vertices[0].getAdjList()).toEqual([
        new AdjListVertex(1, 1),
        new AdjListVertex(5, 9),
        new AdjListVertex(4, 3),
    ]);
    expect(vertices[1].getAdjList()).toEqual([
        new AdjListVertex(0, 1),
        new AdjListVertex(4, 4),
        new AdjListVertex(3, 5),
        new AdjListVertex(2, 1),
    ]);
    expect(vertices[2].getAdjList()).toEqual([
        new AdjListVertex(1, 1),
        new AdjListVertex(5, 2),
        new AdjListVertex(3, 3),
    ]);
    expect(vertices[3].getAdjList()).toEqual([
        new AdjListVertex(1, 5),
        new AdjListVertex(2, 3),
        new AdjListVertex(4, 9),
    ]);
    expect(vertices[4].getAdjList()).toEqual([
        new AdjListVertex(0, 3),
        new AdjListVertex(1, 4),
        new AdjListVertex(3, 9),
    ]);
    expect(vertices[5].getAdjList()).toEqual([
        new AdjListVertex(0, 9),
        new AdjListVertex(2, 2),
    ]);
});

test("dijkstras works", () => {
    const scalingFactor = 1;
    const wrapper = mount(VisDijkstraGraphDisplay, {
        props: {
            whichGraphData: 2,
            scalingFactor,
            stage: "vis",
        },
    });
    const graph = wrapper.vm.graph;
    const vertices = graph.getVertices();
    const dijkstra = graph.dijkstraGenerator(vertices[0]);
    let result = dijkstra.next();
    while (result.done === false) {
        result = dijkstra.next();
    }
    expect(vertices[0].distance).toBe(0);
    expect(vertices[1].distance).toBe(1);
    expect(vertices[2].distance).toBe(2);
    expect(vertices[3].distance).toBe(5);
    expect(vertices[4].distance).toBe(3);
    expect(vertices[5].distance).toBe(4);
});
