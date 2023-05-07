import {courseCollection} from "../config/mongoCollections.js";
import {dbConnection, closeConnection} from './config/mongoConnection.js';
import studentCollection from './data/studentModel.js';
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
      const createCourse = await courseCollection.create("644849bc2652323de57ffad6", 2, 3, ['CS 546', 'CS 583', 'BIA 678'],[["Lab1","coding","to do","01/30/2023","01/21/2023","01/28/2023","This is my notes"]]);
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
  main()