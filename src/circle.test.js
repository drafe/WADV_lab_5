import Circle from "./circle";

describe('Circle getters', () => {
    it('should calculate borders correctly', () => {
        const rect = new Circle(10, 10, 3)
        expect(rect.left).toBe(7)
        expect(rect.right).toBe(13)
        expect(rect.top).toBe(7)
        expect(rect.bottom).toBe(13)
    })
})

describe('Circle.contains()', () => {
    let circ
    beforeEach(() => {
        circ = new Circle(10, 10, 3)
    })

    it('should returns true if point is inside the circ', () => {
        expect(circ.contains({x: 10, y: 10})).toBeTruthy()
    })

    it('should returns false if point located on circ border', () => {
        expect(circ.contains({x: 7, y: 10})).toBeTruthy()
        expect(circ.contains({x: 10, y: 13})).toBeTruthy()
    })

    it('should returns false if point is out of circ', () => {
        expect(circ.contains({x: 4, y: 1})).toBeFalsy()
    })
})


describe('Circle.intersects()', () => {
    let circ
    beforeEach(() => {
        circ = new Circle(10, 10, 3)
    })

    it('should returns true if circs are intersected', () => {
        const otherCirc = new Circle(15, 10, 3)
        expect(circ.intersects(otherCirc)).toBeTruthy()
    })

    it('should returns true if one circ contains other', () => {
        const otherCirc = new Circle(9, 9, 1)
        expect(circ.intersects(circ)).toBeTruthy()
    })

    it('should returns false if circs are not intersected', () => {
        const otherCirc = new Circle(20, 10, 1)
        expect(circ.intersects(otherCirc)).toBeFalsy()
    })
})