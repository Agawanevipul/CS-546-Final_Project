const analyzeBtn = document.querySelector("#analyzeBtn");
const form = document.getElementById("form_todo");
const input = document.getElementById("input_todo");
const todoLane = document.getElementById("lane_todo");
const input_desc = document.getElementById("todo_desc");
const analyzeClick = document.getElementById("analyzeBtn");

setTimeout(() => {
  analyzeBtn.click();
}, 1000);

//let taskSet = new Set();
let taskId = 0;
//const taskStatus = {};
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

  const gradeLabel = document.createElement("label");
  const gradeInput = document.createElement("input");

  const dueDateLabel = document.createElement("label");
  const inputDueDate = document.createElement("input");

  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");

  newTask.setAttribute("data-task-id", `task-${taskId}`);
  taskId++;

  newTask.setAttribute("data-status", "todo");

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

  gradeLabel.setAttribute("for", "gradeInput");
  gradeLabel.innerText = "Grade";
  gradeLabel.classList.add("grade-label");

  gradeInput.type = "number";
  gradeInput.classList.add("grade");
  gradeInput.setAttribute("id", "gradeInput");
  gradeInput.min = "0";
  gradeInput.max = "100";
  gradeInput.placeholder = "Grade";
  gradeInput.required = true;
  gradeInput.step = "1";
  gradeInput.value = "0";

  dueDateLabel.setAttribute("for", "due-date");
  dueDateLabel.innerText = "Due Date";
  dueDateLabel.classList.add("due-date-label");

  inputDueDate.type = "text";
  inputDueDate.id = "due-date";
  inputDueDate.classList.add("due-date");
  inputDueDate.placeholder = "MM-DD-YYYY";
  inputDueDate.required = false;
  inputDueDate.value = "01-01-2023";

  prioritySelect.classList.add("task-priority");
  priorityPlaceholderOption.text = "Priority";
  priorityPlaceholderOption.value = "";
  priorityPlaceholderOption.disabled = true;
  priorityPlaceholderOption.selected = true;
  highOption.value = "high";
  highOption.text = "High";
  highOption.selected = true;
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
  newTask.appendChild(editIcon);
  newTask.appendChild(saveIcon);
  newTask.appendChild(prioritySelect);
  newTask.appendChild(closeSign);
  newTask.appendChild(gradeLabel);
  newTask.appendChild(gradeInput);
  newTask.appendChild(dueDateLabel);
  newTask.appendChild(inputDueDate);

  formData = {
    todo: value,
    desc: valueDesc,
  };
  setTimeout(function () {
    $.ajax({
      type: "POST",
      url: "/assignments",
      data: JSON.stringify(formData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);

        $("#form_todo")[0].reset();

        alert("TODO added successfully!");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
        alert("Error adding TODO: " + xhr.responseText);
      },
    });
  }, 200);
  prioritySelect.disabled = true;
  gradeInput.disabled = true;
  inputDueDate.disabled = true;

  //taskSet.add(newTask);
  setTimeout(() => {
    analyzeBtn.click();
  }, 500);

  closeSign.addEventListener("click", () => {
    //taskSet.delete(newTask);

    setTimeout(() => {
      analyzeBtn.click();
    }, 500);

    let tl = newTask.querySelector(".task-title");
    let dl = { todo: tl.innerText };
    $.ajax({
      type: "DELETE",
      url: "/assignments",
      data: JSON.stringify(dl),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);

        $("#form_todo")[0].reset();

        alert("TODO deleted successfully!");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
        alert("Error adding TODO: " + xhr.responseText);
      },
    });

    newTask.remove();
    // const taskId = closeSign.parentElement.getAttribute("data-task-id");
  });

  editIcon.addEventListener("click", () => {
    //taskTitle.contentEditable = true;
    descText.contentEditable = true;
    prioritySelect.disabled = false;
    editIcon.style.display = "none";
    saveIcon.style.display = "inline-block";
    gradeInput.disabled = false;
    inputDueDate.disabled = false;
  });

  saveIcon.addEventListener("click", () => {
    //taskTitle.contentEditable = false;
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
    inputDueDate.disabled = true;
    const valueDueDate = inputDueDate.value.trim();
    const dateRegex = /^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
    if (valueDueDate !== "" && !dateRegex.test(valueDueDate)) {
      alert("Please enter a valid date in the format mm-dd-yyyy.");
      inputDueDate.value = "";
      return;
    }
  });
  saveIcon.addEventListener("click", () => {
    let tl = newTask.querySelector(".task-title");
    let d = newTask.querySelector(".task-desc");
    let p = newTask.querySelector(".task-priority");
    let g = newTask.querySelector(".grade");
    let s = newTask.getAttribute("data-status");
    let date = newTask.querySelector("#due-date");

    let dl = {
      todo: tl.innerText,
      desc: d.innerText,
      priority: p.value,
      grade: g.value,
      subject: "web",
      status: s,
      dueDate: date.value,
    };
    console.log(dl);
    $.ajax({
      type: "PATCH",
      url: "/assignments",
      data: JSON.stringify(dl),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);

        $("#form_todo")[0].reset();

        alert("Updated successfully!");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
        alert("Error adding TODO: " + xhr.responseText);
      },
    });
  });

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
    setTimeout(() => {
      analyzeBtn.click();
    }, 500);
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
    const currentLane = newTask.parentNode.id;
    let newStatus;
    if (currentLane === "lane_todo") {
      newStatus = "to-do";
    } else if (currentLane === "lane_doing") {
      newStatus = "doing";
    } else if (currentLane === "lane_done") {
      newStatus = "done";
    }
    newTask.setAttribute("data-status", newStatus);
    //taskStatus[newTask.getAttribute("data-task-id")] = newStatus;
    setTimeout(() => {
      analyzeBtn.click();
    }, 500);

    let tl = newTask.querySelector(".task-title");
    let d = newTask.querySelector(".task-desc");
    let p = newTask.querySelector(".task-priority");
    let g = newTask.querySelector(".grade");
    let s = newTask.getAttribute("data-status");
    let date = newTask.querySelector("#due-date");

    let dl = {
      todo: tl.innerText,
      desc: d.innerText,
      priority: p.value,
      grade: g.value,
      subject: "web",
      status: s,
      dueDate: date.value,
    };

    $.ajax({
      type: "PATCH",
      url: "/assignments",
      data: JSON.stringify(dl),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);

        $("#form_todo")[0].reset();

        alert("Updated successfully!");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
        alert("Error adding TODO: " + xhr.responseText);
      },
    });
  });

  todoLane.appendChild(newTask);
  input.value = "";
  input_desc.value = "";
});

