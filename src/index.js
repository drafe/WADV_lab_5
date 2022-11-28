import Rectangle from "./rectangle";
import Circle from "./circle";

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
    gameState.objects.forEach((figure)=>{
        context.fillStyle = figure.color
        if (figure.constructor === Rectangle) {
            context.fillRect(figure.x, figure.y, figure.w, figure.h)
        }
        else if (figure.constructor === Circle){
            context.beginPath()
            context.arc(figure.x, figure.y, figure.r,  0, 2 * Math.PI)
            context.fill()
        }
    })
}

function circ_rect_intersect(f1,f2){
    let circ, rect;
    if (f1.constructor === Circle){
          circ = f1; rect = f2; }
    else{ circ = f2; rect = f1; }
    return ( ( (circ.x-rect.x-rect.w/2)**2 + (circ.y-rect.y-rect.h/2)**2 ) <= (circ.r)**2 + (rect.w/2)**2 + (rect.h/2)**2 )
}

function update(tick) {
    gameState.objects.forEach((figure)=>{
        if (figure.left <= 0 || figure.right >= canvas.width) {
            figure.speed.x *= -1
        }
        if (figure.top <= 0 || figure.bottom >= canvas.height) {
            figure.speed.y *= -1
        }
        figure.x += figure.speed.x
        figure.y += figure.speed.y
    })
    for (let i=0; i<gameState.objects.length-1; ++i){
        let col = [];
        for (let j=i+1; j<gameState.objects.length; ++j){
            if ((gameState.objects[i].constructor === gameState.objects[j].constructor && gameState.objects[i].intersects(gameState.objects[j])) ||
              (gameState.objects[i].constructor !== gameState.objects[j].constructor && circ_rect_intersect(gameState.objects[i], gameState.objects[j])))
            {
                const s = gameState.objects[i].speed
                gameState.objects[i].speed = gameState.objects[j].speed
                gameState.objects[j].speed = s
                gameState.objects[i].strike()
                gameState.objects[j].strike()
                if (gameState.objects[j].striked === 3){
                    col.push(j)
                }
                if (gameState.objects[i].striked === 3){
                    col.unshift(i)
                    break
                }
            }
        }
        col.reverse().forEach(i => { gameState.objects.splice(i,1) })
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
    const n = 100;

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    gameState.objects = []
    for (let i=0; i<n; i++) {
        const [x,y,w,h,sx,sy] = [Math.round(Math.random()*(window.innerWidth-30)),
            Math.round(Math.random()*(window.innerHeight-30)),
            Math.round(15+Math.random()*20),
            Math.round(15+Math.random()*20),
            Math.round(-5+Math.random()*10),
            Math.round(-5+Math.random()*10),
        ]
        const rectangle = new Rectangle(x,y,w,h)
        rectangle.setSpeed(sx,sy)
        rectangle.setColor(0,120,120)
        gameState.objects.push(rectangle)
    }
    for (let i=0; i<n; i++) {
        const [x,y,r,sx,sy] = [Math.round(Math.random()*(window.innerWidth-40)),
            Math.round(Math.random()*(window.innerHeight-40)),
            Math.round(15+Math.random()*20),
            Math.round(-5+Math.random()*10),
            Math.round(-5+Math.random()*10),
        ]
        const circle = new Circle(x,y,r)
        circle.setSpeed(sx,sy)
        circle.setColor(100,0,0)
        gameState.objects.push(circle)
    }
}
setup();
run();
