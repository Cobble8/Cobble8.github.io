const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');




function Rect() {
    this.x = 10;
    this.y = 10;
    this.width = 200;
    this.height = 200;
    this.r = 125;
    this.g = 0;
    this.b = 240;
    this.counter = 0;
    this.color = `rgb(${this.r}, ${this.g}, ${this.b})`;
    this.update = function() {

        //counter
        this.counter += 1;
        if(this.counter >= 345) this.counter = 0;
        //R
        if( this.counter > 0 && this.counter < 115) {
            this.r++;
            this.b--;
        }

        //G
        if(this.counter >= 115 && this.counter < 230) {
            this.g++;
            this.r--;
        }

        //B
        if(this.counter > 230 && this.counter < 345) {
            this.b++;
            this.g--;
        }

        this.color = `rgb(${this.r}, ${this.g}, ${this.b})`;
        this.draw();
    }
    this.draw = function() {
        c.fillRect(this.x, this.y, this.width, this.height)
        c.fillStyle = this.color;
        c.fill();
        c.beginPath();
        c.strokeRect(this.x, this.y, this.width, this.height)
        c.strokeStyle = 'black';
        c.lineWidth = 3;
        c.stroke();
    };
};

let rectArray;
function init() {
rectArray = [];
rectArray.push(new Rect());
};
init();
function animate() {
    requestAnimationFrame(animate);
    rectArray.forEach(r => r.update());
};
animate();