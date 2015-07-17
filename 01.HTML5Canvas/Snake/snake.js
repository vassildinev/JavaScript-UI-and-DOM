window.onload = function () {
    var canvas, ctx, isDead, score = 0, i, len, snake, coin,
        CONSTANTS = {
            SNAKE_RADIUS: 7,
            COIN_RADIUS: 7
        };

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.height = 400;
        canvas.width = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function getSnakeObject(canvas) {
        return {
            x: 0.5 * canvas.width,
            y: 0.5 * canvas.height,
            r: CONSTANTS.SNAKE_RADIUS,
            speed: {
                x: 1,
                y: 0
            },

            size: 1
        };
    }

    function getCoinObject(canvas) {
        return {
            x: CONSTANTS.COIN_RADIUS + Math.random() * (canvas.width - 2 * CONSTANTS.COIN_RADIUS),
            y: CONSTANTS.COIN_RADIUS + Math.random() * (canvas.height - 2 * CONSTANTS.COIN_RADIUS)
        }
    }

    function loadGameObjects(canvas) {
        snake = getSnakeObject(canvas);
        coin = getCoinObject(canvas);
    }

    function drawSnake(ctx, snake) {
        ctx.beginPath();
        ctx.arc(snake.x, snake.y, CONSTANTS.SNAKE_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fill();
        ctx.closePath();
    }

    function drawCoin(ctx, coin) {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, CONSTANTS.COIN_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(220, 230, 0)';
        ctx.fill();
        ctx.closePath();
    }

    function render(ctx) {
        clearCanvas(canvas, ctx);
        drawCoin(ctx, coin);
        drawSnake(ctx, snake);
    }

    function update() {
        snake.x += snake.speed.x;
        snake.y += snake.speed.y;

        checkSnakePosition(snake);
    }

    function checkSnakePosition(snake) {
        if (snake.x + CONSTANTS.SNAKE_RADIUS >= canvas.width ||
            snake.x <= CONSTANTS.SNAKE_RADIUS ||
            snake.y + CONSTANTS.SNAKE_RADIUS >= canvas.height ||
            snake.y <= CONSTANTS.SNAKE_RADIUS) {
            isDead = true;
        }

        if ((snake.x - coin.x) * (snake.x - coin.x) + (snake.y - coin.y) * (snake.y - coin.y) < 4 * CONSTANTS.SNAKE_RADIUS * CONSTANTS.SNAKE_RADIUS) {
            score += 10;
            coin = getCoinObject(canvas);
        }

    }

    function runFrame() {
        update();
        render(ctx);
        if (!isDead) setTimeout(runFrame, 10);
    }

    function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function addEventListeners() {
        addEventListener('keydown', function (e) {
            changeSnakeDirection(e.keyCode);
        });
    }

    function changeSnakeDirection(keyCode) {
        if (keyCode === 37) {
            snake.speed.x = -1;
            snake.speed.y = 0;
        }

        if (keyCode === 38) {
            snake.speed.x = 0;
            snake.speed.y = -1;
        }

        if (keyCode === 39) {
            snake.speed.x = 1;
            snake.speed.y = 0;
        }

        if (keyCode === 40) {
            snake.speed.x = 0;
            snake.speed.y = 1;
        }
    }

    (function startGame() {
        loadCanvas(canvas, ctx);
        addEventListeners();
        loadGameObjects(canvas);
        runFrame();
    }());
};