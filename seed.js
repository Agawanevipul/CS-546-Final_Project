import { courseCollection } from "../config/mongoCollections.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import assignmentCollection from "./data/index.js";
//drops the database each time this is run
const db = await dbConnection();
// await db.dropDatabase();
async function main() {
  // try {
  //   const createCourse = await studentCollection.update("644c7b5b8e8d68572c549862", 'Hahaha', 'its me', 'hahaitsme@stevens.edu','20012906', 'CS', 'Masters', 'Hansi@123', 'Hansi@123');
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }

  try {
    const createCourse = await assignmentCollection.create(
      "6457da9fd245d23512542eaa",

      "Title",
      "to do",
      "High",
      "0",
      "CS546",
      "01/30/2023",
      "This is my notes"
    );
    console.log(createCourse);
  } catch (e) {
    console.log(e);
  }

  // try {
  //   const createCourse = await courseCollection.create("BTS", ["Rap", "Solo", "Love", "Motivational", "Self love", "Love"], "http://www.bts777.com", "Bighit", ["RM", "Jin", "Jimin", "JHope", "V", "Suga", "Jungkook",], 2012);
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const createCourse = await courseCollection.create("Black Pink", ["Girls", "Solo", "Love"], "http://www.blackpink.com", "Bighit", ["Rose", "Lisa", "Jennie", "Jisso"], 2014);
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }
}
main();
