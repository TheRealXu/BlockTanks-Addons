let fileInput = document.getElementById("spritesheet")
let frameWidthInput = document.getElementById("frameWidth")
let frameHeightInput = document.getElementById("frameHeight")
let fpsInput = document.getElementById("fps")
let playButton = document.getElementById("play")
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let image = null
let frameWidth = 0
let frameHeight = 0
let fps = 10
let frameIndex = 0
let numFrames = 0
let animationInterval = null

fileInput.addEventListener("change", (event) => {
    let file = event.target.files[0]
    if (file) {
        let reader = new FileReader()
        reader.onload = (e) => {
            image = new Image()
            image.onload = () => {
                canvas.width = Math.min(frameWidth || image.width, 50 * window.innerWidth / 100)
                canvas.height = Math.min(frameHeight || image.height, 50 * window.innerHeight / 100)
            }
            image.src = e.target.result
        }
        reader.readAsDataURL(file)
    }
})

playButton.addEventListener("click", () => {
    if (!image) {
        alert("Please upload a spritesheet first.")
        return
    }

    frameWidth = parseInt(frameWidthInput.value, 10)
    frameHeight = parseInt(frameHeightInput.value, 10)
    fps = parseInt(fpsInput.value, 10)

    if (!frameWidth || !frameHeight || !fps) {
        alert("Please enter valid frame dimensions and FPS.")
        return
    }

    numFrames = Math.floor(image.width / frameWidth)
    frameIndex = 0

    if (animationInterval) {
        clearInterval(animationInterval)
    }

    animationInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(
            image,
            frameIndex * frameWidth, 0, frameWidth, frameHeight,
            0, 0, frameWidth, frameHeight
        )

        frameIndex = (frameIndex + 1) % numFrames
    }, 1000 / fps)
})