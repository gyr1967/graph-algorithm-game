import { DijkstraVertex } from "../graph/Vertex";

export type DijkstraStep =
    | "set-source-to-zero"
    | "remove-and-set-to-current"
    | "update-distance"
    | "set-adj-prev-to-current"
    | "done";

export type DijkstraYieldData = {
    step: DijkstraStep;
    currentVertex: DijkstraVertex | null;
    verticesToCheck: DijkstraVertex[];
};

export type DijkstraGuidedSteps =
    | "visit"
    | "add-to-stack"
    | "remove-and-set-to-current"
    | "done";
