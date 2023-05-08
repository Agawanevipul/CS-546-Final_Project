let myForm = document.getElementById("coursesID");
let count = document.getElementById("course_count");
let btn = document.getElementById("button");
// let btn2=document.getElementById("button2");
let results = document.getElementById("courseDetails");
let errorDiv = document.getElementById("error-container");
let errorTextElement = errorDiv.getElementsByClassName("alert alert-danger")[0];
let frmLabel = document.getElementById("formLabel");

// let myDl = document.getElementById('courses');

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
        let second_form = document.createElement("form")
        second_form.action='/courses'
        second_form.method="post"
        // results.appendChild(second_form)

        let courseLabel = document.createElement("label");
        courseLabel.innerHTML = "Enter Course Names: ";
        courseLabel.className = "row pt-4";
        second_form.appendChild(courseLabel);
        second_form.appendChild(document.createElement("br"));
        for (let i = 0; i < parseInt(count.value); i++) {
          let courseName = document.createElement("input");
          courseName.id = "CourseName" + (i + 1)
          courseName.placeholder = "Course " + (i + 1);
          // courseName.innerHTML = document.getElementById("Course" + (i + 1)).value;
          // results.appendChild(courseName);
          // let input_value=courseName.value;
          // courseName.value=input_value
          second_form.appendChild(courseName)
          second_form.appendChild(document.createElement("br"));
        }

        let btn2 = document.createElement("button");
        btn2.innerHTML = "Add Course Names";
        btn2.id = "second_button";
        btn2.className = "btn1";
        btn2.type = "submit";
        second_form.appendChild(btn2);
        results.appendChild(second_form);
        // second_form.submit();
        
        // for (let i = 0; i < parseInt(count.value); i++) {
        //   let courseName = document.getElementById("Course" + (i + 1)).value;
        //   results.appendChild(courseName)
        // }

        // second_form.addEventListener("submit", (event) => {
        //   event.preventDefault();
        //   let input_values = second_form.getElementsByTagName("input");
        //   let courseValues=[];
        //   for(let i=0;i<input_values.length;i++){
        //     courseValues.push(input_values[i].value)
        //   }
        //   second_form.submit();
        // });
        // let input_values = myForm.getElementsByTagName("input");
        // let courseValues=[];
        // for(let i=0;i<input_values.length;i++){
        //   courseValues.push(input_values[i].value)
        // }
        btn2.addEventListener("click", () => {
          event.preventDefault();
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
  // myForm.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   let input_values = myForm.getElementsByTagName("input");
  //   let courseValues=[];
  //   for(let i=0;i<input_values.length;i++){
  //     courseValues.push(input_values[i].value)
  //   }
  //   myForm.submit();
  // });
  // btn.addEventListener("click", () => {
  //   // event.preventDefault();
  //   myForm.submit(); // submit form programmatically
  // });
}
