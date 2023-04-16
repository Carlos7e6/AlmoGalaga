
let start = document.getElementById("startgame");
start.addEventListener("click", prepare);
let canvaWidth = 800;
let canvaHeight = 600;

let interCreateBullet;
let interCreateEnemy;
let interTimer;

var game = new Game(canvaWidth, canvaHeight);

//En esta funcion pongo todos los elementos necesarios en la IU
//para pode comenzar a jugar
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

//En esta funcion establezco los parametros predeterminados de mis enemigos y balas
// y doy inicio a los intervalos de disparos, creacion de enemigos y temporizadorç
//seguidamente llamo al update
function StartGame() {
    game.fillAmmo();
    game.fillEnemies();

    interCreateBullet = setInterval(createBullet, 300);
    interCreateEnemy = setInterval(createEnemy, 700);
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

///Esta es la funcion update 
function Update() {

   game.detectEnemies();

    if (game.lose) 
    {
        game.deleteRect(game.player);
        clearInterval(interTimer);
        clearInterval(interCreateEnemy);
        clearInterval(interCreateBullet);
        document.getElementById("canvas").style.cursor = "auto";
        printEnd();

    }
    else {
        game.moveEnemies();
        game.moveBullet();
        game.bulletImpact();
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


function anotherGame() {
    document.getElementsByClassName("endDiv")[0].remove();
    game.score = 0;
    game.timer = 0;
    game.lose = false;
    game.lifes = 4;
    game.player.on = false;

    document.getElementById("kill").innerHTML = "Kill";
    document.getElementById("time").innerHTML = "Time"
    document.getElementById("canvas").style.cursor = "none";

    game.deleteAll(game.enemies);
    game.deleteAll(game.bullets);
    game.fillAmmo();
    game.fillEnemies();
    game.modifyImgLifes();
    interCreateBullet = setInterval(createBullet, 400);
    interCreateEnemy = setInterval(createEnemy, 800);
    interTimer = setInterval(setTime, 1000);

    Update();
}