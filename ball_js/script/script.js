const gravity = 500;
const friction = 0.7;
const fps = 60;
const delay = 1000/fps;

class Ball{
    constructor(canvas1, centerX, centerY, diam){
        this.canv = canvas1;
        this.x = centerX;
        this.y = centerY;
        this.diam = diam;
        this.speedX = 0;
        this.speedY = 0;
        this.draw();
    }
    draw(){
        var ctx = this.canv.getContext('2d');
        this.speedY = this.speedY + delay/1000 * gravity;
        this.y = this.y + this.speedY * delay/1000;
        this.collision();
        ctx.beginPath();
        ctx.clearRect(this.x - this.diam, this.y - this.diam, this.diam * 2, this.diam * 2);
        ctx.arc(this.x, this.y, this.diam/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        console.log(this.y)
        // window.requestAnimationFrame(this.draw.bind(this));
    }
    collision(){     
        if (this.y + this.diam/2 >= this.canv.height){
            this.y = this.y - 0.5;
            this.speedY = this.speedY * (-1) * friction;

        }
    }
}
document.addEventListener(
    "DOMContentLoaded",
    function(){
        var canvas = document.getElementById('canvasball');
        canvas.width = document.body.scrollWidth;
        canvas.height = window.innerHeight - 50;
        var ball = new Ball(canvas, canvas.width/2, 0, 50);
        setInterval(ball.draw.bind(ball), delay);
    }
)
