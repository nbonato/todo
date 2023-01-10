const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("new-task");

let tasks = [];

function task(title) {
    this.title = title;
    this.delete = function() {
        tasks.splice(tasks.indexOf(this), 1);
        updateTaskList();
    };
};

// this clears and re-generates the whole list based on the array "tasks"
function updateTaskList () {
    taskList.innerHTML = "";
    for (let task of tasks) {
        let newTask = document.createElement("li");
        let taskName = document.createElement("p");
        let deleteButton = document.createElement("p");
        deleteButton.textContent = "✖"
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (event) => {
            task.delete();
        });
        taskName.textContent = task.title;
        newTask.appendChild(taskName);
        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);
    };
};

addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let input = addTaskForm.querySelector("input[type='text']");
    // check that the input isn't empty before adding a task
    if (input != "") { 
        // use the text in the input as the title of the task
        let newTask = new task(input.value); 
        // add the task to the tasks list
        tasks.push(newTask)
        updateTaskList();
    };
    // reset the form so that it's empty
    addTaskForm.reset();
});


document.addEventListener("click", (event) => {
    let target = event.target.parentNode.parentNode;
    if(target == addTaskForm) {
        let hidden = addTaskForm.querySelectorAll(".hidden");
        for (let element of hidden) {
            element.style.display = "inline";
        };    
    } else {
        let hidden = addTaskForm.querySelectorAll(".hidden");
        for (let element of hidden) {
            element.style.display = "none";
        };        
    };

});






