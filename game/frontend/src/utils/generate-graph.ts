import type GraphData from "../types/Graph";
import type { NodeData, EdgeData } from "../types/Graph";

export const generateGraphData = (nodeCount: number) => {
    const nodesData: NodeData[] = Array.from({ length: nodeCount }, (_, i) => ({
        id: `${i + 1}`,
        name: i + 1,
    }));

    const edgesData: EdgeData[] = [];
    const adjList: number[][] = Array.from({ length: nodeCount }, () => []);
    for (let i = 1; i < nodeCount; i++) {
        const parent = Math.floor(Math.random() * i);
        adjList[parent].push(i);
        adjList[i].push(parent);
        edgesData.push({
            id: `${i + 1}`,
            source: `${parent + 1}`,
            target: `${i + 1}`,
        });
    }

    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            if (Math.random() < 0.1) {
                adjList[i].push(j);
                adjList[j].push(i);
                edgesData.push({
                    id: `${i + 1}`,
                    source: `${i + 1}`,
                    target: `${j + 1}`,
                });
            }
        }
    }
    const graphData: GraphData = { nodesData, edgesData };
    return graphData;
};
