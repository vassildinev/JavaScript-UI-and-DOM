window.onload = function () {
    var canvas, ctx, frame = 0, image = new Image();

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function loadImage() {
        image.src = 'assets/sprites/coin-animation-spritesheet.png';
    }

    function runFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, frame * 44, 0, 44, 40, (canvas.width - 44) / 2, (canvas.height - 40) / 2, 44, 40);
        frame += 1;
        if(frame === 10) {
            frame = 0;
        }

        setTimeout(runFrame, 100);
    }

    (function () {
        loadCanvas();
        loadImage();
        runFrame();
    }())
};