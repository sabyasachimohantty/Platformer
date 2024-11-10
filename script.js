const canvas = document.querySelector("canvas")
canvas.height = innerHeight
canvas.width = innerWidth
const ctx = canvas.getContext("2d")
const gravity = 0.98

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.height = 50
        this.width = 50
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }

    jump() {
        this.velocity.y = -20
    }

    left() {
        this.position.x += -5
        this.draw()
    }
}

const player = new Player()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
    }
    player.update()
}

animate()

window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case "a":
            // left
            keys.left.pressed = true
            break;
        case "d":
            // right
            keys.right.pressed = true
            break;
        case "w":
            // up
            console.log('up')
            player.velocity.y -= 20
            break;
    }
})

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case "a":
            // left
            keys.left.pressed = false
            break;
        case "d":
            // right
            keys.right.pressed = false
            break;
    }
})

