const form = document.getElementById("form_todo");
const input = document.getElementById("input_todo");
const todoLane = document.getElementById("lane_todo");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("p");

  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);
  input.value = "";
});
