const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height);
c.fill();
var mouse = {
    x: undefined,
    y: undefined,
};
window.addEventListener('mousemove', function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
});
window.addEventListener('keydown', checkKeyPress, false) 
    function checkKeyPress(key) {
        var key = key.keyCode
        if(key == "82") {
            c.fillStyle = 'black';
            c.fillRect(0, 0, canvas.width, canvas.height);
            c.fill();
        }
    }

function Draw(x, y, color) {
    this.x = x;
    this.y = y;
    this.lX;
    this.lY;
    this.color = color;
    this.update = function() {
        this.lX = this.x;
        this.lY = this.y;
        this.x = mouse.x;
        this.y = mouse.y;
        this.draw();
    }
    this.draw = function() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.moveTo(this.lX, this.lY);
        c.lineTo(this.x, this.y);
        c.stroke();
    }
}
let lArray;
function init() {
    lArray = [];
    lArray.push(new Draw(mouse.x, mouse.y - 20, 'red'));
}
init();

function animate() {
    requestAnimationFrame(animate);
    lArray.forEach(d => {
        d.update();
    });
};
animate();