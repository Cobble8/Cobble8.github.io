const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

const colors = [
    "#FF0000",
    "#FF7B00",
    "#FFDD00",
]
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
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



function Particle2(x, y, radius) {
    this.x = x;
    this.r = 125;
    this.g = 125;
    this.b = 240;
    this.y = y;
    this.counter = 0;
    this.interval = 0;
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
    }
    this.radius = radius;
    this.color = `rgb(${this.r}, ${this.g}, ${this.b})`
    this.mass = 1;
    this.update = function(particles2) {
        for(let i = 0; i < particles2.length; i++) {
            if(this == particles2[i]) continue;

            //Interval
            this.interval += 1;
            if(this.interval == 25) this.interval = 0;
            if(this.interval == 1) {

            //Counter
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
            }

            if(distance(this.x, this.y, particles2[i].x, particles2[i].y) - this.radius * 2 < 0) {
                resolveCollision(this, particles2[i]);
            }
            if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
                this.velocity.x = -this.velocity.x
            }
            if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
                this.velocity.y = -this.velocity.y;
            }


            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill();
        //c.lineWidth = '4'
        c.closePath();
    }

}

function distance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))

}


//Init
let particles2;
function init() {
    particles2 = [];
    //let Colors = ['#00FF00', '#FAA916', '#1AFFD5', '#58FAF4', '#FE2E2E', '#FF00FF', '#FFFF00']


    for(let i = 0; i < 13; i++) {
        const radius = 30;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        //const color = Colors[Math.floor(Math.random() * Colors.length)]//'#00FF00';

        if(i != 0) {
            for(let j = 0; j < particles2.length; j++) {
                if(distance(x, y, particles2[j].x, particles2[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    j = -1;
                }
                
            }
        }


        particles2.push(new Particle2(x, y, radius));
    }



}




init()

addEventListener('click',function() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    init();
})
//Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.30)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles2.forEach(particle => {
        particle.update(particles2);
    });

};
animate();