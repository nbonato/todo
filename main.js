const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("new-task");

let tasks = [];

function task(title, dueDate, type) {
    this.title = title;
    this.delete = function() {
        tasks.splice(tasks.indexOf(this), 1);
        updateTaskList();
    };
    this.dueDate = dueDate;
    this.type = type;
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
};

addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let title = document.getElementById("task-input").value;
    let dueDate = document.getElementById("date-input").value; 
    let type = document.getElementById("type-choice").value; 

    // check that the input isn't empty before adding a task
    if (title != "") { 
        // use the input as the task values
        let newTask = new task(title, dueDate, type);
        // add the task to the tasks list
        tasks.push(newTask)
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






