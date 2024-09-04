const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 750
canvas.height = 500

ctx.fillStyle = 'rgb(60,60,60)'
ctx.fillRect(0,0, canvas.width, canvas.height)
function drawCanvas() {
    //canvas
    ctx.fillStyle = 'rgb(60,60,60)'
    ctx.fillRect(0,0, canvas.width, canvas.height)
}
gravity = 0.4
friction = 0.3
class Object {
    constructor ({position,velocity,size}, color, jumpable) {
        this.position = position
        this.velocity = velocity
        this.size = size
        this.color = color
        this.jumpable = jumpable
    }
    draw (){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y,
        this.size.x, this.size.y)
    }
    move() {
        
        //fix_X
        if (this.position.x < 0) {
            this.position.x = 0
        }
        else if(this.position.x + this.size.x > canvas.width) {
            this.position.x = canvas.width - this.size.x
        }
        //velocity_position
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 

        //X_Friction
        if (!key.a.pressed || !key.d.pressed) {
            if (parseInt(this.velocity.x) > 0 && this.position.x + this.size.x < canvas.width) {
                this.velocity.x -= friction
            }
            else if (parseInt(this.velocity.x) < 0 && this.position.x > 0) {
                this.velocity.x += friction
            }
            else    
                this.velocity.x = 0
        }
        else
            this.velocity.x = 0

        //X_Move
        if (key.a.pressed && this.position.x > 0) {
            this.velocity.x = -10
        }
        else if(key.d.pressed && this.position.x + this.size.x < canvas.width ) {
            this.velocity.x = 10
        }
        //Y_Gravity
        if (this.position.y + this.size.y > canvas.height / 2 + 200) {
            this.position.y = canvas.height / 2 + 200 - this.size.y
            this.velocity.y = 0
            this.jumpable = true
        }
        else {
            this.velocity.y += gravity
        }

        //Y_Move
        if (key.w.pressed && this.jumpable) {
            this.velocity.y = -10
            this.jumpable = false
        }
        hit()
    }
    objectMove() {
        //fix_X
        if (this.position.x < 0) {
            this.position.x = 0
        }
        else if(this.position.x + this.size.x > canvas.width) {
            this.position.x = canvas.width - this.size.x
        }

        //velocity_position
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 

        //Y_Gravity
        if (this.position.y + this.size.y > canvas.height / 2 + 200) {
            this.position.y = canvas.height / 2 + 200 - this.size.y
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity
        }
    }
}
const key = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
}
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            key.w.pressed = true
            break;
        case 's':
            key.s.pressed = true
            break;
        case 'a':
            key.a.pressed = true
            break;
        case 'd':
            key.d.pressed = true
            break;
    }
})
window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'w':
            key.w.pressed = false
            break;
        case 's':
            key.s.pressed = false
            break;
        case 'a':
            key.a.pressed = false
            break;
        case 'd':
            key.d.pressed = false
            break;
    }
})
const player = new Object({
    position: {
        x: canvas.width / 2 - 250,
        y: canvas.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    },
    size: {
        x: 50,
        y: 100
    }
}, color = 'wheat', jumpable = false)
const box = new Object({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    },
    size: {
        x: 300,
        y: 50
    }
}, color = 'rgb(100,120,130)', jumpable = false)
const ground = new Object({
    position: {
        x: 0,
        y: canvas.height / 2 + 200
    },
    velocity: {
        x: 0,
        y: 0
    },
    size: {
        x: canvas.width,
        y: 100
    }
}, color = 'rgb(150,150,150)', jumpable = false)
const hitDir = {
    left: false,
    right: false,
    down: false
}
function hit() {
    //bottom
    if (player.position.y < box.position.y
        && player.position.y + player.size.y > box.position.y
        && player.position.x < box.position.x + box.size.x
        && player.position.x + player.size.x > box.position.x) {
        player.velocity.y = 0
    }
    //top
    else if (player.position.y > box.position.y
        && player.position.y + player.size.y > box.position.y + box.size.y
        && player.position.x < box.position.x + box.size.x
        && player.position.x + player.size.x > box.position.x) {
        player.velocity.y = 0
        player.position.y = box.position.y + box.size.y 
        
    }
    console.log(player.position.x < box.x + box.size.x)
}
function animate() {
    window.requestAnimationFrame(animate)
    drawCanvas()
    console.log()
    player.draw()
    player.move()

    box.draw()
    box.objectMove()
    
    console.log()

    ground.draw()  
}
animate()