class Asset{
    constructor(width, height, img){
        this.width = width;
        this.height = height;
        this.img = img;
    }

    checkCollision(rect2) {
        if (this.x < rect2.x + rect2.width &&
            this.x + this.width > rect2.x &&
            this.y < rect2.y + rect2.height &&
            this.y + this.height > rect2.y) {
          // Los rectángulos se solapan, hay colisión
          return true;
        } else {
          // Los rectángulos no se solapan, no hay colisión
          return false;
        }
    }
}

class Player extends Asset{

    constructor(x , y, width, height, img, on)
    {
        super(width, height, img);
        this.x = x / 2;
        this.y = y - 50;
        this.on = on;
    }
}

class Enemy extends Asset{

    constructor(x , y, width, height, img, speed, on)
    {
        super(width, height, img);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.on = on;
    }
}

class Bullet extends Asset
{
    constructor(x , y, width, height, img, speed, on)
    {
        super(width, height, img);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.on = on;
    }
}