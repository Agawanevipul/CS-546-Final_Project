import courseCollection from './data/courseModel.js';
import studentCollection from './data/studentModel.js';
import descriptionCollection from './data/description.js';
import assignmentSubCollection from './data/assignments.js';

import {dbConnection, closeConnection} from './config/mongoConnection.js';

//drops the database each time this is run
const db = await dbConnection();
// await db.dropDatabase();
async function main() {

  // try {
  //   const createCourse = await descriptionCollection.create("64559ffa6026ec55932ffee8",[{"assignmentName":"Lab1", "status":"to do","priority":"High","grade":"100","subject":"CS 546", "dateOfSubmission":"01/30/2023","notes":"This is my notes"}]);
  //   // const createCourse = await descriptionCollection.get("64559ffa6026ec55932ffee8")
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const createCourse = await studentCollection.create('Hahaha', 'its me', 'smamidi231@stevens.edu','20012906', 'CS', 'Masters', 'Hansi@123', 'Hansi@123');
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }
  try {
      const createCourse = await courseCollection.getCourses("645abd133fc537eddc388854");
      console.log(createCourse);
    } catch (e) {
      console.log(e);
    }

    
  // try {
  //   const createCourse = await studentCollection.update("645032421a1e0700def0535", 'Hahahahahahaha', 'its me', 'smamidi1@stevens.edu','20012906', 'CS', 'Masters', 'Hansi@1234', 'Hansi@1234');
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }

    // try {
    //   const createCourse = await descriptionCollection.update("6451587215cc20281fd0aead","644c7c0b513d644a863c4993", "2",  {"quiz": "5", "assignments": "50", "finalProject":"45"},[{"assignmentName":"Lab1","type":"coding","status":"to do","dateOfSubmission":"01/30/2023","dateOfInitialization":"01/21/2023","dateOfCompletion":"01/28/2023","notes":"This is my notes"}]);
    //   console.log(createCourse);
    // } catch (e) {
    //   console.log(e);
    // }

    // try {
    //   const createCourse = await assignmentSubCollection.create("64514ff9a6e45eb51b0a61c8","Lab1_Updates","coding","to do","01/30/2023","01/21/2023","01/28/2023","This is my notes");
    //   console.log(createCourse);
    // } catch (e) {
    //   console.log(e);
    // }
    try {
      const createCourse = await studentCollection.get_details('testing@stevens.edu', 'Testing@123')

      // const createCourse = await studentCollection.create('Sri Naga Hansi C 546', 'Mamidi', 'smamidi987123887786767778787@stevens.edu', '20012906', 'CS', 'Masters', 'HoneyPinky@123', 'HoneyPinky@123');
      console.log(createCourse);
    } catch (e) {
      console.log(e);
    }

    // try {
    //   // const createCourse = await assignmentSubCollection.update("6455cb99852dbb86e0509142","6455cbcb37f82008b311a56a","Testing","to do","High","90","CS 546", "01/30/2023","This is my notes");
    //   const createCourse = await assignmentSubCollection.getId("Testing")
    //   console.log(createCourse);
    // } catch (e) {
    //   console.log(e);
    // }

 //     try {
  //   const createCourse = await descriptionCollection.get("644c84cc1a0312b461f757f1");
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }


  // try {
  //   const createCourse = await courseCollection.remove("644c7bfb1640bb4a1aad0371");
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const createCourse = await studentCollection.remove("644c7aa05ab9e1bd8a190147");
  //   console.log(createCourse);
  // } catch (e) {
  //   console.log(e);
  // }

  }
  main()