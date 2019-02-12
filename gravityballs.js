const canvas = document.querySelector('canvas');
let fwArray;


var c = canvas.getContext('2d');
let rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple',]

function Firework(x, y, vel, radius) {
    this.x = x;
    this.y = y;
    this.xVel = (Math.random() * 10) - 5;
    this.vel = vel;
    this.radius = radius;
    this.color = 'yellow';
    this.update = function() {
        if(this.x - this.radius - 30 <= 0 || this.x + this.radius + 30>= innerWidth) {
            this.xVel = -this.xVel;
        }
        if(this.y + this.radius + 20> canvas.height) {
            this.vel = -this.vel;
        } else {
            this.vel += (Math.random() * 0.2);
        };
        this.y += this.vel;
        this.x += this.xVel;
        this.draw();
    }
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        if(this.vel > 0) {
            c.beginPath();
            c.arc(this.x, this.y, 10, 0, Math.PI * 2, false)
            c.strokeStyle = 'blue'
            c.stroke();
            c.closePath();
            c.beginPath();
            c.arc(this.x, this.y, 15, 0, Math.PI * 2, false)
            c.strokeStyle = 'green'
            c.stroke();
            c.closePath();
            c.beginPath();
            c.arc(this.x, this.y, 20, 0, Math.PI * 2, false)
            c.strokeStyle = 'red'
            c.stroke();
            c.closePath();
        }
    }
}



function init() {
    fwArray = [];
    for(let i = 0; i < 15; i++) {
        let Vel = 5;
        let Radius = 4;
        let X = Math.random() * canvas.width;
        let Y = canvas.height - Radius - 300;
        fwArray.push(new Firework(X, Y, Vel, Radius));
    };
};
init();

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.5)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fill();
    fwArray.forEach(fw => fw.update());
};
animate();