// const taskList = document.querySelector(".tasks");

// taskList.addEventListener("click", (event) => {
//   if (event.target.classList.contains("close-sign")) {
//     const task = event.target.closest(".task");
//     task.remove();
//   }
// });

// function createTaskElement(taskData) {
//     const newTask = document.createElement("div");
//     const taskTitle = document.createElement("h5");
//     const descText = document.createElement("p");
//     const closeSign = document.createElement("span");
//     const editIcon = document.createElement("span");
//     const saveIcon = document.createElement("span");
//     const prioritySelect = document.createElement("select");
//     const priorityPlaceholderOption = document.createElement("option");
//     const highOption = document.createElement("option");
//     const mediumOption = document.createElement("option");
//     const lowOption = document.createElement("option");
//     const gradeInput = document.createElement("input");

//     newTask.classList.add("task");
//     newTask.setAttribute("draggable", "true");
//     newTask.setAttribute("data-task-id", taskData.id);
//     newTask.setAttribute("data-status", taskData.status);
//     newTask.setAttribute("data-grade", taskData.grade);

//     taskTitle.classList.add("task-title");
//     taskTitle.innerText = taskData.title;

//     descText.classList.add("task-desc");
//     descText.innerText = taskData.description;

//     closeSign.classList.add("close-sign");
//     closeSign.innerText = "X";

//     editIcon.classList.add("edit-icon");
//     editIcon.innerText = "✎";

//     saveIcon.classList.add("save-icon");
//     saveIcon.innerText = "✔";
//     saveIcon.style.display = "none";

//     gradeInput.type = "number";
//     gradeInput.classList.add("grade");
//     gradeInput.min = "0";
//     gradeInput.max = "100";
//     gradeInput.placeholder = "Grade";
//     gradeInput.required = true;
//     gradeInput.step = "1";
//     gradeInput.value = taskData.grade || "";

//     prioritySelect.classList.add("task-priority");
//     priorityPlaceholderOption.text = "Priority";
//     priorityPlaceholderOption.value = "";
//     priorityPlaceholderOption.disabled = true;
//     priorityPlaceholderOption.selected = true;
//     highOption.value = "high";
//     highOption.text = "High";
//     mediumOption.value = "medium";
//     mediumOption.text = "Medium";
//     lowOption.value = "low";
//     lowOption.text = "Low";
//     prioritySelect.appendChild(priorityPlaceholderOption);
//     prioritySelect.appendChild(highOption);
//     prioritySelect.appendChild(mediumOption);
//     prioritySelect.appendChild(lowOption);
//     prioritySelect.value = taskData.priority || "";

//     newTask.appendChild(taskTitle);
//     newTask.appendChild(descText);
//     newTask.appendChild(closeSign);
//     newTask.appendChild(editIcon);
//     newTask.appendChild(saveIcon);
//     newTask.appendChild(prioritySelect);
//     newTask.appendChild(gradeInput);

//     if (taskData.status === "done") {
//       newTask.style.backgroundColor = "rgba(0, 128, 0, 0.2)";
//       prioritySelect.disabled = true;
//       gradeInput.disabled = true;
//       editIcon.style.display = "none";
//       saveIcon.style.display = "none";
//     } else {
//       prioritySelect.disabled = true;
//       gradeInput.disabled = true;
//       saveIcon.style.display = "none";
//       closeSign.addEventListener("click", () => {
//         newTask.remove();
//       });

//       editIcon.addEventListener("click", () => {
//         taskTitle.contentEditable = true;
//         descText.contentEditable = true;
//         prioritySelect.disabled = false;
//         editIcon.style.display = "none";
//         saveIcon.style.display = "inline-block";
//         gradeInput.disabled = false;
//       });
//       saveIcon.addEventListener("click", () => {
//         taskTitle.contentEditable = false;
//         descText.contentEditable = false;
//         prioritySelect.disabled = true;
//         editIcon.style.display = "inline-block";
//         saveIcon.style.display = "none";
//         gradeInput.disabled = true;

//         // Update the task object with the new information
//         task.title = taskTitle.innerText;
//         task.description = descText.innerText;
//         task.priority = prioritySelect.value;
//         task.grade = gradeInput.value;

//         // Save the updated task in local storage
//         localStorage.setItem(`task-${taskId}`, JSON.stringify(task));

//         // Refresh the task list to show the updated task
//         refreshTaskList();
//       });

// }
