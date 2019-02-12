const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

const colors = [
    "#FF0000",
    "#FF7B00",
    "#FFDD00",
]
var mouse = {
    x: undefined,
    y: undefined,
    mass: 1,
}
var maxRadius = 40;
var minRadius = 2;
window.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    }
    return rotatedVelocities;
}
function resolveCollision(particle, otherParticle) {

    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function Particle2(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
    }
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.update = function(particles2) {
        for(let i = 0; i < particles2.length; i++) {
            if(this == particles2[i]) continue;
            if(distance(this.x, this.y, particles2[i].x, particles2[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, particles2[i]);
            }
            if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.innerWidth) {
                this.velocity.x = -this.velocity.x
            }
            if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.innerHeight) {
                this.velocity.y = -this.velocity.y;
            }
            //Mouse Collision Detection
            if(distance(mouse.x, mouse.y, this.x, this.y) < this.radius) {
                
            }



            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.color
        c.stroke();
        c.fillStyle = 'black';
        c.fill();
        c.closePath();
    }

}


function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color7 = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = randomIntFromRange(50, 120)
    this.lastMouse = {x: x,y: y};
    this.update = () =>{
        const lastPoint = {x: this.x, y: this.y}
        this.radians += this.velocity

        //Drag Effect
        this.lastMouse += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse += (mouse.y - this.lastMouse.y) * 0.05;

        //Movement
        this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    };

    this.draw = (lastPoint) => {
        c.beginPath();
        c.strokeStyle = this.color7;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();

    };
}
function distance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))

}



//Init
let MOUSE;
let particles2;
//var ball;
//var ballArray;
let particles;
function init() {
    particles2 = [];
    for(let i = 0; i < 20; i++) {
        const radius = 40;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        const color = '#00FF00';

        if(i != 0) {
            for(let j = 0; j < particles2.length; j++) {
                if(distance(x, y, particles2[j].x, particles2[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    j = -1;
                }
                
            }
        }

        particles2.push(new Particle2(x, y, radius, color));
    }
    particles = [];
    for(let i = 0; i < 100; i++) {
        const radius = (Math.random() * 6) + 1
        const color9 = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, color9));
    };



}




init()

addEventListener('click',function() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    init();
})
//Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
    particles2.forEach(particle => {
        particle.update(particles2);
    });

};
animate();