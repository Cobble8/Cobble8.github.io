const canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500;
var c = canvas.getContext('2d');



function Character(x, y, vel) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.update = function() {

        this.x += this.vel;
        this.y += this.vel;
        this.draw();
    };
    this.draw = function() {
        c.fillRect(0, 0, 50, 50);
        c.fillStyle = 'black';
        c.fill();
    };
    window.addEventListener('keydown', checkKeyPress, false) 
    function checkKeyPress(key) {
        var key = key.keyCode
        if(key == "65") {
            //A
        this.x += -this.vel;
        }
        else if(key == "87") {
            //W
            this.y += -this.vel;
        }
        else if(key == "83") {
            //S
            this.y += this.vel;
        }
        else if(key == "68") {
            //D
            this.x += this.vel;
        }
        this.update();
    }
};
let Char;
function init() {
    Char = [];
    for(let i = 0; i < 1; i++) {
        Char.push(new Character(0, 0, 0));
    };
};
init();


function animate() {
    requestAnimationFrame(animate)
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = 'yellow';
    c.fill()
    Char.forEach(chr => {
        chr.update();
    });

};
animate();