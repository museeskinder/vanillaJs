//Rules elements
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

//canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

//Rules event handlers
rulesBtn.addEventListener('click', e => rules.classList.add('show'));
closeBtn.addEventListener('click', e => rules.classList.remove('show'));

//paddle key press event handlers
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right')
        paddle.dx = paddle.speed;
    if (e.key === 'ArrowLeft' || e.key === 'Left')
        paddle.dx = -paddle.speed;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'Right')
        paddle.dx = 0;
});

let score = 0;
let brickRow = 9;
let brickColumns = 5;

//props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 4,
    size: 10,
    dx: 4,
    dy: -4
}
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    width: 90,
    height: 10,
    speed: 8,
    dx: 0
}

const brick = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

let allBricks = [];
for (let i = 0; i < brickRow; i++) {
    allBricks[i] = [];
    for (let j = 0; j < brickColumns; j++) {
        let x = i * (brick.w + brick.padding) + brick.offsetX;
        let y = j * (brick.h + brick.padding) + brick.offsetY;
        allBricks[i][j] = { x, y, ...brick };
    }
}

//drawing functions
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}
const drawPaddle = () => {
    ctx.beginPath();
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}
const drawScore = () => {
    ctx.fillStyle = '#0095dd';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}
const drawBricks = () => {
    allBricks.forEach(e => {
        e.forEach(f => {
            ctx.beginPath();
            ctx.rect(f.x, f.y, f.w, f.h);
            ctx.fillStyle = f.visible ? '#0095dd' : '#fff';
            ctx.fill();
            ctx.closePath();
        })
    })
}
const movePaddle = () => {
    paddle.x += paddle.dx;

    //collussion detection - preventing the paddle getting out from the canvas while moving
    if (paddle.x + paddle.width > canvas.width)
        paddle.x = canvas.width - paddle.width;
    if (paddle.x < 0)
        paddle.x = 0;
}
const moveBall = () => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //collussion detection - when the ball reaches ends of canvas movement directition is reversed
    if ( ball.y - ball.size < 0)
        ball.dy *= -1;
    if (ball.x + ball.size > canvas.width || ball.x < 0)
        ball.dx *= -1;
        
    //reloads the page if we failed to catch the ball with paddle
    if(ball.y + ball.size > canvas.height)
        location.reload();

    //collussion detection - when the ball hits the paddle its movement direction is reversed
    if (ball.y + ball.size > paddle.y &&
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.width)
            ball.dy = -ball.speed;

    // collussion detection - bricks with ball
    allBricks.forEach(brickRow => {
        brickRow.forEach(eachBrick => {
                if(eachBrick.visible && ball.x - ball.size > eachBrick.x &&
                    ball.x + ball.size < eachBrick.x + eachBrick.w &&
                    ball.y + ball.size > eachBrick.y &&
                    ball.y - ball.size < eachBrick.y + eachBrick.h
                ) {
                    ball.dy *= -1;
                    eachBrick.visible = false;
                    score ++;   
                }
        })
    })
}
const drawFuncs = () => {
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}
const update = () => {
    movePaddle();
    moveBall();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFuncs();
    requestAnimationFrame(update);
}
update();