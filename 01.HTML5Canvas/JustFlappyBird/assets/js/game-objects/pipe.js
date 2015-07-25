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
                this.speedX = 3;

                return this;
            }
        },

        update: {
            value: function () {
                this.x -= this.speedX;
            }
        },

        render: {
            value: function (ctx) {
                ctx.drawImage(this.image, this.x, this.y, CONSTANTS.PIPES_WIDTH, CONSTANTS.PIPES_HEIGHT);
            }
        }
    });

    return pipe;
}());

module.exports = pipe;