import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import DijkstraHintBox from "../src/components/dijkstra/DijkstraHintBox.vue";

test("Correct text is shown in DijkstraHintBox.vue at start", () => {
    const wrapper = mount(DijkstraHintBox, {
        props: {
            text: "set-source-to-zero",
            currentVertexName: "",
            started: true,
            queue: ["A", "B", "C", "D", "E", "F"],
            distances: {
                A: Infinity,
                B: Infinity,
                C: Infinity,
                D: Infinity,
                E: Infinity,
                F: Infinity,
            },
            adjacentVertexName: "",
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Set the source vertex distance to zero";
    expect(textElement).toContain(expectedText);
});

test("Correct text is shown in DijkstraHintBox.vue midway", () => {
    const wrapper = mount(DijkstraHintBox, {
        props: {
            text: "update-distance",
            currentVertexName: "B",
            started: true,
            queue: ["C", "D", "E", "F"],
            distances: { A: 0, B: 1, C: Infinity, D: Infinity, E: 3, F: 9 },
            adjacentVertexName: "F",
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Update the distance of an adjacent vertex";
    expect(textElement).toContain(expectedText);
});

test("Correct text is shown in DijkstraHintBox.vue at another point", () => {
    const wrapper = mount(DijkstraHintBox, {
        props: {
            text: "set-adj-prev-to-current",
            currentVertexName: "C",
            started: true,
            queue: ["D", "E", "F"],
            distances: { A: 0, B: 1, C: 2, D: 5, E: 3, F: 9 },
            adjacentVertexName: "D",
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Set D's previous vertex to C";
    expect(textElement).toContain(expectedText);
});
