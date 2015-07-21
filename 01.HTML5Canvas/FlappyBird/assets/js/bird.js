window.onload = function () {
    var canvas, ctx, frameX = 0, frameY = 0,
        generalFrameCount = 0,
        birdImage, birdW, birdH, startX = 0, startY = 300, drawY = 0, drawX = 0, t, hasToJump = false, isInBeginningStage = true,
        keysDown = {},

        CONSTANTS = {
            BIRD_SIZE: 2.2
        };

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function loadNinja() {
        birdImage = new Image();
        drawY = 0;
        drawX = 0;
        t = 0;

        birdImage.src = 'assets/sprites/bird-spritesheet.png';
        birdImage.style.border = '1px solid black';
        birdH = 507 / 3;
        birdW = 910 / 5;

        startX =0; //(canvas.width - birdW) / 2;
        startY =0 //(canvas.height - birdH) / 2;
    }

    function clearContext() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawBoundaries() {
        // outlines of the bird
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + birdW / CONSTANTS.BIRD_SIZE, startY);
        ctx.lineTo(startX + birdW / CONSTANTS.BIRD_SIZE, startY + birdH / CONSTANTS.BIRD_SIZE);
        ctx.lineTo(startX, startY + birdH / CONSTANTS.BIRD_SIZE);
        ctx.lineTo(startX, startY);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

        // area of action -> area for fatal hits by enemies or gathering of some kind of food e.g
        ctx.beginPath();
        ctx.save();
        ctx.translate(startX + birdW / 2 / CONSTANTS.BIRD_SIZE + 12 / CONSTANTS.BIRD_SIZE, startY + birdH / 2 / CONSTANTS.BIRD_SIZE + 12 / CONSTANTS.BIRD_SIZE);
        ctx.scale(1, 0.75);
        ctx.arc(0, 0, 70 / CONSTANTS.BIRD_SIZE, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    }

    function fly() {
        clearContext();
        ctx.drawImage(birdImage, (frameX - (frameY * 5)) * birdW, frameY * birdH, birdW, birdH, startX + drawX, startY - drawY, birdW / CONSTANTS.BIRD_SIZE, birdH / CONSTANTS.BIRD_SIZE);
        //drawBoundaries();
        frameX += 1;
        if (frameX === 5) {
            frameY = 1;
        }

        if (frameX === 10) {
            frameY = 2;
        }

        if (frameX === 13) {
            frameX = 0;
            frameY = 0;
        }
    }

    function jump() {
        var vx = 15,
            voy = 50;

        if (isInBeginningStage) {
            t = voy / 50;
        }

        if (hasToJump || isInBeginningStage) {
            if (isInBeginningStage) {
                isInBeginningStage = false;
                hasToJump = true;
            }
            startY -= (voy - 15 * t);
            startX += vx;
            t += .5;

            if (startY < 0) {
                startY = 0;
            }
            if (startY - (voy - 15 * t) > canvas.height - 0.5 * birdH) {
                startY = canvas.height - 0.5 * birdH;
                hasToJump = false;
                drawY = 0;
                t = 0;
            }
        }
    }

    function addKeyEventListeners() {
        addEventListener('keydown', function (e) {
            if (hasToJump) {
                t = 0;
            } else {
                hasToJump = true;
            }
        });
    }

    function runFrame() {
        setTimeout(function () {
            requestAnimationFrame(runFrame);
            jump();
            fly();
        }, 50);
    }

    (function () {
        loadCanvas();
        loadNinja();
        addKeyEventListeners();
        runFrame();
    }());
};