class Task {
  constructor(text, id, completed = false) {
    this.text = text;
    this.id = id;
    this.completed = completed;
  }
}

let tasks = [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.className = `task-card ${task.completed ? "completed" : ""}`;
    taskCard.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>${task.text}</div>
        <div class="task-actions">
          <button class="btn btn-sm btn-success" onclick="toggleComplete('${task.id}')">✓</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask('${task.id}')">🗑</button>
        </div>
      </div>
    `;
    taskList.appendChild(taskCard);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = new Task(text, Date.now().toString());
  tasks.push(newTask);
  renderTasks();
  taskInput.value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find(task => task.id === id);
  if (task) task.completed = !task.completed;
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

renderTasks();
