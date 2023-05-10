import courseCollection from './data/courseModel.js';
import studentCollection from './data/studentModel.js';
import descriptionCollection from './data/description.js';
import assignmentSubCollection from './data/assignments.js';

import {dbConnection, closeConnection} from './config/mongoConnection.js';

//drops the database each time this is run
const db = await dbConnection();
await db.dropDatabase();
async function main() {

  try {
    const createStudent = await studentCollection.create('Hansi', 'Mamidi', 'smamidi231@stevens.edu','20012906', 'CS', 'Masters', 'Hansi@123', 'Hansi@123');
    const createCourse = await courseCollection.create(createStudent.insertedId.toString(), "1", "2", ["CS 546","CS 570"]);
    const createAssignments = await assignmentSubCollection.create(createStudent.insertedId.toString(),
      "Text Mining1",
      "to-do",
      "low",
      "0",
      "CS 570",
      "02-02-2023",
      "Use the UCI SMS Data")
      console.log("seed 1")
  } catch (e) {
    console.log(e);
  }
  try {
    const createStudent = await studentCollection.create('Aditya', 'Mandaliya', 'aditya123@stevens.edu','20012908', 'CS', 'Masters', 'Aditya@123', 'Aditya@123');
    const createCourse = await courseCollection.create(createStudent.insertedId.toString(), "1", "2", ["CS 546","CS 570"]);
    const createAssignments = await assignmentSubCollection.create(createStudent.insertedId.toString(),
      "Data Mining",
      "to-do",
      "medium",
      "0",
      "CS 570",
      "02-02-2023",
      "Just mining data")
      console.log("seed 2")
  } catch (e) {
    console.log(e);
  }
  try {
    const createStudent = await studentCollection.create('Vipul', 'Agawane', 'vagawane@stevens.edu','20012966', 'BIA', 'Masters', 'Vipul@123', 'Vipul@123');
    const createCourse = await courseCollection.create(createStudent.insertedId.toString(), "1", "2", ["CS 546","CS 570"]);
    const createAssignments = await assignmentSubCollection.create(createStudent.insertedId.toString(),
      "Web Mining",
      "doing",
      "high",
      "0",
      "CS 570",
      "02-02-2023",
      "Totally")
      console.log("seed3")
  } catch (e) {
    console.log(e);
  }
  }
  main()