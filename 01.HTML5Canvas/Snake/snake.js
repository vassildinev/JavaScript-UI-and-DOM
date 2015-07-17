window.onload = function () {
    Array.prototype.enqueue = function (item) {
        this.push(item);
        return this;
    };

    Array.prototype.peekFirst = function () {
        return this[0];
    };

    var canvas, ctx, isDead, score = 0, keysPressed = [], i, len, snake, coin,
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
            head: {
                x: 0.5 * canvas.width,
                y: 0.5 * canvas.height,
                r: CONSTANTS.SNAKE_RADIUS,
                speed: {
                    x: 1,
                    y: 0
                }
            },

            tail: []
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
        ctx.arc(snake.head.x, snake.head.y, CONSTANTS.SNAKE_RADIUS, 0, 2 * Math.PI);
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
        snake.head.x += snake.head.speed.x;
        snake.head.y += snake.head.speed.y;

        checkSnakePosition(snake);
    }

    function checkSnakePosition(snake) {
        if (snake.head.x + CONSTANTS.SNAKE_RADIUS >= canvas.width ||
            snake.head.x <= CONSTANTS.SNAKE_RADIUS ||
            snake.head.y + CONSTANTS.SNAKE_RADIUS >= canvas.height ||
            snake.head.y <= CONSTANTS.SNAKE_RADIUS) {
            isDead = true;
        }

        if ((snake.head.x - coin.x) * (snake.head.x - coin.x) + (snake.head.y - coin.y) * (snake.head.y - coin.y) < 4 * CONSTANTS.SNAKE_RADIUS * CONSTANTS.SNAKE_RADIUS) {
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
            logChangeOfDirection({
                x: snake.head.x,
                y: snake.head.y});
        });
    }

    function logChangeOfDirection(position) {
    }

    function changeSnakeDirection(keyCode) {
        if (keyCode === 37) {
            snake.head.speed.x = -1;
            snake.head.speed.y = 0;
        }

        if (keyCode === 38) {
            snake.head.speed.x = 0;
            snake.head.speed.y = -1;
        }

        if (keyCode === 39) {
            snake.head.speed.x = 1;
            snake.head.speed.y = 0;
        }

        if (keyCode === 40) {
            snake.head.speed.x = 0;
            snake.head.speed.y = 1;
        }
    }

    (function startGame() {
        loadCanvas(canvas, ctx);
        addEventListeners();
        loadGameObjects(canvas);
        runFrame();
    }());
};