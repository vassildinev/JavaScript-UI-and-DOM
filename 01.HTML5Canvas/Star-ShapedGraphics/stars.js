window.onload = function () {
    //r(t) = Math.abs(cos(nt))^sin(2nt)
    var canvas, ctx, obj = {}, n = 1.5, t = 0;

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
    }

    function update() {
        obj.x = 100 * (Math.pow(Math.abs(Math.cos(n * t)), Math.sin(2 * n * t))) * Math.cos(t);
        obj.y = 100 * (Math.pow(Math.abs(Math.cos(n * t)), Math.sin(2 * n * t))) * Math.sin(t);

        t += 0.005;
    }

    function render(){
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(180 / 180 * Math.PI);
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    function runFrame() {
        update();
        render();

        setTimeout(runFrame, 1);
    }

    (function () {
        loadCanvas();
        runFrame();
    }());
};