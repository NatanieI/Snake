var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = Math.floor(Math.random() * cols) * blockSize;
var snakeY = Math.floor(Math.random() * rows) * blockSize;

var velocityX = 0;
var velocityY = 0;

var text = document.getElementById("title");
var restartT = document.getElementById("restartText");

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keydown", changeDirection);
    setInterval(update, 1000/10);
}

function update () {
    context.fillStyle = "#1a1a1a";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i>0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody [0] = [snakeX, snakeY];
    }
 
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (gameOver == true) {
        text.innerText = "GAME OVER";
        text.style.color = "red";
        restartT.style.color = "lime";
    } else if (gameOver == false) {
        text.innerText = "Snake";
        text.style.color = "white";
        restartT.style.color = "white";
    }

    if (snakeX < 0 || snakeX > cols*blockSize-blockSize || snakeY < 0 || snakeY > rows*blockSize-blockSize) {
        gameOver = true;
        velocityX = 0;
        velocityY = 0;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            velocityX = 0;
            velocityY = 0;
        }
    }
}

function placeFood () {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection (e) {
    if (e.code == "ArrowUp" && velocityY != 1 && gameOver == false) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown"  && velocityY != -1 && gameOver == false) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft"  && velocityX != 1 && gameOver == false) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight"   && velocityX != -1 && gameOver == false) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.code == "KeyW" && velocityY != 1 && gameOver == false) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "KeyS" && velocityY != -1 && gameOver == false) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "KeyA" && velocityX != 1 && gameOver == false) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "KeyD" && velocityX != -1 && gameOver == false) {
        velocityX = 1;
        velocityY = 0;
    }

    if (e.code == "KeyR") {
        restart();
    }
}

function restart () {
    gameOver = false;
    placeFood();
    snakeX = Math.floor(Math.random() * cols) * blockSize;
    snakeY = Math.floor(Math.random() * rows) * blockSize;
    snakeBody = [];
}