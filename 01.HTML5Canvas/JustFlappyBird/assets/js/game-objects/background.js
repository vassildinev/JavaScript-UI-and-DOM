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
            clouds[i].setX((256 * i + Math.random() * 200));
        }
    }

    for (var j in pipes) {
        if (pipes.hasOwnProperty(j)) {
            pipes[j].x += 300 * j;
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