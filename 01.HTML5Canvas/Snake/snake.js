window.onload = function () {
    var gameCanvas,
        gameCtx,
        scoreboardCanvas,
        scoreboardCtx,
        isDead,
        score = 0,
        logger = [],
        i,
        j = localStorage.length,
        len,
        localStorageCopy = [],
        snake,
        coin,
        fps = 100,
        currentFrame = 0,
        tailObjectsCount = 1,
        CONSTANTS = {
            SNAKE_RADIUS: 7,
            COIN_RADIUS: 7,
            FRAME_SETBACK: 13
        };

    function loadGameCanvas() {
        gameCanvas = document.createElement('canvas');
        gameCanvas.height = 300;
        gameCanvas.width = 400;
        gameCanvas.style.border = '1px solid black';
        document.body.appendChild(gameCanvas);

        gameCtx = gameCanvas.getContext('2d');
    }

    function loadScoreboardCanvas() {
        scoreboardCanvas = document.createElement('canvas');
        scoreboardCanvas.height = 300;
        scoreboardCanvas.width = 150;
        scoreboardCanvas.style.border = '1px solid black';
        document.body.appendChild(scoreboardCanvas);

        scoreboardCtx = scoreboardCanvas.getContext('2d');
    }

    function getSnakeObject() {
        return {
            head: {
                x: 0.5 * gameCanvas.width,
                y: 0.5 * gameCanvas.height,
                r: CONSTANTS.SNAKE_RADIUS,
                speed: {
                    x: 1,
                    y: 0
                }
            },

            tail: []
        };
    }

    function getCoinObject() {
        return {
            x: CONSTANTS.COIN_RADIUS + Math.random() * (gameCanvas.width - 2 * CONSTANTS.COIN_RADIUS),
            y: CONSTANTS.COIN_RADIUS + Math.random() * (gameCanvas.height - 2 * CONSTANTS.COIN_RADIUS)
        }
    }

    function loadGameObjects() {
        snake = getSnakeObject();
        coin = getCoinObject();
    }

    function drawSnake() {
        // head
        gameCtx.beginPath();
        gameCtx.arc(snake.head.x, snake.head.y, CONSTANTS.SNAKE_RADIUS, 0, 2 * Math.PI);
        gameCtx.fillStyle = 'rgb(255, 0, 0)';
        gameCtx.fill();
        gameCtx.closePath();

        // tail
        for (i = 0, len = snake.tail.length; i < len; i += 1) {
            var currentTailObject = snake.tail[i];
            gameCtx.beginPath();
            gameCtx.arc(currentTailObject.x, currentTailObject.y, CONSTANTS.SNAKE_RADIUS, 0, 2 * Math.PI);
            gameCtx.fillStyle = 'rgb(0, 255, 0)';
            gameCtx.fill();
            gameCtx.closePath();
        }
    }

    function drawCoin() {
        gameCtx.beginPath();
        gameCtx.arc(coin.x, coin.y, CONSTANTS.COIN_RADIUS, 0, 2 * Math.PI);
        gameCtx.fillStyle = 'rgb(100, 200, 255)';
        gameCtx.fill();
        gameCtx.closePath();
    }

    function drawScore() {
        scoreboardCtx.beginPath();
        scoreboardCtx.fillStyle = 'black';
        scoreboardCtx.font = '16px Arial';
        scoreboardCtx.fontWeight = 100;
        scoreboardCtx.fillText('Score: ' + score, 2, 16);
        scoreboardCtx.fillText('Speed: ' + (10 - (1000 / fps - 1) | 0), 2, 32);
        scoreboardCtx.closePath();
    }

    function drawHighScore() {
        scoreboardCtx.beginPath();
        scoreboardCtx.fillStyle = 'black';
        scoreboardCtx.font = '16px Arial';
        scoreboardCtx.fontWeight = 100;
        scoreboardCtx.fillText('---HIGH SCORES---', 2, 64);

        localStorageCopy = [].slice.apply(localStorage)
            .filter(function (item) {
                return item !== undefined;
            });

        for (i = 0, len = localStorageCopy.length; i < len; i += 1) {
            localStorageCopy[i] = localStorageCopy[i].split('-');
        }

        localStorageCopy = localStorageCopy.sort(function (x, y) {
            return y[1] - x[1] ;
        });



        for (i = 0, len = localStorageCopy.length; i < len && i < 5; i += 1) {
            scoreboardCtx.fillText(i + 1 + '. ' + localStorageCopy[i][0] + ' - ' + localStorageCopy[i][1], 2, (i + 1) * 16 + 64);
        }

        scoreboardCtx.closePath();
    }

    function drawInformation() {
        scoreboardCtx.beginPath();
        scoreboardCtx.fillStyle = 'black';
        scoreboardCtx.font = '16px Tahoma';
        scoreboardCtx.fillText('Press Space for', 2, 240);
        scoreboardCtx.fillText('new game', 2, 256);
        scoreboardCtx.fillText('or F5 for new game', 2, 272);
        scoreboardCtx.fillText('and scoreboard', 2, 288);
    }

    function clearGameCtx() {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    function clearScoreboardCtx() {
        scoreboardCtx.clearRect(0, 0, scoreboardCanvas.width, scoreboardCanvas.height);
    }

    function render() {
        clearGameCtx();
        clearScoreboardCtx();
        drawCoin();
        drawSnake();
        drawScore();
        drawHighScore();
        drawInformation();
    }

    function checkSnakePosition() {
        if (snake.head.x + CONSTANTS.SNAKE_RADIUS >= gameCanvas.width ||
            snake.head.x <= CONSTANTS.SNAKE_RADIUS ||
            snake.head.y + CONSTANTS.SNAKE_RADIUS >= gameCanvas.height ||
            snake.head.y <= CONSTANTS.SNAKE_RADIUS) {
            isDead = true;
        }

        for (i = 0, len = snake.tail.length; i < len; i += 1) {
            var currentTailObject = snake.tail[i];
            if ((snake.head.x - currentTailObject.x) * (snake.head.x - currentTailObject.x) +
                (snake.head.y - currentTailObject.y) * (snake.head.y - currentTailObject.y) <
                CONSTANTS.SNAKE_RADIUS * CONSTANTS.SNAKE_RADIUS) {
                isDead = true;
            }
        }

        if (isDead) {
            var person = prompt('Please enter your name:');
            while (person === '' || person === null) {
                person = prompt('Please enter your name:');
            }

            localStorage.setItem(j, person + ' - ' + score);
            j = localStorage.length;
        }

        if ((snake.head.x - coin.x) * (snake.head.x - coin.x) +
            (snake.head.y - coin.y) * (snake.head.y - coin.y) <
            4 * CONSTANTS.SNAKE_RADIUS * CONSTANTS.SNAKE_RADIUS) {
            score += 1;
            fps += score * 2;
            snake.tail.push({
                x: undefined,
                y: undefined,
                frame: currentFrame - CONSTANTS.FRAME_SETBACK * tailObjectsCount
            });

            tailObjectsCount++;

            coin = getCoinObject();
        }

    }

    function logHeadPosition(position) {
        logger.push(position);
    }

    function update() {
        // log last snake head position
        logHeadPosition({
            x: snake.head.x,
            y: snake.head.y
        });

        // head
        snake.head.x += snake.head.speed.x;
        snake.head.y += snake.head.speed.y;

        // tail
        for (i = 0, len = snake.tail.length; i < len; i += 1) {
            snake.tail[i].x = logger[snake.tail[i].frame].x;
            snake.tail[i].y = logger[snake.tail[i].frame].y;

            snake.tail[i].frame += 1;
        }

        checkSnakePosition();
    }

    function run() {
        update();
        render();

        if (!isDead) {
            setTimeout(run, 1000 / fps);
        }

        currentFrame += 1;
    }

    function reset() {
        isDead = false;
        fps = 100;
        score = 0;
        currentFrame = 0;
        logger = [];
        tailObjectsCount = 1;
        loadGameObjects();
    }

    function addGameEventListener() {
        addEventListener('keydown', function (e) {
            var keyCode = e.keyCode;

            if (keyCode === 116) {
                localStorage.clear();
            }

            if (keyCode === 32) {
                reset();
                run();
            }
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
        });
    }

    function initialize() {
        loadGameCanvas();
        loadScoreboardCanvas();
        loadGameObjects();
        addGameEventListener();
    }

    (function start() {
        initialize();
        run();
    }());
};