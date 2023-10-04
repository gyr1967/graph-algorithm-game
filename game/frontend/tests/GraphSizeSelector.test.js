import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import GraphSizeSelector from "../src/components/GraphSizeSelector.vue";

test("text appears as expected", () => {
    const wrapper = mount(GraphSizeSelector);

    expect(wrapper.text()).toContain("Number of Vertices");
});

test("changing slider changes value", async () => {
    const wrapper = mount(GraphSizeSelector);
    const slider = wrapper.find('input[type="range"]');

    slider.setValue(5);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty("input");
    expect(wrapper.emitted().input).toHaveLength(1);
});
