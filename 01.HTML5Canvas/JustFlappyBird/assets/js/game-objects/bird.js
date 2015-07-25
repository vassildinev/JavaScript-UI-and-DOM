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