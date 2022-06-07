const BASE_URL = 'https://api.thecatapi.com/v1/breeds'

async function getImage(){
    const response = await fetch(`${BASE_URL}`)
    const data = await response.json()
    console.log(data)

    for (let i=0; i < data.length; i++) {
        const grid_item = document.createElement('div')
        grid_item.classList.add("grid-item")
        document.querySelector('.grid-container').appendChild(grid_item)
        const image_container = document.createElement('div')
        image_container.classList.add("image_container")
        const image= document.createElement('img')
        image.classList.add(`image${i+1}`)
        image_container.appendChild(image)
        grid_item.appendChild(image_container)
        const card_body = document.createElement('div')
        card_body.classList.add("card_body")
        const name = document.createElement('p')
        name.classList.add(`name${i+1}`)
        card_body.appendChild(name)
        const line = document.createElement('br')
        card_body.appendChild(line)
        const description = document.createElement('p')
        description.classList.add(`description${i+1}`)
        card_body.appendChild(description)
        grid_item.appendChild(card_body)
        const button = document.createElement('button')
        const buttonText = document.createTextNode('Profile')
        button.appendChild(buttonText)
        grid_item.appendChild(button)
        document.querySelector('.grid-container').appendChild(grid_item)
    
        if (data[i].image === undefined || data[i].image.url === undefined){
            document.querySelector(`.image${i+1}`).src= 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
            document.querySelector(`.name${i+1}`).innerText=data[i].name
            document.querySelector(`.description${i+1}`).innerText=data[i].description
        } else {
            document.querySelector(`.image${i+1}`).src=data[i].image.url
            document.querySelector(`.name${i+1}`).innerText=data[i].name
            document.querySelector(`.description${i+1}`).innerText=data[i].description
        }
    }
}


getImage();
