import { studentCollection } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
// import validation from '../helpers.js';
const method = {
  async create(
    first_Name,
    last_Name,
    emailId,
    password,
    stevensId,
    program,
    degree,
    year_Completion
  ) {
    const salt = await bcrypt.genSalt(10);
    const passwords = await bcrypt.hash(password, salt);
    const student_id = new ObjectId();
    let obj1 = {
      _id: student_id,
      student_id,
      first_Name: first_Name,
      last_Name: last_Name,
      emailId: emailId,
      password: passwords,
      stevensId: stevensId,
      program: program,
      degree: degree,
      year_Completion: year_Completion,
    };
    const infoCollection = await studentCollection();
    const insertInfo = await infoCollection.insertOne(obj1);

    const newId = insertInfo.insertedId.toString();
  },
};
export default method;
