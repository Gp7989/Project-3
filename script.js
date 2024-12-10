// Accessing the DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const pendingTasksList = document.getElementById("pendingTasksList");
const completedTasksList = document.getElementById("completedTasksList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to update localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to display tasks
function renderTasks() {
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete-btn" onclick="markComplete(${index})">Complete</button>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    if (task.completed) {
      taskElement.classList.add("completed");
      completedTasksList.appendChild(taskElement);
    } else {
      pendingTasksList.appendChild(taskElement);
    }
  });
}

// Add new task
addTaskButton.addEventListener("click", () => {
  if (taskInput.value.trim()) {
    const newTask = {
      text: taskInput.value.trim(),
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Mark task as complete
function markComplete(index) {
  tasks[index].completed = true;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim()) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();
