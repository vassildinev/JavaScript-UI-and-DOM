window.onload = function () {
    var CONSTANTS = require('./common/constants.js');
    var bird = require('./game-objects/bird.js').init('assets/images/sprites/experiment.png');
    var cloud = require('./game-objects/cloud.js').init('assets/images/cloud.png');
    var sea = require('./game-objects/sea.js').init('assets/images/sea-mod.png');

    var clouds = Array.apply(null, {length: 3})
        .map(function () {
            return Object.create(cloud);
        });

    console.log(clouds);

    for (var i in clouds) {
        if (clouds.hasOwnProperty(i)) {
            clouds[i].x += (Math.random() * 100 + 256) + 256 * i;
        }
    }

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

    function addKeyEventListeners() {
        addEventListener('keydown', function (e) {
            if (e.keyCode === 32) {
                if (bird.hasToJump) {
                    bird.time = 0;
                } else {
                    bird.hasToJump = true;
                }
            }
        });
    }

    function runFrame() {
        setTimeout(function () {
            requestAnimationFrame(runFrame);
            clearContext();

            bird.update();
            clouds.forEach(function (item) {
                item.update();
            });

            sea.update();

            clouds.forEach(function (item) {
                item.render(ctx);
            });

            sea.render(ctx);
            bird.render(ctx);
        }, 50);
    }

    (function () {
        loadCanvas();
        addKeyEventListeners();
        runFrame();
    }());
};