import Vertex from "../graph/Vertex.ts";

export type DFSStep =
    | "addFirstToStack"
    | "while"
    | "removeFirstAndMakeItCurrent"
    | "markVAsVisited"
    | "addVNeighboursToStack";

export type DFSYieldData = {
    visited: Set<number>;
    stack: Vertex[];
    step: DFSStep;
    currentVertex: Vertex | null;
};

export type DFSGuidedSteps =
    | "visit"
    | "add-to-stack"
    | "remove-and-set-to-current"
    | "done";
