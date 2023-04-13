import { studentCollection } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
// import validation from '../helpers.js';
const method = {
  async create(
    first_name,
    last_name,
    email_id,
    CWID,
    program,
    major,
    password,
    // year_Completion
  ) {
    const salt = await bcrypt.genSalt(10);
    const passwords = await bcrypt.hash(password, salt);
    const student_id = new ObjectId();
    let obj1 = {
      _id: student_id,
      student_id,
      first_name: first_name,
      last_name: last_name,
      email_id: email_id,
      campus_id: CWID,
      program: program,
      major: major,
      password:passwords
      // year_Completion: year_Completion,
    };
    const infoCollection = await studentCollection();
    const insertInfo = await infoCollection.insertOne(obj1);
    // const newId = insertInfo.insertedId.toString();
  }
};
export default method;
