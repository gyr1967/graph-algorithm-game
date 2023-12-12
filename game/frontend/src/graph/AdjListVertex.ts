export default class AdjListVertex {
    vertexIndex: number;
    edgeWeight: number;
    constructor(n: number, edgeWeight: number = 0) {
        this.vertexIndex = n;
        this.edgeWeight = edgeWeight;
    }

    getVertexIndex() {
        return this.vertexIndex;
    }
    getEdgeWeight() {
        return this.edgeWeight;
    }
}
