window.onload = function () {
    var CONSTANTS = {
        CENTER_RADIUS: 80,
        DRAWING_RADIUS: 80 // the ratio between the two radii sharpens or softens the tips
    };

    var canvas, ctx, center, drawingObj;

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function getCenterObject() {
        return {
            x: canvas.width / 2 + CONSTANTS.CENTER_RADIUS,
            y: canvas.height / 2,
            angle: 0
        };
    }

    function getSpecialDrawingObject() {
        return {
            x: center.x + CONSTANTS.DRAWING_RADIUS * Math.sin((90 - (3 / 2) * center.angle) / 180 * Math.PI),
            y: center.y + CONSTANTS.DRAWING_RADIUS * Math.cos((90 - (3 / 2) * center.angle) / 180 * Math.PI),
            angle: 0
        };
    }

    function update() {
        center.x = canvas.width / 2 + CONSTANTS.CENTER_RADIUS * Math.sin(center.angle / 180 * Math.PI);
        center.y = canvas.height / 2 + CONSTANTS.CENTER_RADIUS * Math.cos(center.angle / 180 * Math.PI);
        center.angle += 1;

        drawingObj.x = center.x + CONSTANTS.DRAWING_RADIUS * Math.sin((90 - (3 / 2) * center.angle) / 180 * Math.PI);
        drawingObj.y = center.y + CONSTANTS.DRAWING_RADIUS * Math.cos((90 - (3 / 2) * center.angle) / 180 * Math.PI);

        // the ratio 3 / 2 -> 3 + 2 = 5 tips, determines the number of tips; note: 4 / 2 === 2 / 1 -> 3 tips
        drawingObj.angle += 1;
    }

    function render() {
        ctx.beginPath();
        //ctx.arc(center.x, center.y, 3, 0, 2 * Math.PI);
        ctx.arc(drawingObj.x, drawingObj.y, 1.5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }

    function clearContext() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function runFrame() {
        //clearContext();
        update();
        render();

        setTimeout(runFrame, 1);
    }

    (function () {
        loadCanvas();
        center = getCenterObject();
        drawingObj = getSpecialDrawingObject();
        runFrame();
    }())
};