// const form_notes = document.getElementById("form_notes");
// const input_notes = document.getElementById("input_notes");
// const notesLane = document.getElementById("lane_notes");
// let noteSet = new Set();

// form_notes.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const value_notes = input_notes.value;

//   if (!value_notes) return;

//   const newTaskNotes = document.createElement("p");
//   const closeSign1 = document.createElement("span");

//   newTaskNotes.classList.add("task");
//   newTaskNotes.setAttribute("draggable", "true");
//   newTaskNotes.innerText = value_notes;

//   closeSign1.classList.add("close-sign");
//   closeSign1.innerText = "X";
//   newTaskNotes.appendChild(closeSign1);

//   noteSet.add(newTaskNotes);

//   closeSign1.addEventListener("click", () => {
//     newTaskNotes.remove();
//     noteSet.delete(newTaskNotes);
//   });

//   newTaskNotes.addEventListener("dragstart", () => {
//     newTaskNotes.classList.add("is-dragging");
//   });

//   newTaskNotes.addEventListener("dragend", () => {
//     newTaskNotes.classList.remove("is-dragging");
//   });

//   notesLane.appendChild(newTaskNotes);
//   input_notes.value = "";
// });

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

  let todoPercent = totalTasks === 0 ? 0 : (todoTaskCount / totalTasks) * 100;
  let doingPercent = totalTasks === 0 ? 0 : (doingTaskCount / totalTasks) * 100;
  let donePercent = totalTasks === 0 ? 0 : (doneTaskCount / totalTasks) * 100;

  todoBar.style.width = `${totalTasks === 0 ? 0 : todoPercent}%`;
  doingBar.style.width = `${totalTasks === 0 ? 0 : doingPercent}%`;
  doneBar.style.width = `${totalTasks === 0 ? 0 : donePercent}%`;

  const todoText = document.getElementById("todoText");
  const doingText = document.getElementById("doingText");
  const doneText = document.getElementById("doneText");

  const todoLine =
    totalTasks === 0
      ? "0 tasks"
      : `${todoTaskCount} tasks (${Math.round(todoPercent)}%)`;
  const doingLine =
    totalTasks === 0
      ? "0 tasks"
      : `${doingTaskCount} tasks (${Math.round(doingPercent)}%)`;
  const doneLine =
    totalTasks === 0
      ? "0 tasks"
      : `${doneTaskCount} tasks (${Math.round(donePercent)}%)`;

  todoText.textContent = todoLine;
  doingText.textContent = doingLine;
  doneText.textContent = doneLine;
});

