"use strict";
class Game {

    constructor(canvasWidth, canvasHeight) {
        this.enemies = new Array(20);
        this.bullets = new Array(10);

        this.sizeEnemies = 40;
        this.lifes = 3;

        this.score = 0;
        this.timer = 0;

        this.lose = false;
        // this.canva = document.getElementById("canvas");

        this.player = new Player(canvasWidth, canvasHeight, 30, 30, "src/player.png", false);
    }

    fillAmmo() {

        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i] = new Bullet(this.player.x, this.player.y - this.player.height - 1, 5, 10, "src/bala.png", -7, false);
        }

    }

    fillEnemies() {
        let canvas = document.getElementById("canvas");
        let rec = canvas.getBoundingClientRect();

        for (let i = 0; i < this.enemies.length; i++) {
            let rnd = Math.floor((Math.random() * 19));
            let enemy = new Enemy(this.sizeEnemies + (this.sizeEnemies * rnd), (this.sizeEnemies * -2), this.sizeEnemies, this.sizeEnemies, "src/enemy.png ", 2, false);

            if (enemy.x == 0) enemy.x = this.sizeEnemies;
            else if (enemy.x >= rec.width - this.sizeEnemies) enemy.x = enemy.x - this.sizeEnemies;

            this.enemies[i] = enemy;
        }
    }

    movePlayer(event) {
        this.player.on = true;

        let canvas = document.getElementById("canvas");
        let rec = canvas.getBoundingClientRect();

        var mouseX = event.clientX - rec.left;
        var mouseY = event.clientY - rec.top;

        if (mouseX < rec.width - 30) {
            if (this.lose == false) {
                this.deleteRect(this.player);

                this.player.x = mouseX;
                this.player.y = mouseY;

                this.createRect(this.player);
            }
        }
    }

    createEnemy() {
        if (this.player.on == true) {
            for (let i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].on == false) {
                    this.enemies[i].on = true;
                    break;
                }
            }
        }
    }

    moveEnemies() {

        for (let i = 0; i < this.enemies.length; i++) {

            if (this.enemies[i].on == true) {
                this.deleteRect(this.enemies[i]);

                this.enemies[i].y = this.enemies[i].y + this.enemies[i].speed;

                this.createRect(this.enemies[i]);
            }
        }
    }

    createBullet() {
        if (this.player.on == true) {
            for (let i = 0; i < this.bullets.length; i++) {
                if (this.bullets[i].on == false) {
                    this.bullets[i].on = true;
                    this.bullets[i].x = this.player.x + this.player.width / 2 - this.bullets[i].width / 2;
                    this.bullets[i].y = this.player.y - this.player.height / 2;
                    break;
                }
            }
        }
    }

    moveBullet() {

        for (let i = 0; i < this.bullets.length; i++) {

            if (this.bullets[i].on == true) {

                this.deleteRect(this.bullets[i]);
                this.bullets[i].y = this.bullets[i].y + this.bullets[i].speed;

                if (this.bullets[i].y <= 0) {
                    this.bullets[i].on = false;
                }
                else {
                    this.createRect(this.bullets[i]);
                }
            }
        }
    }

    createRect(thing) {

        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");

        const image = new Image(thing.width, thing.height); // Using optional size for image
        image.src = thing.img;

        ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);

    }

    deleteRect(thing) {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(thing.x - 1, thing.y - 1, thing.width + 2, thing.height + 2);
    }

    setTime() {
        if (this.player.on == true) {
            this.timer++;
            let timer = document.getElementById("time");
            let min = 0;
            let seconds = this.timer;

            while (seconds >= 60) {
                seconds -= 60;
                min++;
            }

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            timer.innerHTML = "<span>Time</span><br>" + min + ":" + seconds;
        }
    }

    setImgLifes() {
        let divNavesImg = document.createElement("div");
        divNavesImg.setAttribute("id", "divNaves");

        for (let i = 0; i < game.lifes; i++) {
            let img = document.createElement("img");
            img.setAttribute("src", game.player.img);
            img.setAttribute("width", game.player.width * 1.5);
            img.setAttribute("height", game.player.height * 1.5);
            divNavesImg.appendChild(img);
        }
        document.body.appendChild(divNavesImg);
    }

    modifyImgLifes() {
        this.lifes--;
        let divNavesImg = document.getElementById("divNaves");
        divNavesImg.innerHTML = "";

        for (let i = 0; i < this.lifes; i++) {
            let img = document.createElement("img");
            img.setAttribute("src", game.player.img);
            img.setAttribute("width", game.player.width * 1.5);
            img.setAttribute("height", game.player.height * 1.5);
            divNavesImg.appendChild(img);
        }

    }

    deleteAll(thing) {
        for (let x of thing) {
            x.on = false;
            this.deleteRect(x);
        }
    }

}
