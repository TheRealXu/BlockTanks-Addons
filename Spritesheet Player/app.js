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

function setCanvasResolution() {
    let cssWidth = canvas.offsetWidth
    let cssHeight = canvas.offsetHeight
    let scale = window.devicePixelRatio || 1

    canvas.width = cssWidth * scale
    canvas.height = cssHeight * scale

    ctx.scale(scale, scale)
}

fileInput.addEventListener("change", event => {
    let file = event.target.files[0]
    if (file) {
        let reader = new FileReader()
        reader.onload = e => {
            image = new Image()
            image.onload = () => {

                setCanvasResolution()
            }
            image.src = e.target.result
        }
        reader.readAsDataURL(file)
    }
})

playButton.addEventListener("click", () => {
    if (!image) {
        alert("Please upload a spritesheet first")
        return
    }

    frameWidth = parseInt(frameWidthInput.value, 10)
    frameHeight = parseInt(frameHeightInput.value, 10)
    fps = parseInt(fpsInput.value, 10)

    if (!frameWidth || !frameHeight || !fps) {
        alert("Please enter valid frame dimensions and FPS")
        return
    }

    numFrames = Math.floor(image.width / frameWidth)
    frameIndex = 0

    if (animationInterval) {
        clearInterval(animationInterval)
    }

    animationInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        let canvasWidth = canvas.offsetWidth
        let canvasHeight = canvas.offsetHeight
        let scaleX = canvasWidth / frameWidth
        let scaleY = canvasHeight / frameHeight
        let scale = Math.min(scaleX, scaleY)

        let scaledWidth = frameWidth * scale
        let scaledHeight = frameHeight * scale
        let offsetX = (canvasWidth - scaledWidth) / 2
        let offsetY = (canvasHeight - scaledHeight) / 2

        ctx.drawImage(
            image,
            frameIndex * frameWidth, 0, frameWidth, frameHeight,
            offsetX, offsetY, scaledWidth, scaledHeight
        )

        frameIndex = (frameIndex + 1) % numFrames
    }, 1000 / fps)
})