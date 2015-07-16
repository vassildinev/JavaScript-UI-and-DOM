window.onload = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        center = {
            x: 400,
            y: 300,
            radius: 20
        },

        scale = {
            x: 0.4,
            y: 1
        },

        angle = 0;

    canvas.width = 800;
    canvas.height = 600;

    document.body.appendChild(canvas);

    var points = [
            {
                get x() {
                    return center.x + Math.cos(this.angle / 180 * Math.PI) * center.radius * 4
                },

                get y() {
                    return center.y + Math.sin(this.angle / 180 * Math.PI) * center.radius * 4
                },

                angle: getRandomAngle()
            },

            {
                get x() {
                    return center.x + Math.cos(this.angle / 180 * Math.PI) * center.radius * scale.x * 5
                },

                get y() {
                    return center.y + Math.sin(this.angle / 180 * Math.PI) * center.radius * scale.y * 5
                },

                angle: getRandomAngle()
            },

            {
                get x() {
                    return center.x + Math.cos(this.angle / 180 * Math.PI) * center.radius * scale.y * 5
                },

                get y() {
                    return center.y + Math.sin(this.angle / 180 * Math.PI) * center.radius * scale.x * 5
                },

                angle: getRandomAngle()
            }];

    function getRandomAngle () {
        return Math.random() * 360;
    }

    function drawNucleus(ctx) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, center.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.75)';
        ctx.fill();
        ctx.closePath();

    }

    function drawOrbits(ctx) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, 4 * center.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.save();
        ctx.beginPath();
        ctx.scale(scale.x, scale.y);
        ctx.arc(center.x / scale.x, center.y / scale.y, 5 * center.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.scale(scale.y, scale.x);
        ctx.arc(center.x / scale.y, center.y / scale.x, 5 * center.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

    }

    function drawPoint(ctx, point) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
    }

    function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function frame() {
        var i, len;

        clearCanvas(canvas, ctx);


        drawNucleus(ctx);
        drawOrbits(ctx);

        for (i = 0, len = points.length; i < len; i += 1) {
            drawPoint(ctx, points[i]);
        }

        for (i = 0, len = points.length; i < len; i += 1) {
            points[i].angle += 1;
        }

        setTimeout(frame, 1);
    }


    (function () {
        drawNucleus(ctx);
        drawOrbits(ctx);
        frame();
    }());
};