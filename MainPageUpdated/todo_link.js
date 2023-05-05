// const form = document.getElementById("form_todo");
// const input = document.getElementById("input_todo");
// const todoLane = document.getElementById("lane_todo");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value = input.value;

//   if (!value) return;

//   const newTask = document.createElement("p");
//   const closeSign = document.createElement("span");

//   newTask.classList.add("task");
//   newTask.setAttribute("draggable", "true");
//   newTask.innerText = value;

//   closeSign.classList.add("close-sign");
//   closeSign.innerText = "X";
//   newTask.appendChild(closeSign);

//   closeSign.addEventListener("click", () => {
//     newTask.remove();
//   });

//   newTask.addEventListener("dragstart", () => {
//     newTask.classList.add("is-dragging");
//   });

//   newTask.addEventListener("dragend", () => {
//     newTask.classList.remove("is-dragging");
//   });

//   todoLane.appendChild(newTask);
//   input.value = "";
// });
//title and description working
// const form = document.getElementById("form_todo");
// const input = document.getElementById("input_todo");
// const todoLane = document.getElementById("lane_todo");
// const input_desc = document.getElementById("todo_desc");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value = input.value;
//   const valueDesc = input_desc.value;

//   if (!value) return;

//   const newTask = document.createElement("div"); // changed from p to div
//   const taskTitle = document.createElement("h5"); // added a new h2 element for the title
//   const descText = document.createElement("p"); // added a new p element for the description
//   const closeSign = document.createElement("span");

//   newTask.classList.add("task");
//   newTask.setAttribute("draggable", "true");

//   taskTitle.classList.add("task-title"); // added a new class for the title
//   taskTitle.innerText = value;

//   descText.classList.add("task-desc"); // added a new class for the description
//   descText.innerText = valueDesc;

//   closeSign.classList.add("close-sign");
//   closeSign.innerText = "X";

//   newTask.appendChild(taskTitle); // added the title to the newTask div
//   newTask.appendChild(descText); // added the description to the newTask div
//   newTask.appendChild(closeSign);

//   closeSign.addEventListener("click", () => {
//     newTask.remove();
//   });

//   newTask.addEventListener("dragstart", () => {
//     newTask.classList.add("is-dragging");
//   });

//   newTask.addEventListener("dragend", () => {
//     newTask.classList.remove("is-dragging");
//   });

//   todoLane.appendChild(newTask);
//   input.value = "";
//   input_desc.value = "";

// });

//working edit button but not save
// const form = document.getElementById("form_todo");
// const input = document.getElementById("input_todo");
// const todoLane = document.getElementById("lane_todo");
// const input_desc = document.getElementById("todo_desc");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value = input.value;
//   const valueDesc = input_desc.value;

//   if (!value) return;

//   const newTask = document.createElement("div"); // changed from p to div
//   const taskTitle = document.createElement("h5"); // added a new h5 element for the title
//   const descText = document.createElement("p"); // added a new p element for the description
//   const closeSign = document.createElement("span");
//   const editIcon = document.createElement("span"); // added a new span element for the edit icon
//   const saveIcon = document.createElement("span"); // added a new span element for the save icon

//   newTask.classList.add("task");
//   newTask.setAttribute("draggable", "true");

//   taskTitle.classList.add("task-title"); // added a new class for the title
//   taskTitle.innerText = value;

//   descText.classList.add("task-desc"); // added a new class for the description
//   descText.innerText = valueDesc;

//   closeSign.classList.add("close-sign");
//   closeSign.innerText = "X";

//   editIcon.classList.add("edit-icon"); // added a new class for the edit icon
//   editIcon.innerText = "✎";

//   saveIcon.classList.add("save-icon"); // added a new class for the save icon
//   saveIcon.innerText = "✔";

//   newTask.appendChild(taskTitle); // added the title to the newTask div
//   newTask.appendChild(descText); // added the description to the newTask div
//   newTask.appendChild(closeSign);
//   newTask.appendChild(editIcon); // added the edit icon to the newTask div

//   closeSign.addEventListener("click", () => {
//     newTask.remove();
//   });

//   editIcon.addEventListener("click", () => {
//     taskTitle.contentEditable = true; // make the title editable
//     descText.contentEditable = true; // make the description editable
//     editIcon.style.display = "none"; // hide the edit icon
//     saveIcon.style.display = "inline-block"; // show the save icon
//   });

