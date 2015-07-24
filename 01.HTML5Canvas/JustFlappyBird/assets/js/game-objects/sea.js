var CONSTANTS = require('../common/constants.js');
var sea = (function () {
    var sea = {};
    Object.defineProperties(sea, {
        init: {
            value: function (imagePath) {
                this.image = new Image();
                this.image.src = imagePath;
                this.height = 256;
                this.width = 256;
                this.scale = ((Math.random() * 5 | 0) + 1);
                this.x = CONSTANTS.CANVAS_WIDTH - this.width;
                this.y = 0;
                this.speedX = 3;

                return this;
            }
        }
    });

    return sea;
}());

module.exports = sea;