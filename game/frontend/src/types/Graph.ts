import { SimulationNodeDatum, SimulationLinkDatum } from "d3";

export default interface Graph {
    nodes: Node[];
    edges: Edge[];
}

export interface Node extends SimulationNodeDatum {
    id: string;
    name: number;
}

export interface Edge extends SimulationLinkDatum<Node> {
    id: string;
}