//   saveIcon.addEventListener("click", () => {
//     taskTitle.contentEditable = false; // make the title non-editable
//     descText.contentEditable = false; // make the description non-editable
//     editIcon.style.display = "inline-block"; // show the edit icon
//     saveIcon.style.display = "none"; // hide the save icon
//   });

//   newTask.addEventListener("dragstart", () => {
//     newTask.classList.add("is-dragging");
//   });

//   newTask.addEventListener("dragend", () => {
//     newTask.classList.remove("is-dragging");
//   });

//   todoLane.appendChild(newTask);
//   input.value = "";
//   input_desc.value = "";
// });

//working all without priority
// const form = document.getElementById("form_todo");
// const input = document.getElementById("input_todo");
// const todoLane = document.getElementById("lane_todo");
// const input_desc = document.getElementById("todo_desc");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value = input.value;
//   const valueDesc = input_desc.value;

//   if (!value) return;

//   const newTask = document.createElement("div"); // changed from p to div
//   const taskTitle = document.createElement("h5"); // added a new h5 element for the title
//   const descText = document.createElement("p"); // added a new p element for the description
//   const closeSign = document.createElement("span");
//   const editIcon = document.createElement("span"); // added a new span element for the edit icon
//   const saveIcon = document.createElement("span"); // added a new span element for the save icon

//   newTask.classList.add("task");
//   newTask.setAttribute("draggable", "true");

//   taskTitle.classList.add("task-title"); // added a new class for the title
//   taskTitle.innerText = value;

//   descText.classList.add("task-desc"); // added a new class for the description
//   descText.innerText = valueDesc;

//   closeSign.classList.add("close-sign");
//   closeSign.innerText = "X";

//   editIcon.classList.add("edit-icon"); // added a new class for the edit icon
//   editIcon.innerText = "✎";

//   saveIcon.classList.add("save-icon"); // added a new class for the save icon
//   saveIcon.innerText = "✔";
//   saveIcon.style.display = "none"; // hide the save icon initially

//   newTask.appendChild(taskTitle); // added the title to the newTask div
//   newTask.appendChild(descText); // added the description to the newTask div
//   newTask.appendChild(closeSign);
//   newTask.appendChild(editIcon); // added the edit icon to the newTask div
//   newTask.appendChild(saveIcon); // added the save icon to the newTask div

//   closeSign.addEventListener("click", () => {
//     newTask.remove();
//   });

//   editIcon.addEventListener("click", () => {
//     taskTitle.contentEditable = true; // make the title editable
//     descText.contentEditable = true; // make the description editable
//     editIcon.style.display = "none"; // hide the edit icon
//     saveIcon.style.display = "inline-block"; // show the save icon
//   });

//   saveIcon.addEventListener("click", () => {
//     taskTitle.contentEditable = false; // make the title non-editable
//     descText.contentEditable = false; // make the description non-editable
//     editIcon.style.display = "inline-block"; // show the edit icon
//     saveIcon.style.display = "none"; // hide the save icon
//   });

//   newTask.addEventListener("dragstart", () => {
//     newTask.classList.add("is-dragging");
//   });

//   newTask.addEventListener("dragend", () => {
//     newTask.classList.remove("is-dragging");
//   });

//   todoLane.appendChild(newTask);
//   input.value = "";
//   input_desc.value = "";
// });

