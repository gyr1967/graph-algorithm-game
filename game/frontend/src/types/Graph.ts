export default interface Graph {
    nodes: Node[];
    edges: Edge[];
}

export interface Node {
    id: string;
    name: number;
}

export interface Edge {
    id: string;
    source: string;
    target: string;
}
