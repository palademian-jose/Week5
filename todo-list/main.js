//main.js;

// HTML DOM elements
const categoryInput = document.getElementById("category");
const taskInput = document.getElementById("task");
const tasksList = document.getElementById("tasks-list");

// Initialize an object to store tasks by category
const tasksByCategory = {};

// Add a task to the specified category
function addTask() {
  // Take value from input elements.
  const category = categoryInput.value.trim();
  const task = taskInput.value.trim();

  // Check category and task
  if (!category || !task) {
    alert("Please enter a category and task.");
    return;
  }

  if (!tasksByCategory[category]) {
    tasksByCategory[category] = [];
  }

  // Add task to the category
  tasksByCategory[category].push(task);

  // Clear input fields and update the displayed tasks
  /* *** Display HTML Element Format ***

        <div id="tasks-list">
            <div class="category">
                <h3>House Chore</h3>
                <div class="task"><span>Wash dishes</span><button>Remove</button></div>
            </div>
            <div class="category">
                <h3>Pets</h3>
                <div class="task"><span>Shower Ruff</span><button>Remove</button></div>
            </div>
        </div>
    */
  categoryInput.value = "";
  taskInput.value = "";

  // Refresh displayed tasks
  listTasks();
}

// Display all tasks by category
function listTasks() {
  // Clear previous tasks
  tasksList.innerHTML = "";

  const categories = Object.keys(tasksByCategory);

  // list all tasks by category.
  categories.forEach((category) => {
    const tasks = tasksByCategory[category];
    if (tasks.length === 0) return;

    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    const categoryHeading = document.createElement("h3");
    categoryHeading.textContent = category;
    categoryDiv.appendChild(categoryHeading);

    tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const taskSpan = document.createElement("span");
      taskSpan.textContent = task;
      taskDiv.appendChild(taskSpan);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        removeTask(category, index);
      });
      taskDiv.appendChild(removeButton);

      categoryDiv.appendChild(taskDiv);
    });

    tasksList.append(categoryDiv);
  });
  // show the tasks in DOM element tasksList
}

// Remove a task from the specified category
function removeTask(category, taskIndex) {
  // remove tasks from object tasksByCategory
  tasksByCategory[category].splice(taskIndex, 1);

  // If the category is empty after removal, delete the category
  if (tasksByCategory[category].length === 0) {
    delete tasksByCategory[category];
  }

  // Refresh displayed tasks
  listTasks();
}
