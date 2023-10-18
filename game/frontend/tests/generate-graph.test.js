import { expect, test } from "vitest";
import { generateGraphData } from "../src/utils/generate-graph";

test("generateGraphData returns correct number of vertices", () => {
    const { nodesData } = generateGraphData(5);
    expect(nodesData).toHaveLength(5);
    const { nodesData: nodesData2 } = generateGraphData(10);
    expect(nodesData2).toHaveLength(10);
});

test("generateGraphData has at least n-1 number edges", () => {
    const { edgesData } = generateGraphData(5);
    expect(edgesData.length).toBeGreaterThanOrEqual(4);
    const { edgesData: edgesData2 } = generateGraphData(10);
    expect(edgesData2.length).toBeGreaterThanOrEqual(9);
});
