const title = document.getElementById("Tasktitle");
const description = document.getElementById("Taskdesc");
const addButton = document.getElementById("addTaskButton");

// Add new task functionality

const taskTitles = [];
const taskDescriptions = [];
const taskCompTitles = [];
const taskCompDescriptions = [];

//function to remove pending tasks from local storage
function removePendingTasks(elm) {
  const index = taskTitles.indexOf(elm);
  if (index > -1) {
    taskTitles.splice(index, 1);
    taskDescriptions.splice(index, 1);
  }
  localStorage.setItem("taskTitles", taskTitles.join(","));
  localStorage.setItem("taskDescriptions", taskDescriptions.join(","));
}

//function to remove completed tasks from local storage
function removeCompletedTasks(elm) {
  const index = taskCompTitles.indexOf(elm);
  if (index > -1) {
    taskCompTitles.splice(index, 1);
    taskCompDescriptions.splice(index, 1);
  }
  localStorage.setItem("taskCompTitles", taskCompTitles.join(","));
  localStorage.setItem("taskCompDescriptions", taskCompDescriptions.join(","));
}

//Event listener for the add task button
addButton.addEventListener("click", function () {
  const taskTitle = title.value.trim();
  const taskDescription = description.value.trim();

  if (taskTitle === "" || taskDescription === "") {
    alert("Please fill in both fields.");
    return;
  }

  taskTitles.push(taskTitle);
  taskDescriptions.push(taskDescription);

  const taskList = document.getElementById("pendingTasksList");
  const newTask = document.createElement("li");
  newTask.innerHTML = `<div class="task">
                    <h3>${taskTitle}</h3>
                    <p>${taskDescription}</p>
                    <button class="complete-btn">Complete</button>
                    <button class="delete-btn">Delete</button>
                 </div>`;

  taskList.appendChild(newTask);

  // Clear input fields
  title.value = "";
  description.value = "";

  // Add delete functionality
  const deleteButton = newTask.querySelector(".delete-btn");
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(newTask);
    removePendingTasks(taskTitle);
  });

  // Add complete functionality
  const completeButton = newTask.querySelector(".complete-btn");
  completeButton.addEventListener("click", function () {
    removePendingTasks(taskTitle);
    // Toggle completed class and move task to completed list
    newTask.classList.toggle("completed");

    if (newTask.classList.contains("completed")) {
      newTask.querySelector("h3").style.textDecoration = "line-through";
      newTask.querySelector("p").style.textDecoration = "line-through";

      const completedTasksList = document.getElementById("completedTasksList");
      completedTasksList.appendChild(newTask);
      completeButton.textContent = "Undo";

      taskCompTitles.push(taskTitle);
      taskCompDescriptions.push(taskDescription);

      localStorage.setItem("taskCompTitles", taskCompTitles.join(","));
      localStorage.setItem(
        "taskCompDescriptions",
        taskCompDescriptions.join(",")
      );

      // Add delete functionality for completed tasks
      const deleteButton = newTask.querySelector(".delete-btn");
      deleteButton.addEventListener("click", function () {
        completedTasksList.removeChild(newTask);
        removeCompletedTasks(taskTitle);
      });
    } else {
      // Move back to pending tasks
      taskTitles.push(taskTitle);
      taskDescriptions.push(taskDescription);

      localStorage.setItem("taskTitles", taskTitles.join(","));
      localStorage.setItem("taskDescriptions", taskDescriptions.join(","));

      removeCompletedTasks(taskTitle);

      newTask.querySelector("h3").style.textDecoration = "none";
      newTask.querySelector("p").style.textDecoration = "none";

      taskList.appendChild(newTask);
      newTask.classList.remove("completed");
      completeButton.textContent = "Complete";
    }
  });

  // console.log(taskTitles);
  // console.log(taskDescriptions);
  localStorage.setItem("taskTitles", taskTitles.join(","));
  localStorage.setItem("taskDescriptions", taskDescriptions.join(","));
});
