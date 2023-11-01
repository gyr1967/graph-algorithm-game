import AdjListVertex from "./AdjListVertex.ts";
import Vertex from "./Vertex.ts";

export default class Graph {
    numVertices: number;
    vertices: Vertex[];
    visited: Set<number>;
    constructor(n: number) {
        this.numVertices = n;
        this.vertices = [];
        for (let i = 0; i < n; i++) {
            this.vertices.push(new Vertex(i));
        }
        this.visited = new Set<number>();
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
        this.vertices.map((v) => {
            v.setVisited(false);
        });
        // create a queue q
        const queue: Vertex[] = [];
        // mark v as visited and put v into q
        queue.push(startVertex);
        startVertex.setVisited(true);
        this.visited.add(startVertex.getIndex());
        // while there is something in the queue do
        while (queue.length !== 0) {
            // remove the first vertex in the queue and call it v
            const currentVertex: Vertex | undefined = queue.shift();
            if (currentVertex === undefined) {
                throw new Error("currentVertex is undefined");
            }
            // mark v as visited
            currentVertex.setVisited(true);
            this.visited.add(currentVertex.getIndex());
            const unvisitedAdjacents = currentVertex
                .getAdjList()
                .filter((alv: AdjListVertex) => {
                    return !this.visited.has(alv.getVertexIndex());
                });
            // add all of v's unvisited neighbours to the queue
            for (const vertex of unvisitedAdjacents) {
                const i = vertex.getVertexIndex();
                const nextVertex = this.vertices[i];
                this.visited.add(nextVertex.getIndex());
                queue.push(nextVertex);
            }
        }
        return this.visited;
    }
}
