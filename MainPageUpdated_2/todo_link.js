const analyzeBtn = document.querySelector("#analyzeBtn");
const form = document.getElementById("form_todo");
const input = document.getElementById("input_todo");
const todoLane = document.getElementById("lane_todo");
const input_desc = document.getElementById("todo_desc");
const analyzeClick = document.getElementById("analyzeBtn");

let taskSet = new Set();

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
  const gradeInput = document.createElement("input");

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

  gradeInput.type = "number";
  gradeInput.classList.add("grade");
  gradeInput.min = "0";
  gradeInput.max = "100";
  gradeInput.placeholder = "Grade";
  gradeInput.required = true;
  gradeInput.step = "1";

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
  newTask.appendChild(gradeInput);

  prioritySelect.disabled = true;
  gradeInput.disabled = true;

  taskSet.add(newTask);
  setTimeout(() => {
    analyzeBtn.click();
  }, 500);

  closeSign.addEventListener("click", () => {
    taskSet.delete(newTask);
    newTask.remove();
    setTimeout(() => {
      analyzeBtn.click();
    }, 500);
  });

  editIcon.addEventListener("click", () => {
    taskTitle.contentEditable = true;
    descText.contentEditable = true;
    prioritySelect.disabled = false;
    editIcon.style.display = "none";
    saveIcon.style.display = "inline-block";
    gradeInput.disabled = false;
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
    gradeInput.disabled = true;

    const grade = gradeInput.value.trim();
    if (grade === "" || (parseInt(grade) >= 0 && parseInt(grade) <= 100)) {
      newTask.setAttribute("data-grade", grade === "" ? "" : parseInt(grade));
    } else {
      alert("Please enter a valid grade between 0 and 100.");
      gradeInput.value = "";
      return;
    }
    taskSet.delete(newTask);
    taskSet.add(newTask);
  });

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
    setTimeout(() => {
      analyzeBtn.click();
    }, 500);
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
    setTimeout(() => {
      analyzeBtn.click();
    }, 500);
  });

  todoLane.appendChild(newTask);
  input.value = "";
  input_desc.value = "";
});

const form_notes = document.getElementById("form_notes");
const input_notes = document.getElementById("input_notes");
const notesLane = document.getElementById("lane_notes");
let noteSet = new Set();

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

  noteSet.add(newTaskNotes);

  closeSign1.addEventListener("click", () => {
    newTaskNotes.remove();
    noteSet.delete(newTaskNotes);
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

analyzeBtn.addEventListener("click", () => {
  const todoLane = document.querySelector("#lane_todo");
  const todoTasks = todoLane.querySelectorAll(".task");
  const todoTaskCount = todoTasks.length;

  const doingLane = document.querySelector("#lane_doing");
  const doingTasks = doingLane.querySelectorAll(".task");
  const doingTaskCount = doingTasks.length;

  const doneLane = document.querySelector("#lane_done");
  const doneTasks = doneLane.querySelectorAll(".task");
  const doneTaskCount = doneTasks.length;

  let totalTasks = todoTaskCount + doingTaskCount + doneTaskCount;

  let todoPercent = (todoTaskCount / totalTasks) * 100;
  let doingPercent = (doingTaskCount / totalTasks) * 100;
  let donePercent = (doneTaskCount / totalTasks) * 100;

  todoBar.style.width = `${todoPercent}%`;
  doingBar.style.width = `${doingPercent}%`;
  doneBar.style.width = `${donePercent}%`;

  const todoText = document.getElementById("todoText");
  const doingText = document.getElementById("doingText");
  const doneText = document.getElementById("doneText");

  const todoLine = `${todoTaskCount} tasks (${Math.round(todoPercent)}%)`;
  const doingLine = `${doingTaskCount} tasks (${Math.round(doingPercent)}%)`;
  const doneLine = `${doneTaskCount} tasks (${Math.round(donePercent)}%)`;

  todoText.textContent = todoLine;
  doingText.textContent = doingLine;
  doneText.textContent = doneLine;
});
