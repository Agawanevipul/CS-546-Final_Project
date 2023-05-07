// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

(function () {
    // import validator from '../validator.js';
    // console.log("entering forms.js")
    const validator = {
      
        checkString(strVal, varName) {
          if (!strVal) throw `Error: You must supply a ${varName}!`;
          if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
          strVal = strVal.trim();
          if (strVal.length === 0)
            throw `Error: ${varName} cannot be an empty string or string with just spaces`;
          if (!isNaN(strVal))
            throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
          return strVal;
        },
      
        checkStringArray(arr, varName) {
          //We will allow an empty array for this,
          //if it's not empty, we will make sure all tags are strings
          if (!arr || !Array.isArray(arr))
            throw `You must provide an array of ${varName}`;
          for (let i in arr) {
            if (typeof arr[i] !== "string" || arr[i].trim().length === 0) {
              throw `One or more elements in ${varName} array is not a string or is an empty string`;
            }
            arr[i] = arr[i].trim();
          }
          return arr;
        },
        checkAssignmentsArray(arr,varName){
          if (!arr || !Array.isArray(arr))
            throw `You must provide an array of ${varName}`;
          
          for(let j in arr){
              if(typeof(j)!=="string") throw [400,'Assignments should have string values']
              j = j.trim();
              if (j.trim().length === 0) throw [400,'Assignment cannot have an empty string or string with just spaces in it'];
            }
      
            if(arr[1].toLowerCase() !== "to-do" | arr[1].toLowerCase() !== "doing" | arr[1].toLowerCase() !== "done") 
              throw [400,'Status should be To-do or Doing or Done']
            
            let dateformat=arr[2].split("/")
            if(dateformat[0].length!==2) throw [400,'Append 0 in front if the month is less than 10'];
            if(dateformat[1].length!==2) throw [400,'Append 0 in front if the day is less than 10'];
            if(dateformat[2].length!==4) throw [400,'Invalid year'];
            if(dateformat.length!==3) throw [400,'Release date should be of the format(DD/MM/YYYY)'];
            if((parseInt(dateformat[0])<1) || (parseInt(dateformat[0])>12) || (parseInt(dateformat[1])<1) || (parseInt(dateformat[1])>31) || (parseInt(dateformat[2])<1900) || (parseInt(dateformat[2])>2023))
            throw [400,'Invalid Release date'];
      
          return arr
      
        },
        checkNumber(inp, varName) {
          if (!inp) throw `You must provide a number for ${varName}`;
          if (typeof(parseInt(inp))!=='number')
            throw `You must provide a number for ${varName}`;
          return inp;
        },
        validateEmailId(email) {
          email=email.toLowerCase().trim()
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!regex.test(email)) {
            throw "Invalid email address";
          }
          if (!email.endsWith("@stevens.edu")) {
            throw "Email domain must be @stevens.edu";
          }
          if (!/^[^\s@]{3,}@stevens\.edu$/.test(email)) {
            throw "Email address must have at least 3 characters before the @stevens.edu domain";
          }
      
          return email;
        },
        validPassword(password) {
          if (!password || password.length < 8 || password.includes(" ")) {
              throw `Password must be at least 8 characters long and cannot contain empty spaces.`;
          }
          const upperCase = /[A-Z]/;
          const numberCase = /[0-9]/;
          const specialCharCase = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
          if (!upperCase.test(password) || !numberCase.test(password) || !specialCharCase.test(password)) {
              throw `Password must contain at least one uppercase character, one number, and one special character.`;
          }
              return password;
          },
          validRole(role) {
              role = role.toLowerCase();
            
              if (role !== "admin" && role !== "user") {
                throw `Role must be either 'admin' or 'user'`;
              }
              return role;
          },
          validName(name, varName) {
              name=name.trim()
              let nameValid = /^[a-zA-Z]/; // Regular expression to match valid firstName
              if(!nameValid.test(name)){
                  throw `Invalid ${varName} name.`
              }
              if (name.length < 2 || name.length > 25)
              throw `name should be in length between 2 to 25.`;
              return name;
          }   
      };
      
    function registerValidation(firstName,lastName,emailId,CWID,program,major,password,confirmPassword) {
        firstName = validator.checkString(firstName, 'First Name');
        lastName = validator.checkString(lastName, 'Last Name');
        emailId = validator.checkString(emailId, 'Email Id');
        emailId = validator.validateEmailId(emailId);
        CWID  = validator.checkNumber(CWID,'CWID')
        // console.log(CWID)
        program = validator.checkString(program, 'Degree');
        major = validator.checkString(major, 'Major');
        password = validator.checkString(password, 'Password');
        password = validator.validPassword(password);
        confirmPassword = validator.checkString(confirmPassword, 'Confirm Password')
        confirmPassword = validator.validPassword(confirmPassword);
        return true;
      }

      function loginValidation(email_id, password){
        email_id = validator.checkString(email_id, 'Email Id');
        email_id = validator.validateEmailId(email_id);
        password = validator.checkString(password, 'Password');
        return true;

      }
      
    const staticForm = document.getElementById('register');
    const loginForm = document.getElementById('login');
  
    if (staticForm) {
      // We can store references to our elements; it's better to
      // store them once rather than re-query the DOM traversal each time
      // that the event runs.

      //
    //   firstName,lastName,emailId,CWID,program,major,password,confirmPassword
        let firstNameInput = document.getElementById('first_name');
        let lastNameInput = document.getElementById('last_name');
        let emailIdInput = document.getElementById('email_id');
        let CWIDInput = document.getElementById('cwid')
        let programInput = document.getElementById('program')
        let majorInput = document.getElementById('major')
        let passwordInput = document.getElementById('create_pass');
        let confirmPasswordInput = document.getElementById('confirm_pass');
  
        let errorContainer = document.getElementById('error-container');
        let errorTextElement = errorContainer.getElementsByClassName('alert alert-danger')[0];
    
        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        try {
            errorContainer.classList.add('hidden');
            // hide containers by default
            // errorContainer.classList.remove('hidden');
            // errorContainer.hidden= True;
            
            // Values come from inputs as strings, no matter what :(
            let firstName = firstNameInput.value;
            let lastName = lastNameInput.value;
            let emailId = emailIdInput.value;
            let CWID = CWIDInput.value;
            let program = programInput.value;
            let major = majorInput.value;
            
            let password = passwordInput.value;
            let confirmPassword = confirmPasswordInput.value;
        
            let result = registerValidation(firstName,lastName,emailId,CWID,program,major,password,confirmPassword)
            staticForm.submit();

        } catch (e) {
          const message = typeof e === 'string' ? e : e.message;
          errorTextElement.textContent = e;
          errorContainer.classList.remove('hidden');
        }
      });
    }
    if (loginForm) {
        // We can store references to our elements; it's better to
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
          
          let emailAddressInput = document.getElementById('emailId');
          let passwordInput = document.getElementById('password');
    
          let errorContainer = document.getElementById('error-container');
          let errorTextElement = errorContainer.getElementsByClassName('alert alert-danger')[0];
    
          // We can take advantage of functional scoping; our event listener has access to its outer functional scope
          // This means that these variables are accessible in our callback
          loginForm.addEventListener('submit', (event) => {
          event.preventDefault();
    
          try {
            // hide containers by default
            errorContainer.classList.add('hidden');
    
            // Values come from inputs as strings, no matter what :(
            
              let emailAddress = emailAddressInput.value;
              let password = passwordInput.value;
              
          
              let result = loginValidation( emailAddress, password)
              loginForm.submit();
  
          } catch (e) {
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.classList.remove('hidden');
          }
        });
      }
    
  })();
  