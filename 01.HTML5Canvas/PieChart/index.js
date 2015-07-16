window.onload = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 700;

    document.body.appendChild(canvas);

    var center = {
        x: 250,
        y: 250,
        r: 100
    };

    var data = {
        'Pesho': 5,
        'Gosho': 18,
        'Stamat': 62,
        'Mariika': 15
    };

    function drawAnimatedSegment(ctx, center, from, to, color) {
        (function frame() {
            var point = {
                x: center.x + Math.cos(from / 180 * Math.PI) * center.r,
                y: center.y + Math.sin(from / 180 * Math.PI) * center.r
            };

            ctx.lineWidth = 0.2;
            ctx.strokeStyle = color;

            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();


            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(center.x, center.y + 1, 0, 0, 2 * Math.PI);
            ctx.fill();

            from += 0.3;
            if (from < to) setTimeout(frame, 1);
        }())
    }


    var currentDrawingAngle = 0;

    var x = 500, y = 220, text;

    function drawData(data) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                var percentage = data[i];
                var fromAngle = currentDrawingAngle;
                var toAngle = currentDrawingAngle + percentage / 100 * 360;

                currentDrawingAngle = toAngle;

                var color = 'rgb(' + ((Math.random() * 4) | 0) * 60 + ',' + ((Math.random() * 4) | 0) * 60 + ',' + ((Math.random() * 4) | 0) * 60 + ')';

                ctx.strokeStyle = color;
                drawAnimatedSegment(ctx, center, fromAngle, toAngle, color);

                text = i;

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.fill();

                ctx.font = "14px Tahoma";
                ctx.fillStyle = 'black';
                ctx.fillText(text, x + 20, y + 5);

                y += 30;
            }
        }
    }

    drawData(data);
};