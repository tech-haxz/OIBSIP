const title = document.getElementById("Tasktitle");
const description = document.getElementById("Taskdesc");
const addButton = document.getElementById("addTaskButton");

addButton.addEventListener("click", function () {
  const taskTitle = title.value.trim();
  const taskDescription = description.value.trim();

  if (taskTitle === "" || taskDescription === "") {
    alert("Please fill in both fields.");
    return;
  }

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
  });

  // Add complete functionality
  const completeButton = newTask.querySelector(".complete-btn");
  completeButton.addEventListener("click", function () {
    newTask.classList.toggle("completed");

    if (newTask.classList.contains("completed")) {
      newTask.querySelector("h3").style.textDecoration = "line-through";
      newTask.querySelector("p").style.textDecoration = "line-through";

      const completedTasksList = document.getElementById("completedTasksList");
      completedTasksList.appendChild(newTask);
      completeButton.textContent = "Undo";

      const deleteButton = newTask.querySelector(".delete-btn");
      deleteButton.addEventListener("click", function () {
        completedTasksList.removeChild(newTask);
      });

    } else {
      newTask.querySelector("h3").style.textDecoration = "none";
      newTask.querySelector("p").style.textDecoration = "none";
      
      taskList.appendChild(newTask);
      newTask.classList.remove("completed");
      completeButton.textContent = "Complete";
    }
  });
});
