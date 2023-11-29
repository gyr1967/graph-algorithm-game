function findClosest(visited) {
    let min = Number.MAX_VALUE;
    let closest = null;
    for (let i = 0; i < size(); i++) {
        if (!visited[i] && vertices[i].getDistance() < min) {
            min = vertices[i].getDistance();
            closest = vertices[i];
        }
    }
    return closest;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function dijkstra(start, target) {
    start.setDistance(0);
    start.setVisited(true);
    const bool = new Array(size()).fill(false);
    bool[start.getIndex()] = true;

    for (const node of start.getAdjList()) {
        vertices[node.getVertexIndex()].setDistance(node.getEdgeWeight());
        vertices[node.getVertexIndex()].setPredecessor(start.getIndex());
    }

    let closest = findClosest(bool);
    while (closest !== target) {
        closest.setVisited(true);
        bool[closest.getIndex()] = true;

        for (const node of closest.getAdjList()) {
            if (
                vertices[node.getVertexIndex()].getDistance() >
                closest.getDistance() + node.getEdgeWeight()
            ) {
                vertices[node.getVertexIndex()].setDistance(
                    closest.getDistance() + node.getEdgeWeight(),
                );
                vertices[node.getVertexIndex()].setPredecessor(
                    closest.getIndex(),
                );
            }
        }

        closest = findClosest(bool);
        if (closest === null) {
            return false;
        } else if (closest === target) {
            return true;
        }
    }

    return true;
}
