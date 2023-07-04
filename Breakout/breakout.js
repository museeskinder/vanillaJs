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

//props
const ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    size : 10,
    dx : 4,
    dy : -4
}
const paddle = {
    x : canvas.width / 2 - 40,
    y : canvas.height -20,
    width : 90,
    height: 10,
    dx : 0
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
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}
drawBall();
drawPaddle();
drawScore();