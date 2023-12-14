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

    expect(svgHtml).toContain(`circle cx="50" cy="50"`);
    expect(svgHtml).toContain(`circle cx="150" cy="50"`);
    expect(svgHtml).toContain(`circle cx="250" cy="50"`);
    expect(svgHtml).toContain(`line x1="150" y1="50" x2="250" y2="50"`);
    expect(svgHtml).toContain(`line x1="50" y1="50" x2="150" y2="50"`);

    wrapper = mount(VisDijkstraGraphDisplay, {
        props: {
            whichGraphData: 2,
            scalingFactor,
        },
    });
    svgHtml = wrapper.html();

    expect(svgHtml).toContain(`circle cx="30" cy="150"`);
    expect(svgHtml).toContain(`circle cx="175" cy="150"`);
    expect(svgHtml).toContain(`circle cx="300" cy="100"`);
    expect(svgHtml).toContain(`circle cx="275" cy="275"`);
    expect(svgHtml).toContain(`circle cx="75" cy="275"`);
    expect(svgHtml).toContain(`circle cx="175" cy="50"`);
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
    // these are the links
    // 2: {
    //     A_B: {
    //         v1: "A",
    //         v2: "B",
    //         x1: nodeDatas[2]["A"].x,
    //         y1: nodeDatas[2]["A"].y,
    //         x2: nodeDatas[2]["B"].x,
    //         y2: nodeDatas[2]["B"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 1,
    //     },
    //     A_F: {
    //         v1: "A",
    //         v2: "F",
    //         x1: nodeDatas[2]["A"].x,
    //         y1: nodeDatas[2]["A"].y,
    //         x2: nodeDatas[2]["F"].x,
    //         y2: nodeDatas[2]["F"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 9,
    //     },
    //     A_E: {
    //         v1: "A",
    //         v2: "E",
    //         x1: nodeDatas[2]["A"].x,
    //         y1: nodeDatas[2]["A"].y,
    //         x2: nodeDatas[2]["E"].x,
    //         y2: nodeDatas[2]["E"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 3,
    //     },
    //     B_E: {
    //         v1: "B",
    //         v2: "E",
    //         x1: nodeDatas[2]["B"].x,
    //         y1: nodeDatas[2]["B"].y,
    //         x2: nodeDatas[2]["E"].x,
    //         y2: nodeDatas[2]["E"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 4,
    //     },
    //     B_D: {
    //         v1: "B",
    //         v2: "D",
    //         x1: nodeDatas[2]["B"].x,
    //         y1: nodeDatas[2]["B"].y,
    //         x2: nodeDatas[2]["D"].x,
    //         y2: nodeDatas[2]["D"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 5,
    //     },
    //     B_C: {
    //         v1: "B",
    //         v2: "C",
    //         x1: nodeDatas[2]["B"].x,
    //         y1: nodeDatas[2]["B"].y,
    //         x2: nodeDatas[2]["C"].x,
    //         y2: nodeDatas[2]["C"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 1,
    //     },
    //     C_F: {
    //         v1: "C",
    //         v2: "F",
    //         x1: nodeDatas[2]["C"].x,
    //         y1: nodeDatas[2]["C"].y,
    //         x2: nodeDatas[2]["F"].x,
    //         y2: nodeDatas[2]["F"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 2,
    //     },
    //     C_D: {
    //         v1: "C",
    //         v2: "D",
    //         x1: nodeDatas[2]["C"].x,
    //         y1: nodeDatas[2]["C"].y,
    //         x2: nodeDatas[2]["D"].x,
    //         y2: nodeDatas[2]["D"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 3,
    //     },
    //     E_D: {
    //         v1: "E",
    //         v2: "D",
    //         x1: nodeDatas[2]["E"].x,
    //         y1: nodeDatas[2]["E"].y,
    //         x2: nodeDatas[2]["D"].x,
    //         y2: nodeDatas[2]["D"].y,
    //         stroke: "#ccc",
    //         strokeWidth: "2",
    //         weight: 9,
    //     },
    // }
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
