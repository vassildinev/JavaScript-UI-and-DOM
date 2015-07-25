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