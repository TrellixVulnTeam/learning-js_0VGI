// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const deleteButton = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listeners
document.addEventListener('DOMContentLoaded', getLocalTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function renderTodo(content){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo') // add class of "todo"
    // create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = content;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Check mark butotn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // append to todo-list ul
    todoList.appendChild(todoDiv);
}

// functions
function addTodo(event){
    event.preventDefault();
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Create div with content and buttons
    renderTodo(todoInput.value);
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;
    // trash button
    if (item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        deleteLocalTodos(item)
    }
    // Check mark
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;

    todos.forEach(function(td){
        switch(event.target.value){
            case "all":
                td.style.display = 'flex';
                break;
            case "completed":
                console.log(td);
                if (td.classList.contains('completed')){
                    td.style.display = 'flex';
                }else{
                    td.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!td.classList.contains("completed")){
                    td.style.display = 'flex';
                }else{
                    td.style.display = 'none';
                }
                break;
        }
    });
}
function localTodos(){
    // Check if todos already exist in localstorage
    // if not then return an empty array
    let todos;
    if(localStorage.getItem("todos") === null){
        console.log(todo);
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function saveLocalTodos(todo){

    // Check if stuff already exist in local storage
    let todos = localTodos();
    // write to localStorage
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos(){
    // Check if stuff already exist in local storage
    let todos = localTodos();
    // Read from localStorage and render html
    todos.forEach(function(todo){
    // todo Div
        renderTodo(todo);
    });
}

function deleteLocalTodos(item){
    // Delete todos from local storage
    let todos = localTodos();

    todoIndex = item.parentElement.innerText;
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}