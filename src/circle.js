export default class Circle {
    constructor(xc, yc, r) {
        this.x = xc
        this.y = yc
        this.r = r
        this.speed = {x: 0, y: 0}
        this.striked = 0
    }

    setColor(r,g,b) {
        this.colors = {r:r,g:g,b:b,a:1.0};
        this.color = `rgba(${r},${g},${b},${this.colors.a})`
    }

    setSpeed(x, y){

        this.speed.x = x
        this.speed.y = y
    }
    get left() {
        return this.x - this.r
    }

    get right() {
        return this.x + this.r
    }

    get top() {
        return this.y - this.r
    }

    get bottom() {
        return this.y + this.r
    }

    contains(point) {
        return ( ( (point.x-this.x)**2 + (point.y-this.y)**2 )<= this.r**2)
    }

    intersects(circ) {
       return ( ( (circ.x-this.x)**2 + (circ.y-this.y)**2 ) <= (circ.r + this.r)**2)
    }

    strike() {
        this.striked += 1;
        this.colors.a -= 0.33;
        let c = this.colors;
        this.color = `rgba(${c.r},${c.g},${c.b},${c.a})`
    }
}