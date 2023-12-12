import AdjListVertex from "./AdjListVertex.js";

class Vertex {
    adjList: AdjListVertex[];
    index: number;
    visited: boolean;
    textName: string;
    constructor(n: number, textName: string) {
        this.adjList = [];
        this.index = n;
        this.visited = false;
        this.textName = textName;
    }

    getAdjList() {
        return this.adjList;
    }

    getIndex() {
        return this.index;
    }

    setIndex(n: number) {
        this.index = n;
    }

    getVisited() {
        return this.visited;
    }

    setVisited(b: boolean) {
        this.visited = b;
    }

    getTextName() {
        return this.textName;
    }

    addToAdjList(n: number, edgeWeight: number = 0) {
        if (edgeWeight !== 0) {
            throw new Error("Unweighted graph cannot have edge weights");
        }
        this.adjList.push(new AdjListVertex(n));
    }

    vertexDegree() {
        return this.adjList.length;
    }
}

export default Vertex;

export class DijkstraVertex extends Vertex {
    distance = Infinity;
    previousVertex: DijkstraVertex | null = null;
    constructor(index: number, textName: string) {
        super(index, textName);
    }
    setDistance = (distance: number) => {
        this.distance = distance;
    };
    getDistance = () => {
        return this.distance;
    };
    setPreviousVertex = (previousVertex: DijkstraVertex | null) => {
        this.previousVertex = previousVertex;
    };
    getPreviousVertex = () => {
        return this.previousVertex;
    };
    addToAdjList = (n: number, edgeWeight: number) => {
        this.adjList.push(new AdjListVertex(n, edgeWeight));
    };
}
