const prompt = require("prompt-sync")();
let todolist = {
    indexlist: [],
    description: [],
    status: [],
    printResult: function() {
        for (let i = 0; i < this.description.length; i++) {
            console.log(`#${this.indexlist[i]} - ${this.description[i]} ${this.status[i]}`)
        }
    }
}
let checkmark = "\u2705"
let cross = "\u274C"

const question = 
`

--------- TODO APP----------    
What would you like to do?
1  View my todo list
2  Add new todo
3  Edit a todo item
4  Toggle complete a todo
5  Delete a todo
6  Quit app

`
console.log(question)
let a = prompt(
    `Enter (1/2/3/4/5/6):`
).toString()


while (a !== "6") {
    if (a==="1") {
        if (todolist.description.length === 0) {
            console.log("You have 0 todo!")
        } else {
            todolist.printResult();
        }
        console.log(question)
        a = prompt(
            `Enter (1/2/3/4/5/6):`
        ).toString()
    } else if (a==="2") {
        let task = prompt(
            `Enter your task:`
        ).toString()
        todolist.description.push(task)
        todolist.indexlist.push(todolist.indexlist.length+1)
        todolist.status.push(cross);
        console.log(question)
        a = prompt(
            `Enter (1/2/3/4/5/6):`
        ).toString()
    } else if (a==="3") {
        let editId = prompt(
            `Enter the todo id you want to edit: `
        ).toString()
        while (editId <0 || editId > todolist.description.length ) {
            console.log("The id that you entered is not inside the todo id list")
            editId = prompt(
                `Enter the todo id you want to edit: `
            ).toString()
        }
        if (editId > 0 && editId <= todolist.description.length) {
            let editDescription = prompt(
                `Change the todo item to: `
            ).toString()
            todolist.description[editId-1] = editDescription
        } 
        console.log(question)
        a = prompt(
            `Enter (1/2/3/4/5/6):`
        ).toString()
    } else if (a==="4") {
        let toggleId = prompt(
            `Enter the todo id you want to toggle complete: `
        ).toString()
        if (todolist.status[toggleId-1] === cross) {
            todolist.status[toggleId-1] = checkmark
        } else {
            console.log(`The todo id ${toggleId} already completed.`)
        }
        console.log(question)
        a = prompt(
            `Enter (1/2/3/4/5/6):`
        ).toString()
    } else if (a==="5") {
        let deleteId = parseInt(prompt(
            `Enter the todo id you want to delete:`
        ))
        todolist.description.splice(deleteId-1,1)
        todolist.status.splice(deleteId-1,1)
        todolist.indexlist = []
        for (let i = 0; i < todolist.description.length; i++) {
            todolist.indexlist[i]=i+1
        } 
        console.log(question)
        a = prompt(
            `Enter (1/2/3/4/5/6):`
        ).toString()
    } else if (a==="6") {
        return
    } else {
        console.log("Then number that you have entered is out of the range.")
        console.log(question)
        a = prompt(
            `Enter (1/2/3/4/5/6):`
        ).toString()
    }
}
