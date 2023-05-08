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
// ---------------------------------------------------------------------------------------------------------------------------------------------------
// AJAX code for the noteAddBtn button:
$(document).ready(function () {
  $("#form_notes").submit(function (event) {
    event.preventDefault();

    var formData = {
      notes: $("#input_notes").val(),
    };

    $.ajax({
      type: "POST",
      url: "/api/notes",
      data: JSON.stringify(formData),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);

        $("#form_notes")[0].reset();

        alert("Note added successfully!");
      },
      error: function (xhr, status, error) {
        console.log(xhr.responseText);
        alert("Error adding Note: " + xhr.responseText);
      },
    });
  });
});

// closeSign AJAX/
closeSign1.addEventListener("click", () => {
  const noteId = closeSign1.parentElement.getAttribute("data-note-id");
  const url = `/tasks/${taskId}`;
  const options = {
    method: "DELETE",
  };
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        closeSign1.parentElement.remove();
      } else {
        throw new Error(`Failed to delete note with ID ${noteId}`);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to delete note");
    });
});
// ---------------------------------------------------------------------------------------------------------------------------------
// Ajax to get user Details on the userProfile page
$(document).ready(function () {
  $.ajax({
    url: "/userProfile",
    method: "GET",
    dataType: "json",
  })
    .done(function (data) {
      $("#email_id").text(data.email);
      $("#first_name").text(data.firstName);
      $("#last_name").text(data.lastName);
      $("#cwid").text(data.cwid);
      $("#courses").text(data.courses);
      $("#program").text(data.program);
      $("#sem").text(data.semester);
    })
    .fail(function () {
      alert("Failed to retrieve user details!");
    });
});
