class Node {
    constructor(data, x, y) {
        this.r = 60;
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.data = data;
    }
    draw() {
        if (dist(this.x, this.y, mouseX, mouseY) < this.r && mouseIsPressed) {
            if (creatingEdge) {
                if (firstNode == null) {
                    firstNode = this;
                    midClick = true;
                } else if (!midClick) {
                    if (g.weighted) {
                        g.addWeightedEdge(firstNode, this, parseInt(weightBuffer));
                        if (!g.directed) {
                            g.addWeightedEdge(this, firstNode, parseInt(weightBuffer));
                        }
                        weightBuffer = "";
                    }
                    g.addEdge(firstNode, this);
                    if (!g.directed) {
                        g.addEdge(this, firstNode);
                    }
                    firstNode = null;
                    creatingEdge = false;
                    g.generateData();
                    data.value(adjListRepresentation);
                }
            } else if (currentDraggable == this || currentDraggable == null) {
                this.x = mouseX;
                this.y = mouseY;
                currentDraggable = this;
            }
        }
        if (firstNode == this) {
            fill(0, 255, 0);
        } else {
            fill(255, 255, 255);
        }
        ellipse(this.x, this.y, this.r, this.r);
        fill(0);
        text(this.data, this.x, this.y + 8);
    }
}