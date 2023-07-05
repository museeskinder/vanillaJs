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

let score = 0;
let brickRow = 5;
let brickColumns = 9;

//props
const ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    size : 10,
    dx : 4,
    dy : 0
}
const paddle = {
    x : canvas.width / 2 - 40,
    y : canvas.height -20,
    width : 90,
    height: 10,
    dx : 0
}

const brick = {
    width : 70,
    height : 20,
    padding : 10,
    offsetX : 45,
    offsetY : 60,
    visible : true
}

let allBricks = [];
for(let i = 0; i < brickRow; i++) {
    allBricks[i] = [];
    for(let j = 0; j < brickColumns; j++) {
        let x  = j * (brick.width + brick.padding) + brick.offsetX;
        let y = i * (brick.height + brick.padding) + brick.offsetY;
        allBricks[i][j] = {x, y, ...brick};
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
            ctx.fillRect(f.x, f.y, f.width, f.height);
            ctx.fillStyle = f.visible ? '#0095dd' : '#fff';
            ctx.fill();
            ctx.closePath();
        })
    })
}
drawBall();
drawPaddle();
drawScore();
drawBricks();