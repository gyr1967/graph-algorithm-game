import Vertex from "../graph/Vertex.ts";

export type BFSData =
    | "markFirstAsVisited"
    | "while"
    | "removeFirstAndMakeItCurrent"
    | "markVAsVisited"
    | "addVNeighboursToQueue";

export type BFSYieldData = {
    visited: Set<number>;
    queue: Vertex[];
    step: BFSData;
    currentVertex: Vertex | null;
};
