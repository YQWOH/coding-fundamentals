const todoArr = [];
getTodo();
console.log(todoArr);
sortArr = todoArr.sort((a, b) => b.rating - a.rating);

window.addEventListener('load', function() {
    let close = document.getElementsByClassName("close");
    let undo = document.getElementsByClassName("undo");
    if (sortArr.length > 0) {
        sortArr.forEach(todo => {
            let li = document.createElement("li");
            li.classList.add("todo");
            if(todo.completed) {
                li.classList.add("checked");
            }
            let input = todo.name;
            let text = document.createTextNode(input);
            li.appendChild(text);
            document.getElementById("myUL").appendChild(li);
            let span=document.createElement("span");
            let cross=document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(cross);
            li.appendChild(span)
            span2=document.createElement("span");
            let star=document.createTextNode(("⭐").repeat(todo.rating));
            span2.className = "star";
            span2.appendChild(star);
            li.appendChild(span2);
            if (todo.deleted) {
                li.style.display = "none";

                let li_deleted = document.createElement("li");
                li_deleted.classList.add("todo");
                if(todo.completed) {
                    li_deleted.classList.add("checked");
                }
                let input_deleted = todo.name;
                let text_deleted = document.createTextNode(input_deleted);
                li_deleted.appendChild(text_deleted);
                // document.getElementById("deleted-to-do").style.marginTop = "50px";
                document.getElementById("deleted-to-do").appendChild(li_deleted);
                let span_deleted=document.createElement("span");
                let undo_deleted=document.createTextNode("undo");
                span_deleted.className = "undo";
                span_deleted.appendChild(undo_deleted);
                li_deleted.appendChild(span_deleted)
                span2_deleted=document.createElement("span");
                let star_deleted=document.createTextNode(("⭐").repeat(todo.rating));
                span2_deleted.className = "star";
                span2_deleted.appendChild(star_deleted);
                li_deleted.appendChild(span2_deleted);

                for (let i=0; i<undo.length; i++) {
                    undo[i].addEventListener("click", 
                        function(ev){ 
                            // let div=this.parentElement;
                            console.log("ev.target: ", ev.target);
                            // console.log("div.textContent.split: ", div);
                            let index = sortArr.findIndex(x => x.name === ev.target.parentElement.textContent.split("undo")[0].toString());
                            console.log("index: ", index);
                            if (index !== -1) {
                                sortArr[index].deleted = false;
                                // div.style.display = "none";
                                saveEvents();
                                console.log(document.querySelector("#deleted-to-do"));
                                console.log(ev.target.parentElement);
                                document.querySelector("#deleted-to-do").removeChild(ev.target.parentElement);
                                let ulDel = document.querySelector("#deleted-to-do");
                                let lisDel = Array.prototype.slice.call(ulDel.children);
                                lisDel.sort(function(a, b) {
                                    let aStar = parseInt(count(a.querySelector(".star").textContent));
                                    let bStar = parseInt(count(b.querySelector(".star").textContent));
                                    return bStar - aStar;
                                });
                                while (ulDel.firstChild) {
                                    ulDel.removeChild(ulDel.firstChild);
                                }
                                lisDel.forEach(function(liDel) {
                                    ulDel.appendChild(liDel);
                                });
                                console.log("myUL child: ", document.querySelector("#myUL").children);
                                Array.from(document.querySelector("#myUL").children).forEach(child => {
                                    if (child.textContent.split(/[\u00D7\u2605]/)[0] === ev.target.parentElement.textContent.split("undo")[0]) {
                                        child.style.display = "list-item";
                                    }
                                })
                                let ul = document.getElementById("myUL");
                                let lis = Array.prototype.slice.call(ul.children);
                                lis.sort(function(a, b) {
                                    let aStar = parseInt(count(a.querySelector(".star").textContent));
                                    let bStar = parseInt(count(b.querySelector(".star").textContent));
                                    return bStar - aStar;
                                });
                                while (ul.firstChild) {
                                    ul.removeChild(ul.firstChild);
                                }
                                lis.forEach(function(li) {
                                    ul.appendChild(li);
                                });
                                // document.querySelector("#deleted-to-do").remove(div);
                            }
                    });
                }
            }
        })

        for (let i=0; i<close.length; i++) {
            close[i].addEventListener("click", 
                function(){ 
                    let div=this.parentElement;
                    console.log("div: ", div);
                    let index = sortArr.findIndex(x => x.name === div.textContent.split(/[\u00D7\u2605]/)[0].toString());
                    console.log("index: ", index);
                    if (index !== -1) {
                        sortArr[index].deleted = true;
                        div.style.display = "none";
                        saveEvents();

                        let duplicate = Array.from(document.getElementById("deleted-to-do").children).findIndex(x => x.textContent.split("undo")[0] === div.textContent.split(/[\u00D7\u2605]/)[0]);
                        if (duplicate === -1) {
                            let li_deleted = document.createElement("li");
                            li_deleted.classList.add("todo");
                            if(sortArr[index].completed) {
                                li_deleted.classList.add("checked");
                            }
                            let input_deleted = sortArr[index].name;
                            let text_deleted = document.createTextNode(input_deleted);
                            li_deleted.appendChild(text_deleted);
                            // document.getElementById("deleted-to-do").style.marginTop = "50px";
                            document.getElementById("deleted-to-do").appendChild(li_deleted);
                            let span_deleted=document.createElement("span");
                            let undo_deleted=document.createTextNode("undo");
                            span_deleted.className = "undo";
                            span_deleted.appendChild(undo_deleted);
                            li_deleted.appendChild(span_deleted)
                            span2_deleted=document.createElement("span");
                            let star_deleted=document.createTextNode(("⭐").repeat(sortArr[index].rating));
                            span2_deleted.className = "star";
                            span2_deleted.appendChild(star_deleted);
                            li_deleted.appendChild(span2_deleted);
                            let ulDel = document.querySelector("#deleted-to-do");
                            let lisDel = Array.prototype.slice.call(ulDel.children);
                            lisDel.sort(function(a, b) {
                                let aStar = parseInt(count(a.querySelector(".star").textContent));
                                let bStar = parseInt(count(b.querySelector(".star").textContent));
                                return bStar - aStar;
                            });
                            while (ulDel.firstChild) {
                                ulDel.removeChild(ulDel.firstChild);
                            }
                            lisDel.forEach(function(liDel) {
                                ulDel.appendChild(liDel);
                            });
                        }
                        
                        let undo = document.getElementsByClassName("undo");
                        for (let i=0; i<undo.length; i++) {
                            undo[i].addEventListener("click", 
                                function(ev){ 
                                    // let div=this.parentElement;
                                    console.log("ev.target: ", ev.target);
                                    // console.log("div.textContent.split: ", div);
                                    let index = sortArr.findIndex(x => x.name === ev.target.parentElement.textContent.split("undo")[0].toString());
                                    console.log("index: ", index);
                                    if (index !== -1) {
                                        sortArr[index].deleted = false;
                                        // div.style.display = "none";
                                        saveEvents();
                                        console.log(document.querySelector("#deleted-to-do"));
                                        console.log("ev.target.parentElement: ", ev.target.parentElement);
                                        document.querySelector("#deleted-to-do").removeChild(ev.target.parentElement);
                                        let ulDel = document.querySelector("#deleted-to-do");
                                        let lisDel = Array.prototype.slice.call(ulDel.children);
                                        lisDel.sort(function(a, b) {
                                            let aStar = parseInt(count(a.querySelector(".star").textContent));
                                            let bStar = parseInt(count(b.querySelector(".star").textContent));
                                            return bStar - aStar;
                                        });
                                        while (ulDel.firstChild) {
                                            ulDel.removeChild(ulDel.firstChild);
                                        }
                                        lisDel.forEach(function(liDel) {
                                            ulDel.appendChild(liDel);
                                        });
                                        console.log("myUL child: ", document.querySelector("#myUL").children);
                                        Array.from(document.querySelector("#myUL").children).forEach(child => {
                                            if (child.textContent.split(/[\u00D7\u2605]/)[0] === ev.target.parentElement.textContent.split("undo")[0]) {
                                                child.style.display = "list-item";
                                            }
                                        })
                                        let ul = document.getElementById("myUL");
                                        let lis = Array.prototype.slice.call(ul.children);
                                        lis.sort(function(a, b) {
                                            let aStar = parseInt(count(a.querySelector(".star").textContent));
                                            let bStar = parseInt(count(b.querySelector(".star").textContent));
                                            return bStar - aStar;
                                        });
                                        while (ul.firstChild) {
                                            ul.removeChild(ul.firstChild);
                                        }
                                        lis.forEach(function(li) {
                                            ul.appendChild(li);
                                        });
                                        // document.querySelector("#deleted-to-do").remove(div);
                                    }
                            });
                        }
                    }
            });
        }
    }
});




