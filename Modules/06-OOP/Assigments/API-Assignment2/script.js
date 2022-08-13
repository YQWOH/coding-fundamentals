async function getUser(endpoint) {
    const response = await fetch(endpoint)
    const data= await response.json()
    let img = data.avatar_url
    let name = data.name
    let intro = data.bio
    let joindate = new Date(data.created_at)
    const date = joindate.getDate()
    const month = joindate.toLocaleString('default', { month: 'long' });
    const year = joindate.getFullYear()
    let content = document.querySelector("#content")
    content.innerHTML = `
    <div class="image_container">
        <img src="${img}">
    </div>
    <div class="detail_container">
        <h2>${name}</h2>
        <br/><br/>
        <p>${intro}</p>
        <br/><br/>
        <p>Joined at:${date + " " + month + " " + year}</p>
        <br/><br/>
    </div>
    `
}

let button = document.querySelector("#button")
button.addEventListener("click", function(e){
    let name = e.target.parentNode.querySelector("#user").value
    let username = name.split(" ").join("")
    let endpoint = `https://api.github.com/users/${username}`
    getUser(endpoint)
})
