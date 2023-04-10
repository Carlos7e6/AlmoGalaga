var enemies = [];
var bullets = [];
var numBullets = 10;
var counter = 0;

var score = 0;
var lose = false;

var canvas = document.getElementById("canvas");
canvas.addEventListener("mousemove", movePlayer);
var ctx = canvas.getContext("2d");
var rec = canvas.getBoundingClientRect();

var player = new Player(canvas.width, canvas.height, 20, 20, "blue");

var interCreateEnemy = setInterval(createEnemy, 500);
var interMoveEnemy = setInterval(moveEnemies, 500);
var interCreateBullet = setInterval(createBullet, 500);
var interMoveBullet = setInterval(moveBullet, 100);

function fillAmmo() {
    for (let i = 0; i < numBullets; i++) {
        bullets.push(new Bullet(player.x, player.y - player.height - 1, 5, 10, "green", -20, false));
    }
    console.log(bullets);
}

fillAmmo();


function movePlayer(event) {
    var mouseX = event.clientX - rec.left;
    var mouseY = event.clientY - rec.top;

    actPlayer(mouseX, mouseY);
}

function actPlayer(newX, newY) {
    if (lose == false) {
        ctx.clearRect(player.x - player.width / 2, player.y - player.height / 2, player.width + 1, player.height + 1);
        ctx.fillStyle = player.color;

        player.x = newX;
        player.y = newY;

        ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
    }
}

function Update() {

    for (let i = 0; i < enemies.length; i++) {
        if (player.checkCollision(enemies[i])) {
            lose = true;
        }

        if (enemies[i].y >= rec.height) {
            lose = true;
        }
    }

    if (lose) {
        clearInterval(interCreateEnemy);
        clearInterval(interMoveEnemy);
        clearInterval(interCreateBullet);
        clearInterval(interMoveBullet);
        
        deleteRect(player);

        ctx.font = "30px Arial"; // Fuente y tamaño de fuente
        ctx.fillStyle = "black"; // Color del texto
        ctx.fillText("Has perdido!", canvas.width / 2, canvas.height / 2);
    }
    else {
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < enemies.length; j++) {

                if (bullets[i].checkCollision(enemies[j])) 
                {
                    deleteRect(enemies[j]);
                    deleteRect(bullets[i]);
                    bullets[i].on = false;
                    enemies.splice(j, 1);
                }

            }
        }

    }
    requestAnimationFrame(Update);
}

Update();

function createEnemy() {
    let size = Math.random() * 20 + 10;
    let enemy = new Enemy(Math.random() * rec.width, 30, size, size, "red", Math.random() * 10 + 10);

    enemies.push(enemy);

    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function moveEnemies() {
    for (let i = 0; i < enemies.length; i++) 
    {
        deleteRect(enemies[i]);

        enemies[i].y = enemies[i].y + enemies[i].speed;

        createRect(enemies[i]);
    }
}

function createBullet() 
{
    if (bullets[counter].on == false) 
    {
        bullets[counter].on = true;
        bullets[counter].x = player.x;
        bullets[counter].y = player.y;
    }
    counter++;
    if(counter == numBullets){
        counter = 0;
    }
}

function moveBullet() {
    for (let i = 0; i < bullets.length; i++) {

        if (bullets[i].on == true) {

            deleteRect(bullets[i]);
            bullets[i].y = bullets[i].y + bullets[i].speed;

            if (bullets[i].y <= 0) {
                bullets[i].on = false;
            }
            else 
            {
                createRect(bullets[i]);
            }
        }
    }
}

function createRect(thing) {
    ctx.fillStyle = thing.color;
    ctx.fillRect(thing.x, thing.y, thing.width, thing.height);
}



function deleteRect(thing) {
    ctx.clearRect(thing.x - 1, thing.y - 1, thing.width + 2, thing.height + 2);
}


