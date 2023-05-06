import { studentCollection } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import validator from '../validator.js';
import assignments from "./description.js";

const method = {
  async create(firstName,lastName,emailId,CWID,program,major,password,confirmPassword) {
    firstName = validator.checkString(firstName, 'First Name');
    lastName = validator.checkString(lastName, 'Last Name');
    emailId = validator.checkString(emailId, 'Email Id');
    emailId = validator.validateEmailId(emailId);
    CWID  = validator.checkNumber(parseInt(CWID.trim()),'CWID')
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
    let info = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      campus_id: CWID,
      program: program,
      major: major,
      password:passwords,
      confirmPassword:confirmPasswords
    };

    const insertInfo = await infoCollection.insertOne(info);
    console.log(insertInfo)
    const insertAssignment = await assignments.create(insertInfo.insertedId.toString(),[])
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

  id= validator.checkId(id,'Student ID')
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
async get(id) {
  id= validator.checkId(id,'Student ID')
  const studentInfo = await studentCollection()
  const student = await studentInfo.findOne({_id: new ObjectId(id)});
  if (student === null) throw [404,'No student with that id'];
  student._id = student._id.toString();
  return student
},

async update(id,firstName,lastName,emailId,CWID,program,major,password,confirmPassword) {

    id= validator.checkId(id,'Student ID')
    firstName = validator.checkString(firstName, 'First Name');
    lastName = validator.checkString(lastName, 'Last Name');
    emailId = validator.checkString(emailId, 'Email Id');
    emailId = validator.validateEmailId(emailId);
    CWID  = validator.checkNumber(parseInt(CWID.trim()),'CWID')
    program = validator.checkString(program, 'Program');
    major = validator.checkString(major, 'Major');
    password = validator.checkString(password, 'Password');
    password = validator.validPassword(password);
    confirmPassword = validator.checkString(confirmPassword, 'Confirm Password')
    confirmPassword = validator.validPassword(confirmPassword);


  const oldData = await this.get(id);
  let new_flag=false
  if(firstName!==oldData.firstName) new_flag=true
  if(lastName!==oldData.lastName) new_flag=true
  if(emailId!==oldData.emailId) new_flag=true
  if(program!==oldData.program) new_flag=true

  let compareToPassword = false;
  compareToPassword = await bcrypt.compare(password, oldData.password);
  // console.log(password,oldData.password,"first")
  //   console.log(compareToPassword)
  if (!compareToPassword) {
    new_flag=true
  }

  compareToPassword = false;
  compareToPassword = await bcrypt.compare(confirmPassword, oldData.confirmPassword);
    // console.log(compareToPassword)
  if (!compareToPassword) {
    new_flag=true
  }
  
  
  if (!(password===confirmPassword)) {
    throw 'Passwords donot match'
  }

  const salt = await bcrypt.genSalt(10);
    const passwords = await bcrypt.hash(password, salt);
    const confirmPasswords = await bcrypt.hash(confirmPassword, salt);

  if(new_flag===false) throw [400,'No new values to update'];
  let updatedStudentData = {
    firstName: firstName,
    lastName: lastName,
    emailId: emailId,
    CWID: CWID,
    program: program,
    password: passwords,
    confirmPassword: confirmPasswords 
  };
  const studentInfo = await studentCollection()
  const updateInfo = await studentInfo.findOneAndReplace(
    {_id: new ObjectId(id)},
    updatedStudentData,
    {returnDocument: 'after'}
  );
  if (updateInfo.lastErrorObject.n === 0)
    throw [404, `Update failed! Could not update student details with id ${id}`];

  const result = await studentInfo.findOne({_id: new ObjectId(id)});
  return result;
}
};
export default method;
