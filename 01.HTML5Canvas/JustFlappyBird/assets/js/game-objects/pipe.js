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