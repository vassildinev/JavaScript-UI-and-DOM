window.onload = function () {
    var canvas, ctx, frameX = 0, frameY = 0,
        generalFrameCount = 0,
        blinkImage = new Image(), blinkW = 394, blinkH = 511,
        keysDown = {};

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function loadBlink() {
        blinkImage.src = 'assets/sprites/animations/blink/blink-spritesheet.png';
    }

    function blink() {
        ctx.drawImage(blinkImage, (frameX - (frameY * 4)) * blinkW, frameY * blinkH, blinkW, blinkH, (canvas.width - blinkW) / 2, (canvas.height - blinkH) / 2, blinkW / 5, blinkH / 5);
        frameX += 1;
        if (frameX === 4) {
            frameY = 1;
        }

        if (frameX === 7 && frameY === 1) {
            frameX = 0;
            frameY = 0;
        }

        generalFrameCount += 1;
        if(generalFrameCount < 81) {
            setTimeout(blink, 100);
        } else {
            ctx.clearRect(0,0,1000,1000);
        }
    }

    function addKeyEventListeners() {
        addEventListener('keydown', function (e) {
            keysDown[0] = 1;
            blink();
        });

        addEventListener('keyup', function (e) {

        });
    }

    function runFrame() {
        blink();
    }

    (function () {
        loadCanvas();
        loadBlink();
        addKeyEventListeners();
    }());
};