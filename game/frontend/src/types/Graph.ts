import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export default interface GraphData {
    nodesData: NodeData[];
    edgesData: EdgeData[];
}

export interface NodeData extends SimulationNodeDatum {
    id: string;
    name: number;
}

export interface EdgeData extends SimulationLinkDatum<NodeData> {
    id: string;
    source: string;
    target: string;
}
