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
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Add A to the queueHint";
    expect(textElement).toBe(expectedText);
});

test("Correct text is shown in HintBox.vue midway", () => {
    const wrapper = mount(HintBox, {
        props: {
            text: "visit",
            currentVertexName: "D",
            started: true,
            visited: ["A", "B", "C"],
            queue: ["E"],
        },
    });

    const textElement = wrapper.text();
    const expectedText = "Mark D as visitedHint";
    expect(textElement).toBe(expectedText);
});
