// AJAX code for the taskAddBtn button:
$(document).ready(function () {
  $("#form_todo").submit(function (event) {
    event.preventDefault();

    var formData = {
      todo: $("#input_todo").val(),
      desc: $("#todo_desc").val(),
      subject: $("#subject_dropdown button").text().trim(),
    };

    $.ajax({
      type: "POST",
      url: "/api/todo",
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
  });
});

// AJAX code for the save button that will update all the content of the card:
const taskId = newTask.getAttribute("data-task-id");
const taskTitleText = taskTitle.innerText.trim();
const descTextContent = descText.innerText.trim();
const priorityValue = prioritySelect.value;
const gradeValue = gradeInput.value.trim();

$.ajax({
  url: "/update-task",
  type: "POST",
  data: {
    taskId: taskId,
    taskTitleText: taskTitleText,
    descTextContent: descTextContent,
    priorityValue: priorityValue,
    gradeValue: gradeValue,
  },
  success: function (response) {
    console.log(response);
  },
  error: function (xhr, status, error) {
    console.log(error);
  },
});

// closeSign AJAX/
closeSign.addEventListener("click", () => {
  const taskId = closeSign.parentElement.getAttribute("data-task-id");
  const url = `/tasks/${taskId}`;
  const options = {
    method: "DELETE",
  };
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        closeSign.parentElement.remove();
      } else {
        throw new Error(`Failed to delete task with ID ${taskId}`);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to delete task");
    });
});
