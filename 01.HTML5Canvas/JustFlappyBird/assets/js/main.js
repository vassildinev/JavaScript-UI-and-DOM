(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CONSTANTS = (function () {
    return {
        CANVAS_WIDTH: 800,
        CANVAS_HEIGHT: 600,

        BIRD_HEIGHT: 169,
        BIRD_WIDTH: 182,
        BIRD_SIZE: 2.2,

        CLOUD_WIDTH: 256,
        CLOUD_HEIGHT: 156,

        SEA_WIDTH: 981,
        SEA_HEIGHT: 156,

        PIPES_WIDTH: 100,
        PIPES_HEIGHT: 600
    }
}());

module.exports = CONSTANTS;
},{}],2:[function(require,module,exports){
var background = (function () {
    var cloud = require('./cloud.js').init('assets/images/cloud.png'),
        sea = require('./sea.js').init('assets/images/sea-mod.png'),
        pipe = require('./pipe.js').init('assets/images/pipes.png'),
        clouds = Array
            .apply(null, {length: 3})
            .map(function () {
                return Object.create(cloud);
            }),

        pipes = Array
            .apply(null, {length: 3})
            .map(function () {
                return Object.create(pipe);
            }),

        background = {};

    for (var i in clouds) {
        if (clouds.hasOwnProperty(i)) {
            clouds[i].x += (256 * i + Math.random() * 200);
        }
    }

    for (var j in pipes) {
        if (pipes.hasOwnProperty(j)) {
            pipes[j].x += (Math.random() * 200 + 300) * j;
        }
    }

    Object.defineProperties(background, {
        clouds: {
            value: clouds
        },

        sea: {
            value: sea
        },

        pipes: {
            value: pipes
        },

        update: {
            value: function () {
                this.pipes.forEach(function (item) {
                    item.update();
                });

                this.clouds.forEach(function (item) {
                    item.update();
                });

                this.sea.update();
            }
        },

        render: {
            value: function (ctx) {
                this.pipes.forEach(function (item) {
                    item.render(ctx);
                });

                this.clouds.forEach(function (item) {
                    item.render(ctx);
                });

                this.sea.render(ctx);
            }
        }
    });

    return background;
}());

module.exports = background;
},{"./cloud.js":4,"./pipe.js":6,"./sea.js":7}],3:[function(require,module,exports){
var CONSTANTS = require('../common/constants.js');
var gameObject = require('./game-object.js');
var bird = (function () {
    var bird = Object.create(gameObject);
    Object.defineProperties(bird, {
        init: {
            value: function (imagePath) {
                gameObject.init.call(this, imagePath);
                this.height = CONSTANTS.BIRD_HEIGHT;
                this.width = CONSTANTS.BIRD_WIDTH;
                this.hasToJump = false;
                this.x = (CONSTANTS.CANVAS_WIDTH - this.width) / 2;
                this.y = (CONSTANTS.CANVAS_HEIGHT - this.height) / 2;
                this.speedX = 0;
                this.startSpeedY = 20;
                this.acceleration = 8;
                this.frameX = 0;
                this.frameY = 0;
                this.time = 0;
                this.isInBeginningStage = true;

                return this;
            }
        },

        update: {
            value: function () {
                if (this.isInBeginningStage) {
                    this.time = this.startSpeedY / this.acceleration; // 15 is the acceleration
                }

                if (this.hasToJump || this.isInBeginningStage) {
                    if (this.isInBeginningStage) {
                        this.isInBeginningStage = false;
                        this.hasToJump = true;
                    }

                    this.y -= (this.startSpeedY - this.acceleration * this.time);
                    this.x += this.speedX;
                    this.time += 0.5;

                    if (this.y < 0) {
                        this.y = 0;
                    }
                    if (this.y - (this.startSpeedY - this.acceleration * this.time) > CONSTANTS.CANVAS_HEIGHT - 0.5 * this.height) {
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
                    this.width, this.height, this.x, this.y, this.width / CONSTANTS.BIRD_SIZE, this.height / CONSTANTS.BIRD_SIZE);
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
},{"../common/constants.js":1,"./game-object.js":5}],4:[function(require,module,exports){
var CONSTANTS = require('../common/constants.js');
var gameObject = require('./game-object.js');
var cloud = (function () {
    var cloud = Object.create(gameObject);
    Object.defineProperties(cloud, {
        init: {
            value: function (imagePath) {
                gameObject.init.call(this, imagePath);
                this.height = CONSTANTS.CLOUD_HEIGHT;
                this.width = CONSTANTS.CLOUD_WIDTH;
                this.scale = ((Math.random() * 4 | 0) + 2);
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
},{"../common/constants.js":1,"./game-object.js":5}],5:[function(require,module,exports){
var gameObject = (function () {
    var gameObject = {};
    Object.defineProperties(gameObject, {
        init: {
            value: function (imagePath) {
                this.image = new Image();
                this.image.src = imagePath;
                this.x = 0;
                this.y = 0;
                this.speedX = 2;
            },

            update: {
                value: function () {

                }
            },

            render: {
                value: function (ctx) {

                }
            }
        }
    });

    return gameObject;
}());

module.exports = gameObject;
},{}],6:[function(require,module,exports){
var CONSTANTS = require('../common/constants.js');
var gameObject = require('./game-object.js');
var pipe = (function (){
    var pipe = Object.create(gameObject);
    Object.defineProperties(pipe, {
        init: {
            value: function (imagePath) {
                gameObject.init.call(this, imagePath);
                this.width = CONSTANTS.PIPES_WIDTH;
                this.height = CONSTANTS.PIPES_HEIGHT;
                this.x = CONSTANTS.CANVAS_WIDTH - this.width;
                this.y = - Math.random() * 230 - 30;
                this.speedX = 5;

                return this;
            }
        },

        update: {
            value: function () {
                this.x -= this.speedX;

                if(this.x < -this.width) {
                    this.x = CONSTANTS.CANVAS_WIDTH;
                    this.y = - Math.random() * 230 - 30;
                }
            }
        },

        render: {
            value: function (ctx) {
                ctx.drawImage(this.image, this.x, this.y, CONSTANTS.PIPES_WIDTH, CONSTANTS.PIPES_HEIGHT * 1.5);
            }
        }
    });

    return pipe;
}());

module.exports = pipe;
},{"../common/constants.js":1,"./game-object.js":5}],7:[function(require,module,exports){
var CONSTANTS = require('../common/constants.js');
var gameObject = require('./game-object.js');
var sea = (function () {
    var sea = Object.create(gameObject);
    Object.defineProperties(sea, {
        init: {
            value: function (imagePath) {
                gameObject.init.call(this, imagePath);
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
},{"../common/constants.js":1,"./game-object.js":5}],8:[function(require,module,exports){
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
        }, 40);
    }

    (function () {
        initialize();
        run();
    }());
};
},{"./common/constants.js":1,"./game-objects/background.js":2,"./game-objects/bird.js":3}]},{},[8]);
