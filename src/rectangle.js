export default class Rectangle {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
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
        return this.x
    }

    get right() {
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    contains(point) {
        return (point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

    intersects(rect) {
        return (this.x < rect.x + rect.w)
            && (rect.x < this.x + this.w)
            && (this.y < rect.y + rect.h)
            && (rect.y < this.y + this.w)
    }

    strike() {
        this.striked += 1;
        this.colors.a -= 0.33;
        let c = this.colors;
        this.color = `rgba(${c.r},${c.g},${c.b},${c.a})`
    }
}