const prioritySelect = document.querySelector(".task-priority");
const priorityOption = prioritySelect.options[prioritySelect.selectedIndex];
const priorityVal = priorityOption.value;

const taskElement = document.querySelector(".task");

if (priorityVal === "High") {
  taskElement.style.backgroundColor = "rgba(198, 48, 62, 0.2)";
} else if (priorityVal === "Medium") {
  taskElement.style.backgroundColor = "rgba(255, 193, 7, 0.2)";
} else if (priorityVal === "Low") {
  taskElement.style.backgroundColor = "rgba(13, 110, 253, 0.2)";
}
prioritySelect.disabled = true;

//ajax post request

// $(document).ready(function () {
//   $("#form_todo").submit(function (event) {
//     event.preventDefault();

//     // var formData = {
//     //   todo: $("#input_todo").val(),
//     //   notes: $("#todo_desc").val(),
//     // };

//     var todo = $("#input_todo").value;
//     var notes = $("#todo_desc").value;

//     console.log("Todo: " + todo);
//     console.log("Notes: " + notes);
//     var formData = {
//       todo: todo,
//       notes: notes,
//     };
//     setTimeout(function () {
//       $.ajax({
//         type: "POST",
//         url: "/assignments",
//         data: JSON.stringify(formData),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (response) {
//           console.log(response);

//           $("#form_todo")[0].reset();

//           alert("TODO added successfully!");
//         },
//         error: function (xhr, status, error) {
//           console.log(xhr.responseText);
//           alert("Error adding TODO: " + xhr.responseText);
//         },
//       });
//     }, 200); // delay for 0.2 seconds
//   });
// });

// $(document).ready(function () {
//   $("#form_todo").submit(function (event) {
//     event.preventDefault();

//     var formData = {

//       todo: $("#input_todo").val(),
//       desc: $("#todo_desc").val(),
//       subject: $("#subject_dropdown button").text().trim(),

//       todo: $("#task_title").val(),
//       notes: $("#task_desc").val(),
//       // subject: $("#subject_dropdown button").text().trim(),
//       // subject: "web",
//       // priority: "high",
//       // grade: 87,
//       // dueDate: "00/00/0000",
//       // status: "to-do",

//     };

//     $.ajax({
//       type: "POST",

//       url: "/api/todo",

//       url: "/assignments",

//       data: JSON.stringify(formData),
//       contentType: "application/json; charset=utf-8",
//       dataType: "json",
//       success: function (response) {
//         console.log(response);

//         $("#form_todo")[0].reset();

//         alert("TODO added successfully!");
//       },
//       error: function (xhr, status, error) {
//         console.log(xhr.responseText);
//         alert("Error adding TODO: " + xhr.responseText);
//       },
//     });
//   });
// });

// AJAX code for the save button that will update all the content of the card:

// const taskIdAj = newTask.getAttribute("data-task-id");
// const taskTitleText = taskTitle.innerText.trim();
// const descTextContent = descText.innerText.trim();
// const priorityValue = prioritySelect.value;
// const gradeValue = gradeInput.value.trim();

// $.ajax({
//   url: "/update-task",
//   type: "POST",
//   data: {
//     taskId: taskIdAj,
//     taskTitleText: taskTitleText,
//     descTextContent: descTextContent,
//     priorityValue: priorityValue,
//     gradeValue: gradeValue,
//   },
//   success: function (response) {
//     console.log(response);
//   },
//   error: function (xhr, status, error) {
//     console.log(error);
//   },
// });

