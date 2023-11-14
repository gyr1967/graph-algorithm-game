import Vertex from "../graph/Vertex.ts";

export type BFSData =
    | "createQueue"
    | "markFirstAsVisited"
    | "while"
    | "removeFirst"
    | "callItV"
    | "markVAsVisited"
    | "addVNeighboursToQueue";

export type BFSYieldData = {
    visited: Set<number>;
    queue: Vertex[];
    step: BFSData;
};
