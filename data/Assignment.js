import { studentCollection } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
// import validation from '../helpers.js';
const method = {
  async create(firstName,lastName,emailId,CWID,program,major,password,confirmPassword) {
    const salt = await bcrypt.genSalt(10);
    const passwords = await bcrypt.hash(password, salt);
    const confirmPasswords = await bcrypt.hash(confirmPassword, salt);
    const student_id = new ObjectId();
    let obj1 = {
      _id: student_id,
      student_id,
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      campus_id: CWID,
      program: program,
      major: major,
      password:passwords,
      confirmPassword:confirmPasswords
      // year_Completion: year_Completion,
    };
    const infoCollection = await studentCollection();
    const insertInfo = await infoCollection.insertOne(obj1);
  }
};
export default method;
