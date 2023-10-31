import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Graph from "../src/components/Graph.vue";

test("component renders with the correct width and height", () => {
    const scalingFactor = 2;
    const wrapper = mount(Graph, {
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
    const wrapper = mount(Graph, {
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
