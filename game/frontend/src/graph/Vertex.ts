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

    addToAdjList(n: number) {
        this.adjList.push(new AdjListVertex(n));
    }

    vertexDegree() {
        return this.adjList.length;
    }
}

export default Vertex;
