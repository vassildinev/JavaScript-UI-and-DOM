(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CONSTANTS = (function () {
    return {
        CANVAS_WIDTH: 800,
        CANVAS_HEIGHT: 600,

        BIRD_HEIGHT: 169,
        BIRD_WIDTH: 182,
        BIRD_SIZE: 2.2,

        CLOUD_WIDTH: 256,
        CLOUD_HEIGHT: 256,

        SEA_WIDTH: 981,
        SEA_HEIGHT: 156
    }
}());

module.exports = CONSTANTS;
},{}],2:[function(require,module,exports){
var CONSTANTS = require('../common/constants.js');
var bird = (function () {
    var bird = {};
    Object.defineProperties(bird, {
        init: {
            value: function (imagePath) {
                this.image = new Image();
                this.image.src = imagePath;
                this.height = CONSTANTS.BIRD_HEIGHT;
                this.width = CONSTANTS.BIRD_WIDTH;
                this.hasToJump = false;
                this.x = (CONSTANTS.CANVAS_WIDTH - this.width) / 2;
                this.y = (CONSTANTS.CANVAS_HEIGHT - this.height) / 2;
                this.frameX = 0;
                this.frameY = 0;
                this.time = 0;
                this.isInBeginningStage = true;

                return this;
            }
        },

        update: {
            value: function () {
                var speedX = 0,
                    startSpeedY = 50;

                if (this.isInBeginningStage) {
                    this.time = startSpeedY / 15; // 15 is the acceleration
                }

                if (this.hasToJump || this.isInBeginningStage) {
                    if (this.isInBeginningStage) {
                        this.isInBeginningStage = false;
                        this.hasToJump = true;
                    }

                    this.y -= (startSpeedY - 15 * this.time);
                    this.x += speedX;
                    this.time += 0.5;

                    if (this.y < 0) {
                        this.y = 0;
                    }
                    if (this.y - (startSpeedY - 15 * this.time) > CONSTANTS.CANVAS_HEIGHT - 0.5 * this.height) {
                        this.y = CONSTANTS.CANVAS_HEIGHT - 0.5 * this.height;
                        this.hasToJump = false;
                        this.time = 0;
                    }
                }

            }
        },

        render: {
            value: function (ctx) {
                ctx.drawImage(this.image, (this.frameX - (this.frameY * 5)) * this.width, this.frameY * this.height,
                    this.width, this.height, bird.x, bird.y, this.width / CONSTANTS.BIRD_SIZE, this.height / CONSTANTS.BIRD_SIZE);
                this.frameX += 1;

                if (this.frameX === 5) {
                    this.frameY = 1;
                }

                if (this.frameX === 10) {
                    this.frameY = 2;
                }

                if (this.frameX === 13) {
                    this.frameX = 0;
                    this.frameY = 0;
                }
            }
        }
    });

    return bird;
}());

module.exports = bird;
},{"../common/constants.js":1}],3:[function(require,module,exports){
var CONSTANTS = require('../common/constants.js');
var cloud = (function () {
    var cloud = {};
    Object.defineProperties(cloud, {
        init: {
            value: function (imagePath) {
                this.image = new Image();
                this.image.src = imagePath;
                this.height = CONSTANTS.CLOUD_HEIGHT;
                this.width = CONSTANTS.CLOUD_WIDTH;
                this.scale = ((Math.random() * 5 | 0) + 1);
                this.x = CONSTANTS.CANVAS_WIDTH - this.width;
                this.y = 0;
                this.speedX = 1;

                return this;
            }
        },

        update: {
            value: function () {
                this.x -= this.speedX;

                if (this.x < -this.width) {
                    this.x = CONSTANTS.CANVAS_WIDTH;
                    this.scale = ((Math.random() * 5 | 0) + 1);
                }
            }
        },

        render: {
            value: function (ctx) {
                ctx.drawImage(this.image, this.x, this.y, this.width / this.scale, this.height / this.scale);
            }
        }
    });

    return cloud;
}());

module.exports = cloud;
},{"../common/constants.js":1}],4:[function(require,module,exports){
var CONSTANTS = require('../common/constants.js');
var sea = (function () {
    var sea = {};
    Object.defineProperties(sea, {
        init: {
            value: function (imagePath) {
                this.image = new Image();
                this.image.src = imagePath;
                this.height = CONSTANTS.SEA_HEIGHT;
                this.width = CONSTANTS.SEA_WIDTH;
                this.scale = 0.9;
                this.x = 0;
                this.y = CONSTANTS.CANVAS_HEIGHT - this.height * 0.5 * this.scale;
                this.speedX = 2;

                return this;
            }
        },

        update: {
            value: function () {
                this.x -= this.speedX;

                if (this.x < -this.scale * this.width) {
                    this.x = -50;
                }
            }
        },

        render: {
            value: function (ctx) {
                ctx.drawImage(this.image, this.x, this.y, this.scale * this.width, this.scale * this.height);
                ctx.drawImage(this.image, this.x + this.scale * this.width - 50, this.y, this.scale * this.width, this.scale * this.height);
            }
        }
    });

    return sea;
}());

module.exports = sea;
},{"../common/constants.js":1}],5:[function(require,module,exports){
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
},{"./common/constants.js":1,"./game-objects/bird.js":2,"./game-objects/cloud.js":3,"./game-objects/sea.js":4}]},{},[5]);
