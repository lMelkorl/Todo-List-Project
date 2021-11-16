// Elementleri seçme
const form = document.querySelector("#form");
const todoinput = document.querySelector("#Add-todo-input");
const todolist = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clearbtn");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",LoadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodoFromUI);
    filter.addEventListener("keyup",SearchFilter);
    clearButton.addEventListener("click",clearAllTodos);
}

function addTodo(e){
    const newTodo = todoinput.value.trim();
    
    if(todoinput.value == ""){
        showAlert("danger","Please enter a todo...");
    }
    else{
        addTodoToUI(newTodo);
        AddTodoToStorage(newTodo);
        successtodo("success","Todo added successfully.");
    }

    e.preventDefault();
}

function clearAllTodos(){
 if(confirm("Are you sure you want to delete all?")){
    while(todolist.firstElementChild != null){
       todolist.removeChild(todolist.firstElementChild);
   }
   localStorage.removeItem("todos");
}
   
}

function SearchFilter(e){
    const filtervalue = e.target.value.toLowerCase();
    const listitemsgroup = document.querySelectorAll(".list-group-item");

    listitemsgroup.forEach(function(listitem){
        const text = listitem.textContent.toLowerCase();
        if(text.indexOf(filtervalue) === -1){ //bulamadı 
            listitem.setAttribute("style","display : none !important");
        }
        else{
            listitem.setAttribute("style","display : block");
        }
    });
}

function deleteTodoFromUI(e){
    if (e.target.className === "far fa-trash-alt"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo has been deleted successfully.");

    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodoFromStorage();

    todos.forEach(function(todo,index){
        if(todo ===deleteTodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function  LoadAllTodosToUI(){
    let todos = getTodoFromStorage();
    todos.forEach(function(todos){
        addTodoToUI(todos);
    })
}

function getTodoFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function AddTodoToStorage(newTodo){
    let todos = getTodoFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos))
}

function showAlert(type,message){
    const alert = document.createElement("div");
   alert.className = `alert alert-${type}`;
   alert.textContent = message;

   firstCardBody.appendChild(alert);

    setTimeout(function(){
       alert.remove();
   },2000);
}

function successtodo(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
 
    firstCardBody.appendChild(alert);
 
     setTimeout(function(){
        alert.remove();
    },2000);
}

function addTodoToUI(newTodo){ //string degerı list item olarak uı ye ekler
    /* <li class="list-group-item d-flex justify-content-between">
                  Todo1
                  <a href="#" class="delete-item">
                      <i class="far fa-trash-alt"></i>
                  </a>
                </li> */

    //list item oluşturma 
    const listitem = document.createElement("li");
    //link ekleme 
    const link = document.createElement("a");
    link.href = "#";
    link.innerHTML = "<i class='far fa-trash-alt'></i>";
    link.className = "delete-item";

    listitem.className = "list-group-item d-flex justify-content-between";
    // text node ekleme 
    listitem.appendChild(document.createTextNode(newTodo));
    listitem.appendChild(link);

    todolist.appendChild(listitem)
}
