const breakoutCanvas = document.getElementById("breakoutCanvas");
const breakoutCtx = breakoutCanvas.getContext("2d");

breakoutCanvas.width = 480;
breakoutCanvas.height = 320;

const paddleWidth = 75;
const paddleHeight = 10;
const ballRadius = 10;
let paddleX = (breakoutCanvas.width - paddleWidth) / 2;
let ballX = breakoutCanvas.width / 2;
let ballY = breakoutCanvas.height - 30;
let ballDX = 2;
let ballDY = -2;

const blocks = [];
const blockRowCount = 5;
const blockColumnCount = 8;
const blockWidth = 60;
const blockHeight = 20;
const blockPadding = 10;
const blockOffsetTop = 30;
const blockOffsetLeft = 30;

for (let c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for (let r = 0; r < blockRowCount; r++) {
        blocks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBall() {
    breakoutCtx.beginPath();
    breakoutCtx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    breakoutCtx.fillStyle = "#0095DD";
    breakoutCtx.fill();
    breakoutCtx.closePath();
}

function drawPaddle() {
    breakoutCtx.beginPath();
    breakoutCtx.rect(paddleX, breakoutCanvas.height - paddleHeight, paddleWidth, paddleHeight);
    breakoutCtx.fillStyle = "#0095DD";
    breakoutCtx.fill();
    breakoutCtx.closePath();
}

function drawBlocks() {
    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            if (blocks[c][r].status == 1) {
                let blockX = c * (blockWidth + blockPadding) + blockOffsetLeft;
                let blockY = r * (blockHeight + blockPadding) + blockOffsetTop;
                blocks[c][r].x = blockX;
                blocks[c][r].y = blockY;
                breakoutCtx.beginPath();
                breakoutCtx.rect(blockX, blockY, blockWidth, blockHeight);
                breakoutCtx.fillStyle = "#0095DD";
                breakoutCtx.fill();
                breakoutCtx.closePath();
            }
        }
    }
}

function moveBall() {
    ballX += ballDX;
    ballY += ballDY;

    if (ballX + ballDX > breakoutCanvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > breakoutCanvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
        } else {
            // ゲームオーバー
            ballX = breakoutCanvas.width / 2;
            ballY = breakoutCanvas.height - 30;
        }
    }

    for (let c = 0; c < blockColumnCount; c++) {
        for (let r = 0; r < blockRowCount; r++) {
            let b = blocks[c][r];
            if (b.status == 1) {
                if (ballX > b.x && ballX < b.x + blockWidth && ballY > b.y && ballY < b.y + blockHeight) {
                    ballDY = -ballDY;
                    b.status = 0;
                }
            }
        }
    }
}

function draw() {
    breakoutCtx.clearRect(0, 0, breakoutCanvas.width, breakoutCanvas.height);
    drawBlocks();
    drawBall();
    drawPaddle();
    moveBall();
}

document.addEventListener("mousemove", function (event) {
    let mouseX = event.clientX - breakoutCanvas.offsetLeft;
    if (mouseX > 0 && mouseX < breakoutCanvas.width - paddleWidth) {
        paddleX = mouseX - paddleWidth / 2;
    }
});

setInterval(draw, 10);
