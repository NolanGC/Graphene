class Edge {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    draw() {
        if (this.a == this.b) {
            noFill();
            arc(this.a.x, this.a.y, 40, 150, PI, 0);
            fill(0);
        } else {
            var angle = atan2(this.a.y - this.b.y, this.a.x - this.b.x);
            var z = dist(this.a.x, this.a.y, this.b.x, this.b.y) - 36;
            var startx = -1 * 30 * Math.cos(angle) + this.a.x;
            var starty = -1 * 30 * Math.sin(angle) + this.a.y;
            var destx = -1 * z * Math.cos(angle) + this.a.x;
            var desty = -1 * z * Math.sin(angle) + this.a.y;

            var offset = 10;
            line(startx, starty, destx, desty);
            push();

            translate(destx, desty);
            rotate(angle - HALF_PI);
            triangle(-offset * 0.5, offset, offset * 0.5, offset, 0, -offset / 2);
            pop();
        }
    }
}