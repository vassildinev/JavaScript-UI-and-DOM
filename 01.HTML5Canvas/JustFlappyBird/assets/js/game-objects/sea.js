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