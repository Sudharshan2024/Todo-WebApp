const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoListUl = document.querySelector("#todo-list");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");
const dueDateInput = document.querySelector("#due-date");
const themeToggle = document.querySelector("#theme-toggle");
const taskCounter = document.querySelector("#task-counter");
const emptyState = document.querySelector("#empty-state");

let allTodos = getTodos();
updateTodoListUI();

todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    addTodo();
})
searchInput.addEventListener("input", updateTodoListUI);
filterSelect.addEventListener("change", updateTodoListUI);
themeToggle.addEventListener("click",toggleTheme);

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoobject = {
            text: todoText,
            completed: false,
            dueDate: dueDateInput.value
        }
        allTodos.push(todoobject);
        saveTodos();
        getTodos();
        updateTodoListUI();
        todoInput.value = "";
        dueDateInput.value = "";
    }
}

loadTheme();
function loadTheme(){
    const savedTheme =
        localStorage.getItem("theme");
    if(savedTheme==="light"){
        document.body.classList.add("light");
        themeToggle.textContent="🌞 Light Mode";
    }
}
function toggleTheme(){
    document.body.classList.toggle("light");
    if(document.body.classList.contains("light")){
        localStorage.setItem("theme","light");
        themeToggle.textContent="🌞 Light Mode";
    }
    else{
        localStorage.setItem("theme","dark");
        themeToggle.textContent="🌙 Dark Mode";
    }
}

function updateTodoListUI(){
    todoListUl.innerHTML="";
    const searchValue = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;
    allTodos.forEach((todo,todoIndex)=>{
        const matchesSearch =
            todo.text.toLowerCase().includes(searchValue);
        const matchesFilter =
            filterValue === "all" ||
            (filterValue === "completed" && todo.completed) ||
            (filterValue === "pending" && !todo.completed);
        if(matchesSearch && matchesFilter){
            const todoItem = createTodoItem(todo,todoIndex);
            todoListUl.append(todoItem);
        }
    });
    updateTaskCounter();
    if(allTodos.length===0){
        emptyState.classList.remove("hidden");
    }else{
        emptyState.classList.add("hidden");
    }
}
function updateTaskCounter(){

    const total = allTodos.length;

    const completed =
        allTodos.filter(todo => todo.completed).length;

    const pending = total - completed;

    taskCounter.textContent =
        `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;

}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;
    const todoLi = document.createElement("li");
    todoLi.className = "todo";
    const todoText = todo.text;
    todoLi.innerHTML = `<input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <div class="todo-content">
                    <label for="${todoId}" class="todo-text">
                        ${todoText}
                    </label>
                    <small class="todo-date">
                    ${
                        todo.dueDate
                        ? formatDate(todo.dueDate)
                        : "No Due Date"
                    }
                    </small>

                </div>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </li>`;
    const textLabel = todoLi.querySelector(".todo-text");
    textLabel.addEventListener("dblclick", function(){
        const input = document.createElement("input");
        input.type = "text";
        input.value = todo.text;
        input.className = "edit-input";
        textLabel.replaceWith(input);
        input.focus();
        function saveEdit(){
            const newText = input.value.trim();
            if(newText.length>0){
                allTodos[todoIndex].text = newText;
                saveTodos();
                updateTodoListUI();
            }else{
                updateTodoListUI();
            }
        }
        input.addEventListener("blur", saveEdit);
        input.addEventListener("keydown", function(e){
            if(e.key==="Enter"){
                saveEdit();
            }
            if(e.key==="Escape"){
                updateTodoListUI();
            }
        });
    });
    const today = new Date();
    today.setHours(0,0,0,0);
    if(
        todo.dueDate &&
        !todo.completed &&
        new Date(todo.dueDate) < today
    ){
        todoLi
            .querySelector(".todo-date")
            .classList
            .add("overdue");
    }

    let deleteButton = todoLi.querySelector(".delete-button");
    deleteButton.addEventListener("click", function(){
    const confirmed = confirm(
        "Delete this task?"
    );
    if(confirmed){
        deleteTodoItem(todoIndex);
    }
})

    let checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change", function(){
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLi;
}

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoListUI();
}

function saveTodos(){
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todoJson);
}
saveTodos();

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
function formatDate(date){

    const options={
        day:"numeric",
        month:"short",
        year:"numeric"
    };

    return new Date(date).toLocaleDateString(
        "en-IN",
        options
    );

}