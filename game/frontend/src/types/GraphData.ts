export default interface GraphData {
    nodesData: NodeData[];
    edgesData: EdgeData[];
}

export interface NodeDatas {
    [key: number]: Record<string, NodeData>;
}

export interface NodeData {
    id: string;
    x: number;
    y: number;
}

export interface EdgeDatas {
    [key: number]: Record<string, EdgeData>;
}

export interface EdgeData {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    strokeWidth: string;
    text?: string;
}
