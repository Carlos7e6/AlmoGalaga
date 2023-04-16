let start = document.getElementById("startgame");
start.addEventListener("click", prepare);
let canvaWidth = 800;
let canvaHeight = 600;

let interCreateBullet;
let interCreateEnemy;
let interTimer;

var game = new Game(canvaWidth, canvaHeight);

function prepare() {

    let div = document.getElementById("preload");
    div.remove();
    let article = document.getElementsByTagName("article")[0];

    let canvas = document.createElement("canvas");
    let time = document.createElement("h1");
    let kill = document.createElement("h1");

    time.innerHTML = "<span>time</span>";
    time.setAttribute("id", "time");
    kill.innerHTML = "<span>kills</span>";
    kill.setAttribute("id", "kill");

    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", canvaWidth);
    canvas.setAttribute("height", canvaHeight);
    canvas.addEventListener("mousemove", movePlayer);

    article.appendChild(time);
    article.appendChild(canvas);
    article.appendChild(kill);

    game.setImgLifes();

    StartGame();
}

function StartGame() {
    game.fillAmmo();
    game.fillEnemies();

    interCreateBullet = setInterval(createBullet, 400);
    interCreateEnemy = setInterval(createEnemy, 800);
    interTimer = setInterval(setTime, 1000);

    Update();
}

function setTime() {
    game.setTime();
}

function createEnemy() {
    game.createEnemy();
}

function movePlayer(event) {
    game.movePlayer(event);
}

function createBullet() {
    game.createBullet();
}


function Update() {
    var rec = canvas.getBoundingClientRect();

    for (let i = 0; i < game.bullets.length; i++) {
        if (game.player.checkCollision(game.enemies[i]) || game.enemies[i].y >= rec.height) {
            game.modifyImgLifes();
            game.deleteRect(game.enemies[i]);
            game.enemies[i].restartStats(game.sizeEnemies);

            if (game.lifes == 0) {
                game.deleteAll(game.bullets);
                game.lose = true;
            }
        }
    }

    if (game.lose) {
        game.deleteRect(game.player);
        clearInterval(interTimer);
        clearInterval(interCreateEnemy);
        clearInterval(interCreateBullet);
        let canvas = document.getElementById("canvas");
        canvas.style.cursor = "auto";
        printEnd();


    }
    else {
        game.moveEnemies();
        game.moveBullet();

        for (let i = 0; i < game.bullets.length; i++) {
            for (let j = 0; j < game.enemies.length; j++) {
                if (game.bullets[i].checkCollision(game.enemies[j])) {
                    if (game.enemies[j].y > 0) {
                        game.score++;
                        document.getElementById("kill").innerHTML = "<span>Kills</span><br>" + game.score + "/100";
                        console.log(game.enemies[j] + game.bullets[i] + game.score);
                    }

                    game.deleteRect(game.enemies[j]);
                    game.deleteRect(game.bullets[i]);

                    game.bullets[i].on = false;
                    game.enemies[j].restartStats(game.sizeEnemies);
                    break;
                }
            }
        }
        requestAnimationFrame(Update);
    }

}

function printEnd() {
    let div = document.createElement("div");
    let button = document.createElement("button");
    let h1 = document.createElement("h1");

    div.className = "endDiv";

    button.innerHTML = "<p>RESTART</p>";
    button.className = "endButton";
    button.addEventListener("click", anotherGame);

    if (game.score == 100) {
        h1.innerHTML = "Has ganado";
    }
    else {
        h1.innerHTML = "Has perdido";
    }

    div.appendChild(h1);
    div.appendChild(button);

    document.body.appendChild(div);
}


function anotherGame() 
{
    document.getElementsByClassName("endDiv")[0].remove();
    game.score = 0;
    game.timer = 0;
    game.lose = false;
    game.lifes = 4;
    game.on = false;

    game.deleteAll(game.enemies);
    game.fillAmmo();
    game.fillEnemies();
    game.modifyImgLifes();
    interCreateBullet = setInterval(createBullet, 400);
    interCreateEnemy = setInterval(createEnemy, 800);
    interTimer = setInterval(setTime, 1000);

    Update();
}