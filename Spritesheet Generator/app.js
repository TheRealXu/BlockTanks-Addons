document.getElementById("fileInput").addEventListener("change", async function (event) {
	let files = Array.from(event.target.files)
    if (files.length === 0) return
	files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })) 
    
	let images = await Promise.all(
		files.map(file => new Promise((resolve, reject) => {
        	let img = new Image() 
        	img.onload = () => resolve({ img, width: img.width, height: img.height }) 
        	img.onerror = reject 
        	img.src = URL.createObjectURL(file) 
    	}))
	) 

	let totalWidth = images.reduce((sum, { width }) => sum + width, 0) 
	let maxHeight = Math.max(...images.map(({ height }) => height)) 
	let canvas = document.getElementById("spritesheetCanvas")

	canvas.width = totalWidth 
	canvas.height = maxHeight 

	let ctx = canvas.getContext("2d") 

	let xOffset = 0 

	for (let { img, width, height } of images) {
		ctx.drawImage(img, xOffset, 0, width, height)
		xOffset += width 
	}

	let container = document.querySelector(".canvas-container") 

	canvas.style.height = `${container.clientHeight}px`
	canvas.style.width = "auto"

	let link = document.getElementById("downloadLink") 

	link.style.display = "block" 
	link.href = canvas.toDataURL("image/png") 
	link.download = "spritesheet.png" 
	link.textContent = "Download Spritesheet" 
}) 