const form = document.getElementById("form_todo");
const input = document.getElementById("input_todo");
const todoLane = document.getElementById("lane_todo");
const input_desc = document.getElementById("todo_desc");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  const valueDesc = input_desc.value;

  if (!value) return;

  const newTask = document.createElement("div");
  const taskTitle = document.createElement("h5");
  const descText = document.createElement("p");
  const closeSign = document.createElement("span");
  const editIcon = document.createElement("span");
  const saveIcon = document.createElement("span");
  const prioritySelect = document.createElement("select");
  const priorityPlaceholderOption = document.createElement("option");
  const highOption = document.createElement("option");
  const mediumOption = document.createElement("option");
  const lowOption = document.createElement("option");

  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");

  taskTitle.classList.add("task-title");
  taskTitle.innerText = value;

  descText.classList.add("task-desc");
  descText.innerText = valueDesc;

  closeSign.classList.add("close-sign");
  closeSign.innerText = "X";

  editIcon.classList.add("edit-icon");
  editIcon.innerText = "✎";

  saveIcon.classList.add("save-icon");
  saveIcon.innerText = "✔";
  saveIcon.style.display = "none";

  prioritySelect.classList.add("task-priority");
  priorityPlaceholderOption.text = "Priority";
  priorityPlaceholderOption.value = "";
  priorityPlaceholderOption.disabled = true;
  priorityPlaceholderOption.selected = true;
  highOption.value = "high";
  highOption.text = "High";
  mediumOption.value = "medium";
  mediumOption.text = "Medium";
  lowOption.value = "low";
  lowOption.text = "Low";
  prioritySelect.appendChild(priorityPlaceholderOption);
  prioritySelect.appendChild(highOption);
  prioritySelect.appendChild(mediumOption);
  prioritySelect.appendChild(lowOption);

  newTask.appendChild(taskTitle);
  newTask.appendChild(descText);
  newTask.appendChild(closeSign);
  newTask.appendChild(editIcon);
  newTask.appendChild(saveIcon);
  newTask.appendChild(prioritySelect);

  closeSign.addEventListener("click", () => {
    newTask.remove();
  });

  editIcon.addEventListener("click", () => {
    taskTitle.contentEditable = true;
    descText.contentEditable = true;
    prioritySelect.disabled = false;
    editIcon.style.display = "none";
    saveIcon.style.display = "inline-block";
  });

  saveIcon.addEventListener("click", () => {
    taskTitle.contentEditable = false;
    descText.contentEditable = false;
    prioritySelect.disabled = true;
    editIcon.style.display = "inline-block";
    saveIcon.style.display = "none";

    const priority = prioritySelect.value;
    if (priority === "high") {
      newTask.style.backgroundColor = "rgba(198, 48, 62, 0.2)";
    } else if (priority === "medium") {
      newTask.style.backgroundColor = "rgba(255, 193, 7, 0.2)";
    } else if (priority === "low") {
      newTask.style.backgroundColor = "rgba(13, 110, 253, 0.2)";
    }
  });

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);
  input.value = "";
  input_desc.value = "";
});

function updateTaskTracking() {
  const todoCount = document.querySelectorAll("#lane_todo .task").length;
  const doingCount = document.querySelectorAll("#lane_doing .task").length;
  const doneCount = document.querySelectorAll("#lane_done .task").length;
  const completedCount = doingCount + doneCount;
  const totalTasks = todoCount + doingCount + doneCount;

  document.getElementById("todo-count").textContent = `${Math.round(
    (todoCount / totalTasks) * 100
  )}% (${todoCount})`;
  document.getElementById("doing-count").textContent = `${Math.round(
    (doingCount / totalTasks) * 100
  )}% (${doingCount})`;
  document.getElementById("done-count").textContent = `${Math.round(
    (doneCount / totalTasks) * 100
  )}% (${doneCount})`;
  document.getElementById("completed-count").textContent = `${Math.round(
    (completedCount / totalTasks) * 100
  )}% (${completedCount}/${totalTasks})`;
}

// call updateTaskTracking whenever a task is added or removed

const form_notes = document.getElementById("form_notes");
const input_notes = document.getElementById("input_notes");
const notesLane = document.getElementById("lane_notes");

form_notes.addEventListener("submit", (e) => {
  e.preventDefault();
  const value_notes = input_notes.value;

  if (!value_notes) return;

  const newTaskNotes = document.createElement("p");
  const closeSign1 = document.createElement("span");

  newTaskNotes.classList.add("task");
  newTaskNotes.setAttribute("draggable", "true");
  newTaskNotes.innerText = value_notes;

  closeSign1.classList.add("close-sign");
  closeSign1.innerText = "X";
  newTaskNotes.appendChild(closeSign1);

  closeSign1.addEventListener("click", () => {
    newTaskNotes.remove();
  });

  newTaskNotes.addEventListener("dragstart", () => {
    newTaskNotes.classList.add("is-dragging");
  });

  newTaskNotes.addEventListener("dragend", () => {
    newTaskNotes.classList.remove("is-dragging");
  });

  notesLane.appendChild(newTaskNotes);
  input_notes.value = "";
});
