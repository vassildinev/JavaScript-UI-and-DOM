window.onload = function () {
    // batman equation:
    // http://math.stackexchange.com/questions/54506/is-this-batman-equation-for-real

    var canvas, ctx,
        x, y1, y2, y;

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function draw() {
        for (var i = -7; i <= 7; i += 0.005) {
            x = i;
            y1 = Math.sqrt(1 - (x / 7) * (x / 7)) * 3;
            y2 = -y1;

            ctx.save();
            ctx.beginPath();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(180 / 180 * Math.PI);
            ctx.scale(50, 50);
            if (Math.abs(x) > 3 && (y1 > -3 * Math.sqrt(33) / 7 && y2 > -3 * Math.sqrt(33) / 7)) {
                ctx.arc(x, y1, 0.1, 0, 2 * Math.PI);
                ctx.arc(x, y2, 0.1, 0, 2 * Math.PI);
                ctx.fillStyle = 'black';
            }

            y = Math.abs(x / 2) - x * x * (3 * Math.sqrt(33) - 7) / 112 - 3 + Math.sqrt(1 - Math.pow(Math.abs(Math.abs(x) - 2) - 1, 2));
            ctx.arc(x, y, 0.1, 0, 2 * Math.PI);

            y = 9 * Math.sqrt((Math.abs((1 - Math.abs(x)) * (Math.abs(x) - 0.75))) / ((1 - Math.abs(x)) * (Math.abs(x) - 0.75))) - 8 * Math.abs(x);
            ctx.arc(x, y, 0.1, 0, 2 * Math.PI);

            y = 3 * Math.abs(x) + 0.75 * Math.sqrt((Math.abs((0.75 - Math.abs(x)) * (Math.abs(x) - 0.5))) / ((0.75 - Math.abs(x)) * (Math.abs(x) - 0.5)));
            ctx.arc(x, y, 0.1, 0, 2 * Math.PI);

            y = 2.25 * Math.sqrt(Math.abs((0.5 - x) * (x + 0.5)) / ((0.5 - x) * (x + 0.5)));
            ctx.arc(x, y, 0.1, 0, 2 * Math.PI);

            y = 6.7 * Math.sqrt(10) / 7 + (1.5 - 0.5 * Math.abs(x)) * Math.sqrt(Math.abs(Math.abs(x) - 1) / (Math.abs(x) - 1)) -
                4.5 * Math.sqrt(10) / 14 * Math.sqrt(8.8 - Math.pow(Math.abs(x) - 1, 2));
            ctx.arc(x, y, 0.1, 0, 2 * Math.PI);

            ctx.fill();

            ctx.closePath();
            ctx.restore();
        }
    }

    (function () {
        loadCanvas();
        draw();
    }())
};