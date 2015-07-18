window.onload = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        center = {
            x: 650,
            y: 300,
            radius: 20
        },

        scale = {
            x: 0.45,
            y: 1
        }

    canvas.width = 1300;
    canvas.height = 600;

    document.body.appendChild(canvas);

    var points = [
        {
            get x() {
                return Math.cos(this.angle / 180 * Math.PI) * center.radius * scale.y * 5
            },

            get y() {
                return Math.sin(this.angle / 180 * Math.PI) * center.radius * scale.x * 5
            },

            angle: getRandomAngle(),
            rotation: 0,
            color: 'green'
        },

        {
            get x() {
                return Math.cos(this.angle / 180 * Math.PI) * center.radius * scale.x * 5
            },

            get y() {
                return Math.sin(this.angle / 180 * Math.PI) * center.radius * scale.y * 5
            },

            angle: getRandomAngle(),
            rotation: 38,
            color: 'blue'
        },

        {
            get x() {
                return Math.cos(this.angle / 180 * Math.PI) * center.radius * scale.x * 5
            },

            get y() {
                return Math.sin(this.angle / 180 * Math.PI) * center.radius * scale.y * 5
            },

            angle: getRandomAngle(),
            rotation: 38,
            color: 'blue'
        },

        {
            get x() {
                return Math.cos(this.angle / 180 * Math.PI) * center.radius * scale.y * 5
            },

            get y() {
                return Math.sin(this.angle / 180 * Math.PI) * center.radius * scale.x * 5
            },

            angle: getRandomAngle(),
            rotation: 52,
            color: 'rgb(255, 100, 150)'
        }
    ];

    function getRandomAngle() {
        return Math.random() * 360;
    }

    function drawNucleus() {
        ctx.beginPath();
        ctx.arc(center.x, center.y, center.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.75)';
        ctx.fill();
        ctx.closePath();

    }

    function drawOrbits() {
        ctx.strokeStyle = 'rgb(190, 190, 190)';

        ctx.save();
        ctx.beginPath();
        ctx.translate(center.x, center.y);
        ctx.scale(scale.y, scale.x);
        ctx.arc(0, 0, 5 * center.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.translate(center.x, center.y);
        ctx.rotate(38 / 180 * Math.PI);
        ctx.scale(scale.x, scale.y);
        ctx.translate(0, 0);
        ctx.arc(0, 0, 5 * center.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.translate(center.x, center.y);
        ctx.rotate(52 / 180 * Math.PI);
        ctx.scale(scale.y, scale.x);
        ctx.translate(0, 0);
        ctx.arc(0, 0, 5 * center.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

    }

    function drawPoint(point) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(center.x, center.y);
        ctx.rotate((point.rotation === 0 ? 0 : point.rotation) / 180 * Math.PI);
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.restore()
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function runFrame() {
        var i, len;

        clearCanvas();
        drawNucleus();
        drawOrbits();

        for (i = 0, len = points.length; i < len; i += 1) {
            drawPoint(points[i]);
        }

        for (i = 0, len = points.length; i < len; i += 1) {
            points[i].angle += 1;
        }

        setTimeout(runFrame, 1);
    }


    (function () {
        drawNucleus();
        drawOrbits();
        runFrame();
    }());
};