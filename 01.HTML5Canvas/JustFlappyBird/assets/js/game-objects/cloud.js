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
                this.speedX = 3;

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