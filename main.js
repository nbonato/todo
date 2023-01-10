const taskList = document.getElementById("task-list");
const addTaskForm = document.getElementById("new-task");
let tasks = [];

function task(title) {
    this.title = title;
};

// this clears and re-generates the whole list based on the array "tasks"
function updateTaskList () {
    taskList.innerHTML = "";
    for (let task of tasks) {
        let newTask = document.createElement("li");
        newTask.textContent = task.title;
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





