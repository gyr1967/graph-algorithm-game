import { expect, test } from "vitest";
import Graph from "../src/graph/Graph.ts";

test("instance of graph is created", () => {
    const graph = new Graph(3);
    expect(graph).toBeInstanceOf(Graph);
});

test("graph has correct number of vertices", () => {
    const graph = new Graph(10);
    expect(graph.getVertices().length).toBe(10);
});

test("vertices are correctly connected", () => {
    const graph = new Graph(3);
    const vertices = graph.getVertices();
    console.log(vertices[0]);
    vertices[0].addToAdjList(vertices[1].getIndex());
    vertices[0].addToAdjList(vertices[2].getIndex());
    vertices[1].addToAdjList(vertices[2].getIndex());
    expect(vertices[0].getAdjList().length).toEqual(2);
    expect(vertices[1].getAdjList().length).toEqual(1);
});

test("breadth first search works", () => {
    const graph = new Graph(5);
    const vertices = graph.getVertices();
    vertices[0].addToAdjList(vertices[1].getIndex());
    vertices[0].addToAdjList(vertices[2].getIndex());
    vertices[1].addToAdjList(vertices[2].getIndex());
    vertices[2].addToAdjList(vertices[3].getIndex());
    vertices[3].addToAdjList(vertices[4].getIndex());
    const bfs = graph.bfs(vertices[0]);
    expect(bfs).toEqual(new Set([0, 1, 2, 3, 4]));
});
