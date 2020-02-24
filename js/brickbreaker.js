var canvas = document.getElementById("#myCanvas");
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
//
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadius = 10;
var dx = 2;
var dy = -2;
var color = "#ff3e3e";
//
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
//
var rightPressed = false;
var leftPressed = false;
//
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//
var score = 0;
var lives = 3;
var gameover = false;
//
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}
//
function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
//
function randomColor() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  color = "rgb(" + r + ", " + g + ", " + b + ")";
}
//
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
  //
  if ((x + ballRadius) > canvas.width || (x - ballRadius) < 0) {
    randomColor();
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    } else {
      lives--;
      if (!lives) {
        ctx.font = "50px monospace";
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", 105, 160);
        gameover = true;
        setTimeout(function() {
          document.location.reload();
        }, 1000);
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;
        dx = 2;
        dy = -2;
      }
    }
  }
}
//
function drawPaddle() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#489759";
  ctx.fill();
  ctx.closePath();
}
//
function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#ff3e3e";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
//
function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            ctx.font = "50px monospace";
            ctx.fillStyle = "black";
            ctx.fillText("You win!", 120, 160);
            gameover = true;
            setTimeout(function() {
              document.location.reload();
            }, 1000);
          }
        }
      }
    }
  }
}
//
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ff3e3e";
  ctx.fillText("Score: " + score, 8, 20);
}
//
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#30B1DB";
  ctx.fillText("Lives: " + lives, 100, 20);
}
//
function draw() {
  if (gameover) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionDetection();
  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();
  drawLives();
  //
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  //
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}
draw();
