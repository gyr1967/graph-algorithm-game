import AdjListVertex from "./AdjListVertex.ts";
import Vertex from "./Vertex.ts";

export default class Graph {
    numVertices: number;
    vertices: Vertex[];
    constructor(n: number) {
        this.numVertices = n;
        this.vertices = [];
        for (let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i));
        }
    }

    getVertex(i: number) {
        return this.vertices[i];
    }

    setVertex(i: number) {
        this.vertices[i] = new Vertex(i);
    }

    getVertices() {
        return this.vertices;
    }

    bfs(startVertex: Vertex) {
        const visited: Set<number> = new Set();
        this.vertices.map((v) => {
            v.setVisited(false);
        });
        const queue: Vertex[] = [];
        queue.push(startVertex);
        while (queue.length !== 0) {
            const currentVertex: Vertex | undefined = queue.shift();
            if (currentVertex === undefined) {
                throw new Error("currentVertex is undefined");
            }
            currentVertex.setVisited(true);
            visited.add(currentVertex.getIndex());
            const unvisitedAdjacents = currentVertex
                .getAdjList()
                .filter((alv: AdjListVertex) => {
                    return !visited.has(alv.getVertexIndex());
                });
            for (const vertex of unvisitedAdjacents) {
                const i = vertex.getVertexIndex();
                const nextVertex = this.vertices[i];
                visited.add(nextVertex.getIndex());
                queue.push(nextVertex);
            }
        }
        return visited;
    }
}
