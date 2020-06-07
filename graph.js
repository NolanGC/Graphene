class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.directed = false;
        this.weighted = false;
    }
    draw() {
        for (var j = 0; j < this.edges.length; j++) {
            this.edges[j].draw();
        }
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw();
        }

    }
    addNode(data, x, y) {
        this.nodes.push(new Node(data, x, y));
    }
    removeNode(node) {
        if (this.nodes.data != 0) {
            for (var i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].data > node.data) {
                    this.nodes[i].data--;
                }
            }
            currentNodeNumber--;
        }

        for (var j = this.edges.length - 1; j >= 0; j--) {
            if (this.edges[j].a == node || this.edges[j].b == node) {
                this.edges = this.arrayRemove(this.edges, this.edges[j]);
            }
        }
        this.nodes = this.arrayRemove(this.nodes, node);
    }
    arrayRemove(arr, value) {
        return arr.filter(function (ele) {
            return ele != value;
        });
    }
    addEdge(a, b) {
        for (var j = 0; j < this.edges.length; j++) {
            if (this.edges[j].a == a && this.edges[j].b == b) {
                return;
            }
            if (this.directed && this.edges[j].a == b && this.edges[j].a == b) {
                return;
            }
        }
        this.edges.push(new Edge(a, b));
    }
    addWeightedEdge(a, b, w) {
        for (var j = 0; j < this.edges.length; j++) {
            if (this.edges[j].a == a && this.edges[j].b == b) {
                return;
            }
        }
        this.edges.push(new WeightedEdge(a, b, w));
    }
    generateData() {
        adjListRepresentation = this.nodes.length + " " + this.edges.length + "\n";
        for (var j = 0; j < this.edges.length; j++) {
            if (!this.weighted) {
                adjListRepresentation += this.edges[j].a.data + " " + this.edges[j].b.data + "\n";
            } else {
                adjListRepresentation += this.edges[j].a.data + " " + this.edges[j].b.data + " " + this.edges[j].w + "\n";
            }

        }
    }
    randomGraph(n, m) {
        for (var i = 1; i <= n; i++) {
            this.addNode(i, random(150, 900), random(150, 600));
        }
        while (this.edges.length < m) {
            var index1 = Math.floor(Math.random() * this.nodes.length);
            var index2 = Math.floor(Math.random() * this.nodes.length);
            if (simple) {
                while (index1 == index2) {
                    index1 = Math.floor(Math.random() * this.nodes.length);
                    index2 = Math.floor(Math.random() * this.nodes.length);
                }
            }
            if (this.weighted) {
                var weight;
                if (minW.value() == "min weight" || maxW.value() == "max weight") {
                    weight = random(0, 10);
                } else {
                    weight = Math.round(random(parseInt(minW.value()), parseInt(maxW.value()) + 1));
                }
                this.addWeightedEdge(this.nodes[index1], this.nodes[index2], weight);
                if (!this.directed) {
                    this.addWeightedEdge(this.nodes[index2], this.nodes[index1], weight);
                }
            }
            this.addEdge(this.nodes[index1], this.nodes[index2]);
            if (!this.directed) {
                this.addEdge(this.nodes[index2], this.nodes[index1]);
            }
        }
    }
}