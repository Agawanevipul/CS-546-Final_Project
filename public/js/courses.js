(function () {
  function validation(semVal, count){
    
    
    if (!semVal) throw "You must provide a value for semester";
    semVal=parseInt(semVal)
    if (typeof(semVal) !== "number")
      throw "Semester value must be a number";
    if(!(semVal>0 & semVal<11)) throw "Semester value must be 1 to 10"

    if (!count) throw "You must provide a value for no. of courses";
    count=parseInt(count)
    if (typeof(count) !== "number")
      throw "Semester value must be a number";
    if(!(count>0 & count<5)) throw "No. of courses must be 1 to 4"
    return true;
  }

let myForm = document.getElementById("coursesID");
let semVal = document.getElementById("semester")
let count = document.getElementById("course_count");

let btn = document.getElementById("first_button");

let results = document.getElementById("courseDetails");
let errorDiv = document.getElementById("error-container");
let errorTextElement = errorDiv.getElementsByClassName("alert alert-danger")[0];
let frmLabel = document.getElementById("formLabel");

if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (count.value) {
      try {
        errorDiv.classList.add("hidden");
        let result = validation(semVal.value, count.value)
        btn.style.visibility = "hidden";
        btn.style.display = "none";

        while (results.hasChildNodes()) {
          results.removeChild(results.lastChild);
        }
        let second_form = document.createElement("form");

        let courseLabel = document.createElement("label");
        courseLabel.innerHTML = "Enter Course Names: ";
        courseLabel.className = "row pt-4";
        second_form.appendChild(courseLabel);
        second_form.appendChild(document.createElement("br"));
        for (let i = 0; i < parseInt(count.value); i++) {
          let courseName = document.createElement("input");
          courseName.id = "CourseName" + (i + 1);
          courseName.name = "course" + (i + 1); // set the name attribute to retrieve the value from server-side
          courseName.placeholder = "Course " + (i + 1);
          let label = document.createElement("label");
              label.innerHTML = "Course " + (i + 1);
              label.htmlFor = "CourseName" + (i + 1);

          second_form.appendChild(courseName);
          second_form.appendChild(document.createElement("br"));
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = "Add Course Names";
        btn2.id = "second_button";
        btn2.className = "btn2";
        btn2.type = "submit";
        second_form.appendChild(btn2);
        results.appendChild(second_form);

        btn2.addEventListener("click", () => {
          event.preventDefault();

          // retrieve the course names entered by the user
          let courseNames = [];
          for (let i = 0; i < parseInt(count.value); i++) {
            let courseNameField = document.getElementById(
              "CourseName" + (i + 1)
            );
            courseNames.push(courseNameField.value);
          }

          // set the course names as a hidden input field in the form
          let courseNamesInput = document.createElement("input");
          courseNamesInput.type = "hidden";
          courseNamesInput.name = "courseNames";
          courseNamesInput.value = JSON.stringify(courseNames);
          second_form.appendChild(courseNamesInput);
          second_form.submit(); // submit form programmatically

          const semesterInput = document.getElementById("semester");
          const semesterValue = semesterInput.value;

          dl = {
            sem: semesterValue,
            courseName: courseNames,
          };

          $.ajax({
            type: "POST",
            url: "/task",
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
      } catch (e) {
        const message = typeof e === "string" ? e : e.message;
        errorTextElement.textContent = e;
        errorDiv.classList.remove("hidden");
      }
    } else {
      count.value = "";
      errorDiv.hidden = false;
      errorDiv.innerHTML = "You must enter a value";
      frmLabel.className = "error";
      count.focus();
      count.className = "inputClass";
    }
  });
}
})();
