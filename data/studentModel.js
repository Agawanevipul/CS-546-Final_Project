import { studentCollection } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import validator from '../validator.js';
const method = {
  async create(firstName,lastName,emailId,CWID,program,major,password,confirmPassword) {
    firstName = validator.checkString(firstName, 'First Name');
    lastName = validator.checkString(lastName, 'Last Name');
    emailId = validator.checkString(emailId, 'Email Id');
    emailId = validator.validateEmailId(emailId);
    program = validator.checkString(program, 'Program');
    major = validator.checkString(major, 'Major');
    password = validator.checkString(password, 'Password');
    password = validator.validPassword(password);
    confirmPassword = validator.checkString(confirmPassword, 'Confirm Password')
    confirmPassword = validator.validPassword(confirmPassword);

    const infoCollection = await studentCollection();

    const salt = await bcrypt.genSalt(10);
    const passwords = await bcrypt.hash(password, salt);
    const confirmPasswords = await bcrypt.hash(confirmPassword, salt);

    const student = await infoCollection.findOne({emailId: emailId})
    if(student){
      throw `you are already registered. Please login to the system.`
    }
    let obj1 = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      campus_id: CWID,
      program: program,
      major: major,
      password:passwords,
      confirmPassword:confirmPasswords
    };
    const insertInfo = await infoCollection.insertOne(obj1);
    return insertInfo
  },
  async get_details(email_id, password){
    email_id = validator.checkString(email_id, 'Email Id');
    email_id = validator.validateEmailId(email_id);
    password = validator.checkString(password, 'Password');
    let isValid = false;

    const studentInfo = await studentCollection();
    const info_obj = await studentInfo.findOne({emailId: email_id});
    if (!info_obj) {throw 'You need to register for the access!!';}

    isValid = await bcrypt.compare(password, info_obj.password);
    if(isValid === false){
       throw `Password does not match.`
    }

    return info_obj
},

async remove(id) {
  if (!id) throw [400,'You must provide an id to search for'];
  if (typeof id !== 'string') throw [400,'Id must be a string'];
  if (id.trim().length === 0)
    throw [400,'id cannot be an empty string or just spaces'];
  id = id.trim();
    if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
      throw [400,'Invalid input provided for id'];
    }
  if (!ObjectId.isValid(id)) throw [400,'invalid object ID'];

  const studentInfo = await studentCollection();
  const deletionInfo = await studentInfo.findOneAndDelete({
    _id: new ObjectId(id)
  });

  if (deletionInfo.lastErrorObject.n === 0) {
    throw [404,`Could not delete band with id of ${id}`];
  }
  let result={"studentId": id, "deleted": true}
  return result;
},
};
export default method;
