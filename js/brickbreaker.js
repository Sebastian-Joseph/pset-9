	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var ballRadius = 10;
	var ballColor = "#0095DD"
	var speed = 10;
	var x = canvas.width/2;
	var y = canvas.height-30;

	var dx = 2;
	var dy = -2;
	var px = 7;

	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width-paddleWidth)/2;

	//Pressione tasti
	var rightPressed = false;
	var leftPressed = false;

	//Mattoni
	var brickRowCount = 3;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	var brickColor = "#0095DD";

	var bricks = [];
	for(c = 0; c < brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	}

	var score = 0;
	var scoreFont = "16px Arial";
	var scoreFillStyle = "#0095DD";

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    0, altri dati
		ctx.fillStyle = ballColor;
		ctx.fill();
		ctx.closePath();																	
	}

	//Disegno il Paddle
	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}

	//Disegno i Mattoni
	function drawBricks() {
		for(c = 0; c < brickColumnCount; c++) {
			for(r = 0; r < brickRowCount; r++) {
				if(bricks[c][r].status == 1) {												//Calcolo posizione in base alle dimensioni
					var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
					var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
					bricks[c][r].x = brickX;												//Assegno la posizione
					bricks[c][r].y = brickY;

					//Disegno
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = brickColor;
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}

	//Ascolto Tasti
	function keyDownHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = true;
		}
		else if(e.keyCode == 37) {
			leftPressed = true;
		}
	}

	function keyUpHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = false;
		}
		else if(e.keyCode == 37) {
			leftPressed = false;
		}
	}

	//Individuazione collisioni
	function collisionDetection() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				var b = bricks[c][r];
				if(b.status == 1) {																	//Controllo che il mattone esista
					if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {			//Controllo se la palla è "entrata" nell'area del mattone
						dy = -dy;																	//Rimbalzo
						b.status = 0;																//Cancello il mattone
						ballColor = getRandomColor();												//Cambio colore
						score++;																	//Aumento Punteggio

						//Messaggio di vittoria
						if(score == brickRowCount*brickColumnCount) {
							alert("YOU WIN, CONGRATULATIONS!");
							document.location.reload();
						}
					}
				}
			}
		}
	}

	//Stampa Punteggio
	function drawScore() {
		ctx.font = scoreFont;
		ctx.fillStyle = scoreFillStyle;
		ctx.fillText("Score: "+score, 8, 20);
	}

	//Disegno l'intera pagina
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);						//Pulisce dai rettangoli

		//Disegno le forme
		drawBricks();
		drawBall();
		drawPaddle();
		//Attivo individuazione collisioni
		collisionDetection();
		//Stampo punteggio
		drawScore();

		//Modifico variabili globali posizione
		x += dx;
		y += dy;

		//Rimbalzo
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {									//Rim
			dx = -dx;
			ballColor = getRandomColor();																//Cambio colore
		}
		if(y + dy < ballRadius) {
			dy = -dy;
		} else if(y + dy > canvas.height-ballRadius) {
			if(x > paddleX && x < paddleX + paddleWidth) {												//Rimbalzo sul muro superiore o il Paddle
				dy = -dy;
			}
			else {																						//Game Over
				alert("GAME OVER");
				document.location.reload();
			}
		}

		//Rimbalzo Paddle
		if(rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += px;
		}
		else if(leftPressed && paddleX > 0) {
			paddleX -= px;
		}

		//Game Over
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}

		if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
			dy = -dy;
		}
	}

	//Loop di draw()
	setInterval(draw, speed);
