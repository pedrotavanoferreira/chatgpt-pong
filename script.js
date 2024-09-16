// Configurações básicas
const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

// Ajuste de tamanho do canvas
canvas.width = 800;
canvas.height = 600;

// Definição das cores que combinam com a Raiden Shogun
const paddleColor = "#A09EC2";
const ballColor = "#EE82EE";
const netColor = "#D3D3D3";

// Paddle (raquetes)
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 8;

// Paddle esquerdo (jogador 1)
let paddle1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 0
};

// Paddle direito (computador)
let paddle2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    dy: 4
};

// Bola
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4
};

// Função para desenhar o paddle
function drawPaddle(x, y) {
    context.fillStyle = paddleColor;
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ballColor;
    context.fill();
    context.closePath();
}

// Função para desenhar a rede
function drawNet() {
    context.fillStyle = netColor;
    context.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height);
}

// Função para desenhar o quadro de jogo
function draw() {
    // Limpa o canvas antes de desenhar
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar rede
    drawNet();

    // Desenhar os paddles
    drawPaddle(paddle1.x, paddle1.y);
    drawPaddle(paddle2.x, paddle2.y);

    // Desenhar a bola
    drawBall();
}

// Atualiza a posição dos elementos no jogo
function update() {
    // Movimenta o paddle do jogador 1
    paddle1.y += paddle1.dy;

    // Limita o movimento do paddle dentro dos limites do canvas
    if (paddle1.y < 0) paddle1.y = 0;
    if (paddle1.y + paddleHeight > canvas.height) paddle1.y = canvas.height - paddleHeight;

    // Movimenta o paddle do computador
    paddle2.y += paddle2.dy;
    if (paddle2.y < 0 || paddle2.y + paddleHeight > canvas.height) paddle2.dy *= -1;

    // Movimenta a bola
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Verifica colisões com as paredes superior e inferior
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Verifica colisão com o paddle do jogador 1
    if (ball.x - ball.radius < paddle1.x + paddleWidth &&
        ball.y > paddle1.y && ball.y < paddle1.y + paddleHeight) {
        ball.dx *= -1;
    }

    // Verifica colisão com o paddle do jogador 2
    if (ball.x + ball.radius > paddle2.x &&
        ball.y > paddle2.y && ball.y < paddle2.y + paddleHeight) {
        ball.dx *= -1;
    }

    // Verifica se a bola saiu do campo (ponto)
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        // Reinicia a bola no centro
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1; // Inverte a direção
    }
}

// Controla o movimento do jogador com o teclado
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        paddle1.dy = -paddleSpeed;
    } else if (event.key === "ArrowDown") {
        paddle1.dy = paddleSpeed;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        paddle1.dy = 0;
    }
});

// Função principal do jogo (loop)
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();
