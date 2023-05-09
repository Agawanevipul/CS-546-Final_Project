const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".DandD");

//const taskStatus = {};

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
    current_task = task;
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
    const currentLane = task.parentNode.id;
    let newStatus;
    if (currentLane === "lane_todo") {
      newStatus = "to-do";
    } else if (currentLane === "lane_doing") {
      newStatus = "doing";
    } else if (currentLane === "lane_done") {
      newStatus = "done";
    }
    task.setAttribute("data-status", newStatus);
    let tl = task.querySelector(".task-title");
    let d = task.querySelector(".task-desc");
    let p = task.querySelector(".task-priority");
    let g = task.querySelector(".grade");
    let s = task.getAttribute("data-status");
    let date = task.getAttribute("due-date");

    let dl = {
      todo: tl.innerText,
      desc: d.innerText,
      priority: p.value,
      grade: g.value,
      subject: "web",
      status: s,
      dueDate: date.valueOf(),
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
  RadioNodeList;

  const editIcon = task.querySelector(".edit-icon");
  const saveIcon = task.querySelector(".save-icon");
  const taskTitle = task.querySelector(".task-title");
  const descText = task.querySelector(".task-desc");
  const prioritySelect = task.querySelector(".task-priority");
  const gradeInput = task.querySelector(".grade");

  editIcon.addEventListener("click", () => {
    //taskTitle.contentEditable = true;
    descText.contentEditable = true;
    prioritySelect.disabled = false;
    editIcon.style.display = "none";
    saveIcon.style.display = "inline-block";
    gradeInput.disabled = false;
  });

  saveIcon.addEventListener("click", () => {
    //taskTitle.contentEditable = false;
    descText.contentEditable = false;
    prioritySelect.disabled = true;
    editIcon.style.display = "inline-block";
    saveIcon.style.display = "none";
    gradeInput.disabled = true;

    const priority = prioritySelect.value;
    if (priority === "High") {
      task.style.backgroundColor = "rgba(198, 48, 62, 0.2)";
    } else if (priority === "Medium") {
      task.style.backgroundColor = "rgba(255, 193, 7, 0.2)";
    } else if (priority === "Low") {
      task.style.backgroundColor = "rgba(13, 110, 253, 0.2)";
    }

    const grade = gradeInput.value.trim();
    if (grade === "" || (parseInt(grade) >= 0 && parseInt(grade) <= 100)) {
      newTask.setAttribute("data-grade", grade === "" ? "" : parseInt(grade));
    } else {
      alert("Please enter a valid grade between 0 and 100.");
      gradeInput.value = "";
      return;
    }
  });

  const removeBtn = task.querySelector(".close-sign");

  saveIcon.addEventListener("click", () => {
    let tl = task.querySelector(".task-title");
    let d = task.querySelector(".task-desc");
    let p = task.querySelector(".task-priority");
    let g = task.querySelector(".grade");
    let s = task.getAttribute("data-status");
    let date = task.getAttribute("due-date");

    let dl = {
      todo: tl.innerText,
      desc: d.innerText,
      priority: p.value,
      grade: g.value,
      subject: "web",
      status: s,
      dueDate: date.valueOf(),
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

  // let dl = task.querySelector(".task-title");

  removeBtn.addEventListener("click", () => {
    setTimeout(() => {
      analyzeBtn.click();
    }, 500);

    let tl = task.querySelector(".task-title");
    let dl = { todo: tl.innerText };
    console.log(dl);

    $.ajax({
      type: "DELETE",
      url: "/assignments",
      data: JSON.stringify(dl),

      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);

        $("#form_todo")[0].reset();

        alert("Deleted successfully!");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);

        alert("Error adding TODO: " + xhr.responseText);
      },
    });

    task.remove();
  });

  const priority = prioritySelect.value;
  if (priority === "High") {
    task.style.backgroundColor = "rgba(198, 48, 62, 0.2)";
  } else if (priority === "Medium") {
    task.style.backgroundColor = "rgba(255, 193, 7, 0.2)";
  } else if (priority === "Low") {
    task.style.backgroundColor = "rgba(13, 110, 253, 0.2)";
  }
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const task_bottom = insertAboveTask(zone, e.clientY);
    const current_task = document.querySelector(".is-dragging");

    if (!task_bottom) {
      zone.appendChild(current_task);
    } else {
      zone.insertBefore(current_task, task_bottom);
    }
    setTimeout(() => {
      analyzeBtn.click();
    }, 500);
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });
  return closestTask;
};
