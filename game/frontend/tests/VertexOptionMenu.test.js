import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import VertexOptionMenu from "../src/components/VertexOptionMenu.vue";

test("Correct text is shown in VertexOptionsMenu for DFS", () => {
    const wrapper = mount(VertexOptionMenu, {
        props: {
            text: "A",
            nodeId: "A",
            disabled: false,
            bfsOrDfs: "dfs",
        },
    });

    const textElement = wrapper.text();
    console.log(textElement);
    const expectedText1 = "Add A to stack";
    const expectedText2 = "Remove A from stack and set to current vertex";
    const expectedText3 = "Mark A as visited";
    const textIncludesExpected =
        textElement.includes(expectedText1) &&
        textElement.includes(expectedText2) &&
        textElement.includes(expectedText3);
    expect(textIncludesExpected).toBe(true);
});

test("Correct text is shown in VertexOptionsMenu for BFS", () => {
    const wrapper = mount(VertexOptionMenu, {
        props: {
            text: "A",
            nodeId: "A",
            disabled: false,
            bfsOrDfs: "bfs",
        },
    });

    const textElement = wrapper.text();
    console.log(textElement);
    const expectedText1 = "Add A to queue";
    const expectedText2 = "Remove A from queue and set to current vertex";
    const expectedText3 = "Mark A as visited";
    const textIncludesExpected =
        textElement.includes(expectedText1) &&
        textElement.includes(expectedText2) &&
        textElement.includes(expectedText3);
    expect(textIncludesExpected).toBe(true);
});