// // closeSign AJAX/
// closeSign.addEventListener("click", () => {
//   const taskId = closeSign.parentElement.getAttribute("data-task-id");
//   const url = `/tasks/${taskId}`;
//   const options = {
//     method: "DELETE",

// closeSign AJAX/
// closeSign.addEventListener("click", () => {
//   const taskId = closeSign.parentElement.getAttribute("data-task-id");
//   const url = '/assignments'
//   const options = {
//     method: "DELETE",

//   };
//   fetch(url, options)
//     .then((response) => {
//       if (response.ok) {
//         closeSign.parentElement.remove();
//       } else {
//         throw new Error(`Failed to delete task with ID ${taskId}`);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Failed to delete task");
//     });
// });
// // ---------------------------------------------------------------------------------------------------------------------------------------------------

//     var formData = {
//       notes: $("#input_notes").val(),
//     };

//     $.ajax({
//       type: "POST",
//       url: "/api/notes",
//       data: JSON.stringify(formData),
//       contentType: "application/json; charset=utf-8",
//       dataType: "json",
//       success: function (response) {
//         console.log(response);

//         $("#form_notes")[0].reset();

//         alert("Note added successfully!");
//       },
//       error: function (xhr, status, error) {
//         console.log(xhr.responseText);
//         alert("Error adding Note: " + xhr.responseText);
//       },
//     });
//   });
// });

// // closeSign AJAX/
// closeSign1.addEventListener("click", () => {
//   const noteId = closeSign1.parentElement.getAttribute("data-note-id");
//   const url = `/tasks/${taskId}`;
//   const options = {
//     method: "DELETE",
//   };
//   fetch(url, options)
//     .then((response) => {
//       if (response.ok) {
//         closeSign1.parentElement.remove();
//       } else {
//         throw new Error(`Failed to delete note with ID ${noteId}`);

// closeSign AJAX/
// closeSign.addEventListener("click", () => {
//   const noteId = closeSign.parentElement.getAttribute("data-note-id");
//   const url = "/assignments";
//   const dl = { todo: value };
//   console.log(dl);
//   console.log(value);
//   const options = {
//     method: "DELETE",
//     data: JSON.stringify(dl),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//   };

//   fetch(url, options)
//     .then((response) => {
//       if (response.ok) {
//         closeSign.parentElement.remove();
//       } else {
//         throw new Error("Failed to delete task");

//       }
//     })
//     .catch((error) => {
//       console.error(error);

//       alert("Failed to delete note");
//     });
// });
// // ---------------------------------------------------------------------------------------------------------------------------------
// // Ajax to get user Details on the userProfile page
// $(document).ready(function () {
//   $.ajax({
//     url: "/userProfile",
//     method: "GET",
//     dataType: "json",
//   })
//     .done(function (data) {
//       $("#email_id").text(data.email);
//       $("#first_name").text(data.firstName);
//       $("#last_name").text(data.lastName);
//       $("#cwid").text(data.cwid);
//       $("#courses").text(data.courses);
//       $("#program").text(data.program);
//       $("#sem").text(data.semester);
//     })
//     .fail(function () {
//       // Handle any errors that may occur
//       alert("Failed to retrieve user details!");
//     });
// });

//       alert("Failed to delete task");
//     });
// });
// ---------------------------------------------------------------------------------------------------------------------------------
// Ajax to get user Details on the userProfile page
// $(document).ready(function () {
//   $.ajax({
//     url: "/userProfile",
//     method: "GET",
//     dataType: "json",
//   })
//     .done(function (data) {
//       $("#email_id").text(data.email);
//       $("#first_name").text(data.firstName);
//       $("#last_name").text(data.lastName);
//       $("#cwid").text(data.cwid);
//       $("#courses").text(data.courses);
//       $("#program").text(data.program);
//       $("#sem").text(data.semester);
//     })
//     .fail(function () {
//       // Handle any errors that may occur
//       alert("Failed to retrieve user details!");
//     });
// });
