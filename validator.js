import { ObjectId } from "mongodb";

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw [400,`You must provide a ${varName}`];
    if (typeof id !== "string") throw [400, `${varName}: must be a string`];
    id = id.trim();
    if (id.length === 0)
      throw [400,`${varName} cannot be an empty string or just spaces`];
    if (!ObjectId.isValid(id)) throw [400,` ${varName}: invalid object ID`];
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw [400,`You must supply a ${varName}!`];
    if (typeof strVal !== "string") throw [400,`${varName} must be a string!`];
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw [400,`${varName} cannot be an empty string or string with just spaces`];
    if (!isNaN(strVal))
      throw [400,`${strVal} is not a valid value for ${varName} as it only contains digits`];

      if(varName === 'First Name' | varName === 'Last Name'){
        if(!strVal.match(/^[a-z ,.'-]+$/gi)){
          throw [400,`${varName} shouldn't contain numbers`]
        }
        if(!(strVal.length>1 & strVal.length<25)) throw [400,`${varName} should contain atleast 2 characters and less than 26 characters`] 
      }
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw [400,`You must provide an array of ${varName}`];
    for (let i in arr) {
      if (typeof arr[i] !== "string" || arr[i].trim().length === 0) {
        throw [400,`One or more elements in ${varName} array is not a string or is an empty string`];
      }
      arr[i] = arr[i].trim();
    }
    return arr;
  },
  checkAssignmentsArray(arr, varName) {
    if (!arr || !Array.isArray(arr))
      throw [400,`You must provide an array of ${varName}`];

    for (let j in arr) {
      if (typeof j !== "string")
        throw [400, "Assignments should have string values"];
      j = j.trim();
      if (j.trim().length === 0)
        throw [
          400,
          "Assignment cannot have an empty string or string with just spaces in it",
        ];
    }

    if (
      (arr[1].toLowerCase() !== "to-do") |
      (arr[1].toLowerCase() !== "doing") |
      (arr[1].toLowerCase() !== "done")
    )
      throw [400, "Status should be To-do or Doing or Done"];

    let dateformat = arr[2].split("/");
    if (dateformat[0].length !== 2)
      throw [400, "Append 0 in front if the month is less than 10"];
    if (dateformat[1].length !== 2)
      throw [400, "Append 0 in front if the day is less than 10"];
    if (dateformat[2].length !== 4) throw [400, "Invalid year"];
    if (dateformat.length !== 3)
      throw [400, "Release date should be of the format(DD/MM/YYYY)"];
    if (
      parseInt(dateformat[0]) < 1 ||
      parseInt(dateformat[0]) > 12 ||
      parseInt(dateformat[1]) < 1 ||
      parseInt(dateformat[1]) > 31 ||
      parseInt(dateformat[2]) < 1900 ||
      parseInt(dateformat[2]) > 2023
    )
      throw [400, "Invalid Release date"];

    return arr;
  },
  checkNumber(inp, varName) {
    if (!inp) throw [400,`You must provide a number of ${varName}`];
    if (typeof parseInt(inp) !== "number")
      throw [400,`You must provide a number for ${varName}`];
    if(varName === 'CWID'){
      if(inp.toString().length !== 8) throw [400,'CWID must contain 8 digits']
    }
    return inp;
  },
  validateEmailId(email) {
    email = email.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      throw [400,"Invalid email address"];
    }
    if (!email.endsWith("@stevens.edu")) {
      throw [400,"Email domain must be @stevens.edu"];
    }
    if (!/^[^\s@]{3,}@stevens\.edu$/.test(email)) {
      throw [400,"Email address must have at least 3 characters before the @stevens.edu domain"];
    }

    return email;
  },
  validPassword(password) {
    if (!password || password.length < 8 || password.includes(" ")) {
      throw [400,`Password must be at least 8 characters long and cannot contain empty spaces.`];
    }
    const upperCase = /[A-Z]/;
    const numberCase = /[0-9]/;
    const specialCharCase = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (
      !upperCase.test(password) ||
      !numberCase.test(password) ||
      !specialCharCase.test(password)
    ) {
      throw [400,`Password must contain at least one uppercase character, one number, and one special character.`];
    }
    return password;
  },

  validName(name, varName) {
    name = name.trim();
    let nameValid = /^[a-zA-Z]/; // Regular expression to match valid firstName
    if (!nameValid.test(name)) {
      throw [400,`Invalid ${varName} name.`];
    }
    if (name.length < 2 || name.length > 25)
      throw [400,`name should be in length between 2 to 25.`];
    return name;
  },
};

export default exportedMethods;
