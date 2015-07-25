window.onload = function () {
    var CONSTANTS = require('./common/constants.js');
    var bird = require('./game-objects/bird.js').init('assets/images/sprites/experiment.png');
    var background = require('./game-objects/background.js');
    var canvas, ctx;

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = CONSTANTS.CANVAS_WIDTH;
        canvas.height = CONSTANTS.CANVAS_HEIGHT;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function clearContext() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function addEventListeners() {
        addEventListener('keydown', function (e) {
            if (e.keyCode === 32) {
                if (bird.hasToJump) {
                    bird.time = 0;
                } else {
                    bird.hasToJump = true;
                }
            }
        });

        window.addEventListener('touchstart', function () {
                if (bird.hasToJump) {
                    bird.time = 0;
                } else {
                    bird.hasToJump = true;
                }
        });
    }

    function initialize() {
        loadCanvas();
        addEventListeners();
    }

    function run() {
        setTimeout(function () {
            requestAnimationFrame(run);

            // update
            background.update();
            bird.update();

            // render
            clearContext();
            background.render(ctx);
            bird.render(ctx);
        }, 50);
    }

    (function () {
        initialize();
        run();
    }());
};