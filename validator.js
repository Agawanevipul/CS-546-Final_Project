import { ObjectId } from "mongodb";

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== "string") throw `Error:${varName}: must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName}: invalid object ID`;
    return id;
  },

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
  checkAssignmentsArray(arr, varName) {
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;

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
    if (!inp) throw `You must provide a number of ${varName}`;
    if (typeof parseInt(inp) !== "number")
      throw `You must provide a number for ${varName}`;
    return inp;
  },
  validateEmailId(email) {
    email = email.trim().toLowerCase();
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
    if (
      !upperCase.test(password) ||
      !numberCase.test(password) ||
      !specialCharCase.test(password)
    ) {
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
    name = name.trim();
    let nameValid = /^[a-zA-Z]/; // Regular expression to match valid firstName
    if (!nameValid.test(name)) {
      throw `Invalid ${varName} name.`;
    }
    if (name.length < 2 || name.length > 25)
      throw `name should be in length between 2 to 25.`;
    return name;
  },
};

export default exportedMethods;
