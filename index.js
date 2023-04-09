var enemies = [];
var bullets = [];
var score = 0;
var lose = false;

var canvas = document.getElementById("canvas");
canvas.addEventListener("mousemove", movePlayer);
var ctx = canvas.getContext("2d");
var rec = canvas.getBoundingClientRect();

var player = new Player(canvas.width, canvas.height, 20, 20, "blue");

var interCreateEnemy = setInterval(createEnemy, 2000);
var interMoveEnemy = setInterval(moveEnemies, 500);
var interCreateBullet = setInterval(createBullet, 1000);


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
   
    for (let i= 0; i < enemies.length;i++) 
    {
        if (player.checkCollision(enemies[i])) {
            lose = true;
        }

        if(enemies[i].y >= rec.height){
            enemies.splice(i,1);
            console.log(enemies);
        }
    }

    if (lose) 
    {
        clearInterval(interCreateEnemy);
        clearInterval(interMoveEnemy);
        ctx.clearRect(player.x - player.width / 2, player.y - player.height / 2, player.width + 1, player.height + 1);
        ctx.font = "30px Arial"; // Fuente y tamaño de fuente
        ctx.fillStyle = "black"; // Color del texto
        ctx.fillText("Has perdido!", canvas.width / 2, canvas.height / 2);
    }
    else 
    {

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
    for (let i = 0; i < enemies.length; i++) {
        ctx.clearRect(enemies[i].x - 1, enemies[i].y - 1, enemies[i].width + 2, enemies[i].height + 2);
        ctx.fillStyle = enemies[i].color;
        enemies[i].y = enemies[i].y + enemies[i].speed;
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height)
    }
}

function createBullet()
{

}


