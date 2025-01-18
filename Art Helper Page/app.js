let categories = ["sticker", "arm", "decal"]
let totalImages = 1000
let baseUrl = "https://blocktanks.net/assets/items/"
let container = document.getElementById("imageContainer")
function loadCategory(category) {
    let categoryDiv = document.createElement("div")
    categoryDiv.className = "category"
    let title = document.createElement("div")
    title.className = "category-title"
    title.innerText = category.charAt(0).toUpperCase() + category.slice(1)
    let grid = document.createElement("div")
    grid.className = "image-grid"
    categoryDiv.appendChild(title)
    categoryDiv.appendChild(grid)
    container.appendChild(categoryDiv)
    for (let i = 0; i <= totalImages; i++) {
        let imageUrl = `${baseUrl}${category}/${i}.png`
        let card = document.createElement("div")
        card.className = "image-card"
        let img = new Image()
        img.src = imageUrl
        img.alt = `${category} ${i}`
        img.onload = () => {
        	let button = document.createElement("button")
            button.innerText = "Download"
            button.onclick = () => {
            	let a = document.createElement("a")
                a.href = imageUrl
                a.download = `${category}-${i}.png`
                a.click()
            }
            card.appendChild(img)
            card.appendChild(button)
            card.style.display = "flex"
        }
        img.onerror = () => {
        	card.remove()
        }
        grid.appendChild(card)
    }
}
categories.forEach(loadCategory)