const canvas = document.querySelector("canvas")
const HEIGHT = 500
const WIDTH = 700
const GRAVITY = 0.8
let pressedLeft = false
let pressedRight = false
canvas.height = HEIGHT
canvas.width = WIDTH
const key_img = new Image()
key_img.src = "./assets/key.png"
const coin_img = new Image()
coin_img.src = "./assets/coin.png"
const door_img = new Image()
door_img.src = "./assets/door.png"
let coinCollected = false
let keyCollected = false
const jump_sound = new Audio("./assets/audio/jump.mp3")
const fall_sound = new Audio("./assets/audio/fall.mp3")
const coinPickup_sound = new Audio("./assets/audio/coin_pickup.mp3")
const win_sound = new Audio("./assets/audio/win.mp3")


const ctx = canvas.getContext("2d")
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

class Item {
    constructor(src, x, y, width, height) {
        this.src = src
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    render() {
        ctx.drawImage(this.src, this.x, this.y, this.width, this.height)
    }
}

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
        this.y = 375
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
            this.y < platform.y &&
            this.x + this.width >= platform.x &&
            this.x <= platform.x + platform.width && 
            this.dy >= 0
        ) {
            return true
        }
        return false
    }
}

const player = new Player()
player.render()
const coin = new Item(coin_img, 130, 90, 50, 50)
const key = new Item(key_img, 650, 50, 25, 50)
const door = new Item(door_img, 600, 325, 100, 100)

function collison(object) {
    if (
        player.x + player.width < object.x ||
        player.x > object.x + object.width ||
        player.y + player.height < object.y ||
        player.y > object.y + object.height
    ) {
        return false
    } else {
        return true
    }
}

function restart() {
    player.x = 50
    player.y = 375
    coinCollected = false
    keyCollected = false
}

function gameloop() {
    if (pressedLeft) {
        player.dx = -5
    } else if (pressedRight) {
        player.dx = 5
    } else {
        player.dx = 0
    }

    if (collison(coin)) {
        coinCollected = true
        coinPickup_sound.play()
    }
    if (collison(key) && coinCollected) {
        keyCollected = true
        coinPickup_sound.play()
    }
    if (collison(door) && keyCollected) {
        win_sound.play()
        window.alert("You won")
        restart()
    }
    if (player.y >= canvas.height) {
        fall_sound.play()
        restart()
    }

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    renderPlatforms()
    if (!coinCollected) coin.render()
    if (!keyCollected) key.render()
    door.render()
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
                jump_sound.play()
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