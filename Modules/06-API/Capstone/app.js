const BASE_URL = 'https://api.quotable.io/random'

async function getQuote(){
    const response = await fetch(`${BASE_URL}`)
    const data = await response.json()
    const author = document.querySelector('.author_name')
    author.innerText = JSON.stringify(data.author).slice(1,-1)
    const quote = document.querySelector('.quote')
    quote.innerText =JSON.stringify(data.content).slice(1,-1)
    console.log(data)
} 

getQuote();