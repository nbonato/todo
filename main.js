const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("new-task");

 
function taskCreator(title, dueDate, type) {
    this.title = title;
    this.delete = function() {
        tasks.splice(tasks.indexOf(this), 1);
        console.log(types, types.indexOf(this.type));
        types.splice(types.indexOf(this.type), 1);
        updateTaskList();
    };
    this.dueDate = dueDate;
    this.type = type;
};


let tasks = [];
let types = [];


if (localStorage.getItem('tasks')) {
    tasksStored = JSON.parse(localStorage.getItem("tasks") || "[]");
    for (let element of tasksStored) {
        tasks.push(new taskCreator(element.title, element.dueDate, element.type));
    };
    updateTaskList();
};
  


if (localStorage.getItem('types')) {
    types = JSON.parse(localStorage.getItem("types") || "[]");
};



// this clears and re-generates the whole list based on the array "tasks"
function updateTaskList () {
    taskList.innerHTML = "";
    for (let task of tasks) {
        let newTask = document.createElement("li");
        let taskBasic = document.createElement("div");
        taskBasic.className = "task-basic";
        let taskName = document.createElement("p");
        let deleteButton = document.createElement("p");
        taskBasic.appendChild(taskName);
        taskBasic.appendChild(deleteButton);
        
        let taskInfo = document.createElement("div");
        let dueDateElement = document.createElement("p");
        dueDateElement.textContent = task.dueDate;
        taskInfo.appendChild(dueDateElement);
        let typeElement = document.createElement("p");
        typeElement.textContent = task.type;
        taskInfo.appendChild(typeElement);
        
        taskInfo.classList.add("hidden");
        taskInfo.classList.add("task-info");
        
        deleteButton.textContent = "✖"
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (event) => {
            task.delete();
        
        });
        taskName.textContent = task.title;
        newTask.appendChild(taskBasic);
        newTask.appendChild(taskInfo);
        newTask.addEventListener("click", () => {
            for (let element of document.querySelectorAll(".task-info")) {
                if (!element.classList.contains("hidden")) {
                    element.classList.toggle("hidden");
                };
            }; 
            taskInfo.classList.toggle("hidden");
        });
        taskList.appendChild(newTask);
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("types", JSON.stringify(types));
};

addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let title = document.getElementById("task-input").value;
    let dueDate = document.getElementById("date-input").value; 
    let type = document.getElementById("type-choice").value; 

    // check that the input isn't empty before adding a task
    if (title != "") { 
        // use the input as the task values
        let newTask = new taskCreator(title, dueDate, type);
        // add the task to the tasks list
        tasks.push(newTask);

        // check if the task's type is already in use
        // if not, add it to the types array
        
        if (!types.includes(type)) {
            types.push(type);
        };

        updateTaskList();
    } else {
        alert("No name!");
    };
    // reset the form so that it's empty
    addTaskForm.reset();
});


document.addEventListener("click", (event) => {
    let target = event.target.parentNode.parentNode;
    if(target == addTaskForm) {
        let hidden = addTaskForm.querySelectorAll(".hidden");
        for (let element of hidden) {
            element.style.display = "block";
        };    
    } else {
        let hidden = addTaskForm.querySelectorAll(".hidden");
        for (let element of hidden) {
            element.style.display = "none";
        };        
    };

});






