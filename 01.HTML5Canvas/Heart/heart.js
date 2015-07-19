window.onload = function () {
    // heart equation:
    // x^2 + (6 * y / 5 - Math.sqrt(Math.abs(x)))^2 = 1

    var canvas, ctx, center,
        x, y1, y2;

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function draw() {
        for(var i = -1; i <= 1; i += 0.0001) {
            x = i;
            y1 = (+ Math.sqrt(1 - (x)*(x)) + Math.sqrt(Math.abs(x))) * 5 / 6;
            y2 = (- Math.sqrt(1 - (x)*(x)) + Math.sqrt(Math.abs(x))) * 5 / 6;

            ctx.save();
            ctx.beginPath();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(180 / 180 * Math.PI);
            ctx.scale(200, 200);
            ctx.arc(x, y1, 0.01, 0, 2 * Math.PI); // points forming top of heart
            ctx.arc(x, y2, 0.01, 0, 2 * Math.PI); // points forming bottom of heart
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }

    (function () {
        loadCanvas();
        center =  {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
        draw();
    }())
};