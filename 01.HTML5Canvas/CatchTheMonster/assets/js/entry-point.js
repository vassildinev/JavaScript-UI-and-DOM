window.onload = function () {
    var canvas,
        ctx,

        bgReady,
        heroReady,
        monsterReady,

        bgImage,
        heroImage,
        monsterImage,

        hero,
        monster,
        monstersCaught,

        keysDown,

        then;

    function loadCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 427;

        ctx = canvas.getContext('2d');

        document.body.appendChild(canvas);
    }

    function loadImages() {
        bgReady = false;
        heroReady = false;
        monsterReady = false;

        bgImage = new Image();
        heroImage = new Image();
        monsterImage = new Image();
        bgImage.onload = function () {
            bgReady = true;
        };
        bgImage.src = 'assets/images/background.png';

        heroImage.onload = function () {
            heroReady = true;
        };
        heroImage.src = 'assets/images/hero.png';

        monsterImage.onload = function () {
            monsterReady = true;
        };
        monsterImage.src = 'assets/images/monster.png';
    }

    function loadGameObjectsAndParameters() {
        hero = {
            speed: 200
        };

        monster = {};

        monstersCaught = 0;
    }

    function attachUserInteractionListeners() {
        keysDown = {};

        addEventListener('keydown', function (e) {
            keysDown[e.keyCode] = true;
        }, false);

        addEventListener('keyup', function (e) {
            delete keysDown[e.keyCode];
        }, false);
    }

    function resetGameObjectsPositions() {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;

        monster.x = 32 + Math.random() * (canvas.width - 64);
        monster.y = 32 + Math.random() * (canvas.height - 64);
    }

    function updateGameObjects(timeElapsed) {
        if (37 in keysDown) { // Player holding left
            hero.x -= hero.speed * timeElapsed;
        }

        if (38 in keysDown) { // Player holding up
            hero.y -= hero.speed * timeElapsed;
        }

        if (39 in keysDown) { // Player holding right
            hero.x += hero.speed * timeElapsed;
        }

        if (40 in keysDown) { // Player holding down
            hero.y += hero.speed * timeElapsed;
        }

        // Check for player out of the field
        if(hero.x < 0) {
            hero.x = canvas.width - 32;
        }

        if(hero.x + 32 > canvas.width) {
            hero.x = 0;
        }

        if(hero.y < 0) {
            hero.y = canvas.height - 32;
        }

        if(hero.y + 32 > canvas.height) {
            hero.y = 0;
        }

        // Check for touching
        if (hero.x <= (monster.x + 32) &&
                monster.x <= (hero.x + 32) &&
                hero.y <= (monster.y + 32) &&
                monster.y <= (hero.y + 32)) {
            monstersCaught += 1;
            resetGameObjectsPositions();
        }
    }

    function render() {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 0);
        }

        if (heroReady) {
            ctx.drawImage(heroImage, hero.x, hero.y);
        }

        if (monsterReady) {
            ctx.drawImage(monsterImage, monster.x, monster.y);
        }

        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
    }

    function runFrame() {
        var now = Date.now(),
            timeElapsed = now - then;

        updateGameObjects(timeElapsed / 1000);
        render();

        then = now;

        requestAnimationFrame(runFrame);
    }

    function initialize() {
        loadCanvas();
        loadImages();
        loadGameObjectsAndParameters();
        attachUserInteractionListeners();
        resetGameObjectsPositions();

        then = Date.now();
    }

    (function () {
        initialize();
        runFrame();
    }());
};