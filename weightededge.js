class WeightedEdge {
    constructor(a, b, w) {
        this.a = a;
        this.b = b;
        if (w) {
            this.w = w;
        } else {
            this.w = 0;
        }

    }
    draw() {
        if (this.a == this.b) {
            noFill();
            arc(this.a.x, this.a.y, 40, 150, PI, 0)
            fill(0);
        } else {
            var angle = atan2(this.a.y - this.b.y, this.a.x - this.b.x);
            var dy = (this.b.y - this.a.y);
            var dx = (this.b.x - this.a.x);
            var m = dy / dx;
            var tx = (this.b.x + this.a.x) / 2;
            var ty = m * tx - m * this.a.x + this.a.y;
            text(this.w, tx, ty);

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