let items=document.querySelectorAll("li");
        for (let i=0; i<items.length; i++){
            let span=document.createElement("span");
            let cross=document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(cross);
            items[i].appendChild(span);
        }
        for (let i=0; i<close.length; i++) {
            close[i].addEventListener("click", 
                function(){ 
                    let div=this.parentElement;
                    console.log("div: ", div);
                    let index = sortArr.findIndex(x => x.name === div.textContent.split(/[\u00D7\u2605]/)[0].toString());
                    console.log("index: ", index);
                    if (index !== -1) {
                        sortArr[index].deleted = true;
                        div.style.display = "none";
                        saveEvents();

                        let duplicate = Array.from(document.getElementById("deleted-to-do").children).findIndex(x => x.textContent.split("undo")[0] === div.textContent.split(/[\u00D7\u2605]/)[0]);
                        if (duplicate === -1) {
                            let li_deleted = document.createElement("li");
                            li_deleted.classList.add("todo");
                            if(sortArr[index].completed) {
                                li_deleted.classList.add("checked");
                            }
                            let input_deleted = sortArr[index].name;
                            let text_deleted = document.createTextNode(input_deleted);
                            li_deleted.appendChild(text_deleted);
                            // document.getElementById("deleted-to-do").style.marginTop = "50px";
                            document.getElementById("deleted-to-do").appendChild(li_deleted);
                            let span_deleted=document.createElement("span");
                            let undo_deleted=document.createTextNode("undo");
                            span_deleted.className = "undo";
                            span_deleted.appendChild(undo_deleted);
                            li_deleted.appendChild(span_deleted)
                            span2_deleted=document.createElement("span");
                            let star_deleted=document.createTextNode(("⭐").repeat(sortArr[index].rating));
                            span2_deleted.className = "star";
                            span2_deleted.appendChild(star_deleted);
                            li_deleted.appendChild(span2_deleted);
                            let ulDel = document.querySelector("#deleted-to-do");
                            let lisDel = Array.prototype.slice.call(ulDel.children);
                            lisDel.sort(function(a, b) {
                                let aStar = parseInt(count(a.querySelector(".star").textContent));
                                let bStar = parseInt(count(b.querySelector(".star").textContent));
                                return bStar - aStar;
                            });
                            while (ulDel.firstChild) {
                                ulDel.removeChild(ulDel.firstChild);
                            }
                            lisDel.forEach(function(liDel) {
                                ulDel.appendChild(liDel);
                            });
                        }
                        
                        let undo = document.getElementsByClassName("undo");
                        for (let i=0; i<undo.length; i++) {
                            undo[i].addEventListener("click", 
                                function(ev){ 
                                    // let div=this.parentElement;
                                    console.log("ev.target: ", ev.target);
                                    // console.log("div.textContent.split: ", div);
                                    let index = sortArr.findIndex(x => x.name === ev.target.parentElement.textContent.split("undo")[0].toString());
                                    console.log("index: ", index);
                                    if (index !== -1) {
                                        sortArr[index].deleted = false;
                                        // div.style.display = "none";
                                        saveEvents();
                                        console.log(document.querySelector("#deleted-to-do"));
                                        console.log("ev.target.parentElement: ", ev.target.parentElement);
                                        document.querySelector("#deleted-to-do").removeChild(ev.target.parentElement);
                                        let ulDel = document.querySelector("#deleted-to-do");
                                        let lisDel = Array.prototype.slice.call(ulDel.children);
                                        lisDel.sort(function(a, b) {
                                            let aStar = parseInt(count(a.querySelector(".star").textContent));
                                            let bStar = parseInt(count(b.querySelector(".star").textContent));
                                            return bStar - aStar;
                                        });
                                        while (ulDel.firstChild) {
                                            ulDel.removeChild(ulDel.firstChild);
                                        }
                                        lisDel.forEach(function(liDel) {
                                            ulDel.appendChild(liDel);
                                        });
                                        console.log("myUL child: ", document.querySelector("#myUL").children);
                                        Array.from(document.querySelector("#myUL").children).forEach(child => {
                                            if (child.textContent.split(/[\u00D7\u2605]/)[0] === ev.target.parentElement.textContent.split("undo")[0]) {
                                                child.style.display = "list-item";
                                            }
                                        })
                                        let ul = document.getElementById("myUL");
                                        let lis = Array.prototype.slice.call(ul.children);
                                        lis.sort(function(a, b) {
                                            let aStar = parseInt(count(a.querySelector(".star").textContent));
                                            let bStar = parseInt(count(b.querySelector(".star").textContent));
                                            return bStar - aStar;
                                        });
                                        while (ul.firstChild) {
                                            ul.removeChild(ul.firstChild);
                                        }
                                        lis.forEach(function(li) {
                                            ul.appendChild(li);
                                        });
                                        // document.querySelector("#deleted-to-do").remove(div);
                                    }
                            });
                        }
                    }
            });
        }

        var list = document.querySelector('ul');
        list.addEventListener('click', function(ev) {
            if (ev.target.tagName === 'LI') {
                ev.target.classList.toggle('checked');
                console.log("ev.target: ", ev.target);
                let index = sortArr.findIndex(x => x.name === ev.target.textContent.split(/[\u00D7\u2605]/)[0].toString());
                console.log("index: ", index);
                if (index !== -1) {
                    sortArr[index].completed = !sortArr[index].completed;
                }
                console.log("sortArr: ", sortArr);
                saveEvents();
            }
        }, false);

