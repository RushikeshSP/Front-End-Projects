const inputText = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-list");

function addToList(){
    if(inputText.value == ''){
        window.alert("Please Write Someting to add");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputText.value;
        todoList.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputText.value = '';
    saveData();
}

todoList.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",todoList.innerHTML);
}

function showData(){
    todoList.innerHTML = localStorage.getItem("data");
}

showData();