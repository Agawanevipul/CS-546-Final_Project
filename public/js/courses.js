let myForm = document.getElementById("coursesID");
let count = document.getElementById("course_count");
let btn = document.getElementById("first_button");

let results = document.getElementById("courseDetails");
let errorDiv = document.getElementById("error-container");
let errorTextElement = errorDiv.getElementsByClassName("alert alert-danger")[0];
let frmLabel = document.getElementById("formLabel");

// if (myForm) {
//   myForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     if (count.value) {
//       try {
//         errorDiv.classList.add("hidden");
//         btn.style.visibility = "hidden";
//         btn.style.display = "none";

//         while (results.hasChildNodes()) {
//           results.removeChild(results.lastChild);
//         }
//         let second_form = document.createElement("form");
//         second_form.action = "/courses";
//         second_form.method = "post";

//         let courseLabel = document.createElement("label");
//         courseLabel.innerHTML = "Enter Course Names: ";
//         courseLabel.className = "row pt-4";
//         second_form.appendChild(courseLabel);
//         second_form.appendChild(document.createElement("br"));
//         for (let i = 0; i < parseInt(count.value); i++) {
//           let courseName = document.createElement("input");
//           courseName.id = "CourseName" + (i + 1);
//           courseName.placeholder = "Course " + (i + 1);

//           second_form.appendChild(courseName);
//           second_form.appendChild(document.createElement("br"));
//         }

//         let btn2 = document.createElement("button");
//         btn2.innerHTML = "Add Course Names";
//         btn2.id = "second_button";
//         btn2.className = "btn1";
//         btn2.type = "submit";
//         second_form.appendChild(btn2);
//         results.appendChild(second_form);

//         btn2.addEventListener("click", () => {
//           event.preventDefault();
//           second_form.submit(); // submit form programmatically
//         });
//       } catch (e) {
//         const message = typeof e === "string" ? e : e.message;
//         errorTextElement.textContent = e;
//         errorDiv.classList.remove("hidden");
//       }
//     } else {
//       count.value = "";
//       errorDiv.hidden = false;
//       errorDiv.innerHTML = "You must enter a value";
//       frmLabel.className = "error";
//       count.focus();
//       count.className = "inputClass";
//     }
//   });
// }
if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (count.value) {
      try {
        errorDiv.classList.add("hidden");
        btn.style.visibility = "hidden";
        btn.style.display = "none";

        while (results.hasChildNodes()) {
          results.removeChild(results.lastChild);
        }
        let second_form = document.createElement("form");
        second_form.action = "/courses";
        second_form.method = "post";

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

          second_form.appendChild(courseName);
          second_form.appendChild(document.createElement("br"));
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = "Add Course Names";
        btn2.id = "second_button";
        btn2.className = "btn1";
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
          console.log(courseNames);
          second_form.submit(); // submit form programmatically
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
