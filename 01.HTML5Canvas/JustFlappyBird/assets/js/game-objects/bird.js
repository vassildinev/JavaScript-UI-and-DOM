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