document.querySelector("#add").addEventListener("click", 
    function newItem(){ 
        let input = document.getElementById("userinput").value;
        let uniqueIndex = sortArr.findIndex(x => x.name === input);
        console.log("uniqueIndex: ", uniqueIndex);
        if (uniqueIndex === -1) {
            let li = document.createElement("li");
            let text = document.createTextNode(input);
            li.appendChild(text);
            if(input === "") {
                alert("Please type someting");
            } else {
                document.getElementById("myUL").appendChild(li);
            }
            let span=document.createElement("span");
            let cross=document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(cross);
            li.appendChild(span);
            span2=document.createElement("span");
            let star=document.createTextNode(("⭐").repeat(document.querySelector("#rating").value));
            // console.log("rating: ", ("⭐").repeat(document.querySelector("#rating").value));
            span2.className = "star";
            span2.appendChild(star);
            li.appendChild(span2);
            let ul = document.getElementById("myUL");
            let lis = Array.prototype.slice.call(ul.children);
            lis.sort(function(a, b) {
                let aStar = parseInt(count(a.querySelector(".star").textContent));
                let bStar = parseInt(count(b.querySelector(".star").textContent));
                return bStar - aStar;
            });
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            lis.forEach(function(li) {
                ul.appendChild(li);
            });
            let index = sortArr.length;
            sortArr.push(
                {
                    id: sortArr.length + 1,
                    name: input,
                    rating: document.querySelector("#rating").value,
                    completed: false,
                    deleted: false
                }
            )
            let close = document.getElementsByClassName("close");
            for (let i=0; i<close.length; i++) {
                close[i].addEventListener("click", 
                    function(){ 
                        let div=this.parentElement;
                        console.log("div: ", div);
                        let index = sortArr.findIndex(x => x.name === div.textContent.split(/[\u00D7\u2605]/)[0].toString());
                        console.log("index: ", index);
                        if (index !== -1) {
                            sortArr[index].deleted = true;
                            div.style.display = "none";
                            saveEvents();

                            let duplicate = Array.from(document.getElementById("deleted-to-do").children).findIndex(x => x.textContent.split("undo")[0] === div.textContent.split(/[\u00D7\u2605]/)[0]);
                            if (duplicate === -1) {
                                let li_deleted = document.createElement("li");
                                li_deleted.classList.add("todo");
                                if(sortArr[index].completed) {
                                    li_deleted.classList.add("checked");
                                }
                                let input_deleted = sortArr[index].name;
                                let text_deleted = document.createTextNode(input_deleted);
                                li_deleted.appendChild(text_deleted);
                                // document.getElementById("deleted-to-do").style.marginTop = "50px";
                                document.getElementById("deleted-to-do").appendChild(li_deleted);
                                let span_deleted=document.createElement("span");
                                let undo_deleted=document.createTextNode("undo");
                                span_deleted.className = "undo";
                                span_deleted.appendChild(undo_deleted);
                                li_deleted.appendChild(span_deleted)
                                span2_deleted=document.createElement("span");
                                let star_deleted=document.createTextNode(("⭐").repeat(sortArr[index].rating));
                                span2_deleted.className = "star";
                                span2_deleted.appendChild(star_deleted);
                                li_deleted.appendChild(span2_deleted);

                                let ulDel = document.querySelector("#deleted-to-do");
                                let lisDel = Array.prototype.slice.call(ulDel.children);
                                lisDel.sort(function(a, b) {
                                    let aStar = parseInt(count(a.querySelector(".star").textContent));
                                    let bStar = parseInt(count(b.querySelector(".star").textContent));
                                    return bStar - aStar;
                                });
                                while (ulDel.firstChild) {
                                    ulDel.removeChild(ulDel.firstChild);
                                }
                                lisDel.forEach(function(liDel) {
                                    ulDel.appendChild(liDel);
                                });
                            }
                            
                            let undo = document.getElementsByClassName("undo");
                            for (let i=0; i<undo.length; i++) {
                                undo[i].addEventListener("click", 
                                    function(ev){ 
                                        // let div=this.parentElement;
                                        console.log("ev.target: ", ev.target);
                                        // console.log("div.textContent.split: ", div);
                                        let index = sortArr.findIndex(x => x.name === ev.target.parentElement.textContent.split("undo")[0].toString());
                                        console.log("index: ", index);
                                        if (index !== -1) {
                                            sortArr[index].deleted = false;
                                            // div.style.display = "none";
                                            saveEvents();
                                            console.log(document.querySelector("#deleted-to-do"));
                                            console.log("ev.target.parentElement: ", ev.target.parentElement);
                                            document.querySelector("#deleted-to-do").removeChild(ev.target.parentElement);
                                            let ulDel = document.querySelector("#deleted-to-do");
                                            let lisDel = Array.prototype.slice.call(ulDel.children);
                                            lisDel.sort(function(a, b) {
                                                let aStar = parseInt(count(a.querySelector(".star").textContent));
                                                let bStar = parseInt(count(b.querySelector(".star").textContent));
                                                return bStar - aStar;
                                            });
                                            while (ulDel.firstChild) {
                                                ulDel.removeChild(ulDel.firstChild);
                                            }
                                            lisDel.forEach(function(liDel) {
                                                ulDel.appendChild(liDel);
                                            });
                                            console.log("myUL child: ", document.querySelector("#myUL").children);
                                            Array.from(document.querySelector("#myUL").children).forEach(child => {
                                                if (child.textContent.split(/[\u00D7\u2605]/)[0] === ev.target.parentElement.textContent.split("undo")[0]) {
                                                    child.style.display = "list-item";
                                                }
                                            })
                                            let ul = document.getElementById("myUL");
                                            let lis = Array.prototype.slice.call(ul.children);
                                            lis.sort(function(a, b) {
                                                let aStar = parseInt(count(a.querySelector(".star").textContent));
                                                let bStar = parseInt(count(b.querySelector(".star").textContent));
                                                return bStar - aStar;
                                            });
                                            while (ul.firstChild) {
                                                ul.removeChild(ul.firstChild);
                                            }
                                            lis.forEach(function(li) {
                                                ul.appendChild(li);
                                            });
                                            // document.querySelector("#deleted-to-do").remove(div);
                                        }
                                });
                            }
                        }
                });
            }
            
        }
        saveEvents();
    }
)

function count(textContent) {
    let count = 0;
    for (let i = 0; i < textContent.length; i++) {
      if (textContent.charAt(i) === "⭐") {
        count++;
      }
    }
    return count;
}


//function to save events in local storage
function saveEvents() {
    localStorage.setItem("todo", JSON.stringify(todoArr));
  }
  
  //function to get events from local storage
function getTodo() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem("todo") === null) {
      return;
    }
    todoArr.push(...JSON.parse(localStorage.getItem("todo")));
}