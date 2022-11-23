import Rectangle from "./rectangle";

const canvas = document.getElementById("cnvs");
// console.log(canvas.width)

const gameState = {};

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
    // context.fillStyle = "rgb(0, 0, 200)"
    gameState.rects.forEach((figure)=>{
        context.fillStyle = figure.color
        context.fillRect(figure.x, figure.y, figure.w, figure.h)
    })
}

function update(tick) {
    gameState.rects.forEach((figure)=>{
        if (figure.x <= 0 || figure.right >= canvas.width) {
            figure.speed.x *= -1
    }
        if (figure.y <= 0 || figure.bottom >= canvas.height) {
            figure.speed.y *= -1
        }
        figure.x += figure.speed.x
        figure.y += figure.speed.y
    })
    for (let i=0; i<gameState.rects.length-1; i++){
        // console.log(i, gameState.rects[i])
        for (let j=i+1; j<gameState.rects.length; j++){
            // console.log(j, gameState.rects[j])
            // console.log(gameState.rects[i].intersects(gameState.rects[j]))
            if (gameState.rects[i].intersects(gameState.rects[j])){
                const s = gameState.rects[i].speed
                gameState.rects[i].speed = gameState.rects[j].speed
                gameState.rects[j].speed = s
                gameState.rects[i].strike += 1
                gameState.rects[j].strike += 1
                if (gameState.rects[i].strike === 3){
                    gameState.rects.splice(i,1)
                    i-=1
                }
                if (gameState.rects[j].strike === 3){
                    gameState.rects.splice(j,1)
                    j-=1
                }
            }
        }
    }
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    gameState.rects = []
    const rectangle = new Rectangle(10,10, 30, 30)
    rectangle.setSpeed(5, 5)
    rectangle.setColor('rgb(0,120,120)')
    gameState.rects.push(rectangle)
    const rectangle2 = new Rectangle(600,10, 30, 30)
    rectangle2.setSpeed(-10, 5)
    rectangle2.setColor('rgb(0,200,0)')
    gameState.rects.push(rectangle2)

    const rectangle3 = new Rectangle(10,400, 30, 30)
    rectangle3.setSpeed(5, -15)
    rectangle3.setColor('rgb(200,0,0)')
    gameState.rects.push(rectangle3)
}
setup();
run();
