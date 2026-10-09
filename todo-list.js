const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const emptyMessage = document.getElementById("emptyMessage");
const clearBtn = document.getElementById("clearBtn");

const copyright = document.getElementById("copyright");


let tasks = JSON.parse(
    localStorage.getItem("preetiTasks")
) || [];


// Save tasks
function saveTasks() {

    localStorage.setItem(
        "preetiTasks",
        JSON.stringify(tasks)
    );
}


// Display tasks
function showTasks() {

    taskList.innerHTML = "";


    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        const text = document.createElement("span");

        text.className = "task-text";
        text.textContent = task.text;


        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";


        // Complete task
        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            showTasks();

        });


        // Delete task
        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {

                return item.id !== task.id;

            });

            saveTasks();

            showTasks();

        });


        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    const pendingTasks = tasks.filter(function(task) {

        return !task.completed;

    }).length;


    taskCount.textContent =
        pendingTasks +
        (pendingTasks === 1 ? " task left" : " tasks left");


    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

}


// Add new task
function addTask() {

    const text = taskInput.value.trim();


    if (text === "") {

        alert("Please enter a task.");

        return;

    }


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(newTask);


    taskInput.value = "";


    saveTasks();

    showTasks();

    taskInput.focus();

}


// Add button
addTaskBtn.addEventListener("click", addTask);


// Enter key
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Clear completed tasks
clearBtn.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });

    saveTasks();

    showTasks();

});


// Current year
copyright.textContent =
    "© " +
    new Date().getFullYear() +
    " Preeti Chand. All Rights Reserved.";


// Show tasks when page loads
showTasks();