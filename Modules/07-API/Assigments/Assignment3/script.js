// https  https://gist.github.com/6cd28c8d8d102f39db343a22ebdf443d.git 

const endpoint = "https://api.github.com/gists/6cd28c8d8d102f39db343a22ebdf443d"

let user = document.querySelector("#user")
user.addEventListener("click", ()=> 
{
   getUserData()

})


async function getUserData() {
    let response = await fetch(endpoint)
    console.log(response)
    let data = await response.json()
    console.log(data.files["me.json"].content)
    let userData = JSON.parse(data.files["me.json"].content)
    console.log(userData.name)
    let userName = document.createElement("h2")
    userName.innerHTML = `
    Name: <span id="name">${userData.name}</span>
    `
    document.querySelector("#gist").appendChild(userName)

    let age = document.createElement("p")
    age.innerHTML = `
    Age: <span id="age">${userData.age}</span>
    `
    document.querySelector("#gist").appendChild(age)

    // document.querySelector("#name").innerText = userData.name
    // document.querySelector("#age").innerText = userData.age
    let hobbies = userData.hobbies
    let hobbyList = document.createElement("ul")
    hobbies.forEach((hobby) => {
        console.log(hobby)
        let hobbyItem = document.createElement("li")
        hobbyItem.innerText=hobby
        hobbyList.append(hobbyItem)
    })
    document.querySelector("#gist").appendChild(hobbyList)
}

