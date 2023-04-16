class Game {

    constructor(canvasWidth, canvasHeight) 
    {
        this.enemies = new Array(20);
        this.bullets = new Array(10);
        this.sizeEnemies = 40;
        this.lifes = 3;
        this.score = 0;
        this.timer = 0;
        this.lose = false;
        this.player = new Player(canvasWidth, canvasHeight, 30, 30, "src/player.png", false);
    }

    //Esta funcion llena el array bullets de objetos bala default
    fillAmmo() 
    {
        for (let i = 0; i < this.bullets.length; i++) 
        {
            this.bullets[i] = new Bullet(this.player.x, this.player.y - this.player.height - 1, 5, 10, "src/bala.png", -5, false);
        }

    }

    //Esta funcion llena el array enemies de objetos enemy con valores default
    fillEnemies() 
    {
        let canvas = document.getElementById("canvas");
        let rec = canvas.getBoundingClientRect();

        for (let i = 0; i < this.enemies.length; i++) 
        {
            let rnd = Math.floor((Math.random() * 19));
            let enemy = new Enemy(this.sizeEnemies + (this.sizeEnemies * rnd), (this.sizeEnemies * -2), this.sizeEnemies, this.sizeEnemies, "src/enemy.png ", 1, false);

            if (enemy.x == 0) enemy.x = this.sizeEnemies;
            else if (enemy.x >= rec.width - this.sizeEnemies) enemy.x = enemy.x - this.sizeEnemies;

            this.enemies[i] = enemy;
        }
    }

    //Esta funcion se ejecuta cada vez que el jugador mueve el mouse y actualiza la posicion del player
    movePlayer(event) 
    {
        this.player.on = true;
        let rec = document.getElementById("canvas").getBoundingClientRect();

        var mouseX = event.clientX - rec.left;
        var mouseY = event.clientY - rec.top;

        if (mouseX < rec.width - 30) {
            if (this.lose == false) 
            {
                this.deleteRect(this.player);
                this.player.x = mouseX;
                this.player.y = mouseY;
                this.createRect(this.player);
            }
        }
    }

    //Esta funcion se encarga de dar como operativo un enemigo 
    createEnemy() 
    {
        if (this.player.on == true) 
        {
            for (let i = 0; i < this.enemies.length; i++) 
            {
                if (this.enemies[i].on == false) {
                    this.enemies[i].on = true;
                    break;
                }
            }
        }
    }

    //Esta funcion es la encargada de mover todos los enemigos operativos
    moveEnemies() 
    {
        for (let i = 0; i < this.enemies.length; i++) {

            if (this.enemies[i].on == true) 
            {
                this.deleteRect(this.enemies[i]);
                this.enemies[i].y = this.enemies[i].y + this.enemies[i].speed;
                this.createRect(this.enemies[i]);
            }
        }
    }

    //Esta funcion se encarga de dar como operativa una bala
    createBullet() 
    {
        if (this.player.on == true) 
        {
            for (let i = 0; i < this.bullets.length; i++) 
            {
                if (this.bullets[i].on == false) {
                    this.bullets[i].on = true;
                    this.bullets[i].x = this.player.x + this.player.width / 2 - this.bullets[i].width / 2;
                    this.bullets[i].y = this.player.y - this.player.height / 2;
                    break;
                }
            }
        }
    }

    //Esta funcion se encarga de mover las balas operativas
    moveBullet() 
    {
        for (let i = 0; i < this.bullets.length; i++)
        {
            if (this.bullets[i].on == true) 
            {
                this.deleteRect(this.bullets[i]);
                this.bullets[i].y = this.bullets[i].y + this.bullets[i].speed;

                if (this.bullets[i].y <= 0) this.bullets[i].on = false;
                else this.createRect(this.bullets[i]);   
            }
        }
    }

    //Esta funcion crea en el canva el objeto que se ponga en el argumento
    createRect(thing) 
    {
        let ctx = document.getElementById("canvas").getContext("2d");

        const image = new Image(thing.width, thing.height); // Using optional size for image
        image.src = thing.img;

        ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
    }

    //Esta funcion elimina del canva el objeto que se ponga en el argumento
    deleteRect(thing) 
    {
        let ctx = document.getElementById("canvas").getContext("2d");
        ctx.clearRect(thing.x - 1, thing.y - 1, thing.width + 2, thing.height + 2);
    }

    //Esta funcion es la encargada de calcular y printar por pantalla el tiempo actual
    setTime() 
    {
        if (this.player.on == true) 
        {
            this.timer++;
            let min = 0;
            let seconds = this.timer;

            while (seconds >= 60) {
                seconds -= 60;
                min++;
            }
            if (seconds < 10) seconds = "0" + seconds;

            document.getElementById("time").innerHTML = "<span>Time</span><br>" + min + ":" + seconds;
        }
    }

    //Esta funcion es la encargada de printa por pantalla con img cuantas vidas tiene el player
    setImgLifes() 
    {
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

    //Esta funcion se encarga de actualizar las vidas del player
    modifyImgLifes() 
    {
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

    //Esta funcion desoperativa y borra el asset del argumento
    deleteAll(thing) 
    {
        for (let x of thing) 
        {
            x.on = false;
            this.deleteRect(x);
        }
    }

    //Esta funcion es la encarga de detectar los enemigos que colisionan con el player
    //hacer los respectivos calculos y acciones
    //y tambien de si el enemigo llega al final del canva vertical
    detectEnemies()
    {
        let rec = document.getElementById("canvas").getBoundingClientRect();
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.player.checkCollision(this.enemies[i]) || this.enemies[i].y >= rec.height) {
                this.modifyImgLifes();
                this.deleteRect(this.enemies[i]);
                this.enemies[i].restartStats(this.sizeEnemies);
    
                if (this.lifes == 0) {
                    this.deleteAll(this.bullets);
                    this.lose = true;
                }
            }
        }
    }

    //Esta funcion esta encargada de comprobar cuando una bala impacta contra un enemigo
    //cuando llega a 100 la puntuacion tambien es la encargada de acabar la partida
    bulletImpact()
    {
        for (let i = 0; i < this.bullets.length; i++) {
            for (let j = 0; j < this.enemies.length; j++) {
                if (this.bullets[i].checkCollision(this.enemies[j])) {
                    if (this.enemies[j].y > 0) {
                        this.score++;
                        document.getElementById("kill").innerHTML = "<span>Kills</span><br>" + this.score + "/100";
                        if (this.score == 100) this.lose = true;
                    }

                    this.deleteRect(this.enemies[j]);
                    this.deleteRect(this.bullets[i]);

                    this.bullets[i].on = false;
                    this.enemies[j].restartStats(this.sizeEnemies);
                    break;
                }
            }
        }
    }


}
