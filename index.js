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

    time.textContent = "time";
    time.setAttribute("id", "time");
    kill.textContent = "kill";
    kill.setAttribute("id", "kill");

    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", canvaWidth);
    canvas.setAttribute("height", canvaHeight);
    canvas.addEventListener("mousemove", movePlayer);

    article.appendChild(time);
    article.appendChild(canvas);
    article.appendChild(kill);

    let divNavesImg = document.createElement("div");
    divNavesImg.setAttribute("id","divNaves");

    for(let i=0; i < game.lifes ;i++)
    {
        let img = document.createElement("img");
        img.setAttribute("src",game.player.img);
        img.setAttribute("width",game.player.width);
        img.setAttribute("height",game.player.height);  
        divNavesImg.appendChild(img);
    }
    document.body.appendChild(divNavesImg);

    StartGame();
}

function StartGame() 
{
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

    for (let i = 0; i < game.numBullets; i++) {
        if (game.player.checkCollision(game.enemies[i]) || game.enemies[i].y >= rec.height) 
        {
            game.modifyImgLifes();
            game.deleteRect(game.enemies[i]);
            game.enemies[i].restartStats(game.sizeEnemies);
          

            if(game.lifes == 0)
            {     
                game.deleteAllBullets();
                game.lose = true;
            }

        }
    }

    if (game.lose) {
        game.deleteRect(game.player);
        clearInterval(interTimer);
        clearInterval(interCreateEnemy);
        clearInterval(interCreateBullet);
    }
    else {
        game.moveEnemies();
        game.moveBullet();

        for (let i = 0; i < game.numBullets; i++) {
            for (let j = 0; j < game.enemies.length; j++) {
                if (game.bullets[i].checkCollision(game.enemies[j])) 
                {
                    if (game.enemies[j].y > 0) {
                        game.score++;
                        document.getElementById("kill").innerHTML = "Kills:<br>" + game.score + "/100";
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