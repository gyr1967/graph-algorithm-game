import Vertex from "../graph/Vertex.ts";

export type BFSStep =
    | "addFirstToQueue"
    | "while"
    | "removeFirstAndMakeItCurrent"
    | "markVAsVisited"
    | "addVNeighboursToQueue";

export type BFSYieldData = {
    visited: Set<number>;
    queue: Vertex[];
    step: BFSStep;
    currentVertex: Vertex | null;
};

export type BFSGuidedSteps =
    | "visit"
    | "add-to-queue"
    | "remove-and-set-to-current"
    | "done";
