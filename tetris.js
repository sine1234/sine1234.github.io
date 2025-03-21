// テトリスの簡単なゲームロジック
const tetrisCanvas = document.getElementById("tetrisCanvas");
const tetrisCtx = tetrisCanvas.getContext("2d");

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

tetrisCanvas.width = COLS * BLOCK_SIZE;
tetrisCanvas.height = ROWS * BLOCK_SIZE;

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

let currentBlock = {
    shape: [[1, 1, 1], [0, 1, 0]],
    color: 0,
    x: 4,
    y: 0
};

function drawTetris() {
    tetrisCtx.clearRect(0, 0, tetrisCanvas.width, tetrisCanvas.height);

    // 現在のブロックを描画
    for (let row = 0; row < currentBlock.shape.length; row++) {
        for (let col = 0; col < currentBlock.shape[row].length; col++) {
            if (currentBlock.shape[row][col] !== 0) {
                tetrisCtx.fillStyle = colors[currentBlock.color];
                tetrisCtx.fillRect((currentBlock.x + col) * BLOCK_SIZE, (currentBlock.y + row) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
}

// 簡単なブロックを下に移動させる
function moveBlock() {
    currentBlock.y++;
    if (currentBlock.y + currentBlock.shape.length > ROWS) {
        currentBlock.y = 0;
        currentBlock.x = 4; // 新しい位置
    }
    drawTetris();
}

setInterval(moveBlock, 500);
