const canvas = document.querySelector("canvas")
const HEIGHT = 500
const WIDTH = 700
const GRAVITY = 0.8
let pressedLeft = false
let pressedRight = false
canvas.height = HEIGHT
canvas.width = WIDTH
const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

class Platform {
    constructor(x, y, width) {
        this.x = x
        this.y = y
        this.width = width
    }

    render() {
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, this.width, 25)
        ctx.fillStyle = "brown"
        ctx.fillRect(this.x, this.y + 25, this.width, 50)
    }
}

const platform1 = new Platform(0, 425, 300)
platform1.render()

const platform2 = new Platform(600, 425, 100)
platform2.render()

const platform3 = new Platform(365, 325, 100)
platform3.render()

const platform4 = new Platform(465, 250, 100)
platform4.render()

const platform5 = new Platform(500, 100, 200)
platform5.render()

const platform6 = new Platform(300, 125, 100)
platform6.render()

const platform7 = new Platform(100, 150, 100)
platform7.render()

const platforms = [
    platform1,
    platform2,
    platform3,
    platform4,
    platform5,
    platform6,
    platform7
]

function renderPlatforms() {
    platforms.forEach((platform) => {
        platform.render()
    })
}

class Player {
    constructor() {
        this.x = 50
        this.y = 50
        this.height = 50
        this.width = 50
        this.dy = 0
        this.dx = 0
        this.isJumping = false
    }

    render() {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    update() {
        this.x += this.dx
        this.y += this.dy
        this.dy += GRAVITY

        platforms.forEach((platform) => {
            if (this.collide(platform)) {
                this.isJumping = false
                this.y = platform.y - this.height
                this.dy = 0
            }
        })

        this.render()

    }

    collide(platform) {
        if (
            this.y + this.height >= platform.y &&
            this.y <= platform.y &&
            this.x + this.width >= platform.x &&
            this.x <= platform.x + platform.width
        ) {
            return true
        }
        return false
    }
}

const player = new Player()
player.render()

function gameloop() {
    if (pressedLeft) {
        player.dx = -5
    } else if (pressedRight) {
        player.dx = 5
    } else {
        player.dx = 0
    }
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    renderPlatforms()
    player.update()
    requestAnimationFrame(gameloop)
}

requestAnimationFrame(gameloop)

window.addEventListener("keydown", function(e) {
    switch(e.key) {
        case 'ArrowRight':
            pressedRight = true
            break
        case "ArrowLeft":
            pressedLeft = true
            break
        case "ArrowUp":
            if (!player.isJumping) {
                player.dy = -15
                player.isJumping = true
            }
            break
    }
})

window.addEventListener("keyup", function(e) {
    switch(e.key) {
        case 'ArrowRight':
            pressedRight = false
            break
        case "ArrowLeft":
            pressedLeft = false
            break
        case "ArrowUp":
            console.log("Jump")
            break
    }
})