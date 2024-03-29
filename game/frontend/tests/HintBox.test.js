import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import HintBox from "../src/components/HintBox.vue";

test("Correct text is shown in HintBox.vue at start", () => {
    const wrapper = mount(HintBox, {
        props: {
            text: "add-to-queue",
            currentVertexName: "A",
            started: true,
            visited: [],
            queue: [],
            bfsOrDfs: "bfs",
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Add A to the queue";
    expect(textElement).toContain(expectedText);
});

test("Correct text is shown in HintBox.vue midway", () => {
    const wrapper = mount(HintBox, {
        props: {
            text: "visit",
            currentVertexName: "D",
            started: true,
            visited: ["A", "B", "C"],
            queue: ["E"],
            bfsOrDfs: "bfs",
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Mark D as visited";
    expect(textElement).toContain(expectedText);
});

test("Correct text is shown in HintBox.vue midway for DIY", () => {
    const wrapper = mount(HintBox, {
        props: {
            text: "visit",
            currentVertexName: "D",
            started: true,
            visited: ["A", "B", "C"],
            queue: ["E"],
            bfsOrDfs: "bfs",
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Mark D as visited";
    expect(textElement).toContain(expectedText);
});

test("Correct hints shown for DFS", () => {
    const wrapper = mount(HintBox, {
        props: {
            text: "add-to-queue",
            currentVertexName: "A",
            started: true,
            visited: [],
            queue: [],
            bfsOrDfs: "dfs",
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Add A to the stack";
    expect(textElement).toContain(expectedText);
});
