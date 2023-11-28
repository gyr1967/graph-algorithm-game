import { numToLetter } from "../utils/num-to-letter";
import Vertex from "./Vertex";

export default class Graph {
    numVertices: number;
    vertices: Vertex[];
    visited: Set<number> = new Set<number>();
    queue: Vertex[] = [];
    constructor(n: number) {
        this.numVertices = n;
        this.vertices = [];
        for (let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i, numToLetter[i + 1]));
        }
    }

    getVertex(i: number) {
        return this.vertices[i];
    }

    setVertex(i: number) {
        this.vertices[i] = new Vertex(i, numToLetter[i + 1]);
    }

    getVertices() {
        return this.vertices;
    }
}
