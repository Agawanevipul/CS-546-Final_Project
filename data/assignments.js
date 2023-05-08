// This data file should export all functions using the ES6 standard as shown in the lecture code

import { ObjectId } from "mongodb";
import validator from "../validator.js";
import { descriptionCollection } from "../config/mongoCollections.js";

let exportedMethods = {
  async get(assignmentId) {
    assignmentId = validator.checkId(assignmentId, "Assignment ID");
    let description = false;
    const descriptionInfo = await descriptionCollection();
    let descriptionList = await descriptionInfo.find({}).toArray();
    for (let i = 0; i < descriptionList.length; i++) {
      let single_description = descriptionList[i];
      for (let [key, value] of Object.entries(single_description)) {
        if (key === "assignments") {
          let assignmentList = value;
          for (let j = 0; j < assignmentList.length; j++) {
            for (let [key2, value2] of Object.entries(assignmentList[j])) {
              if (new ObjectId(assignmentId).equals(value2)) {
                return assignmentList[j];
              }
            }
          }
        }
      }
    }

    if (!description) throw [404, "Assignment not found"];
  },
  async getId(assignmentName) {
    assignmentName = validator.checkString(assignmentName, "Assignment Name");
    let description = false;
    const descriptionInfo = await descriptionCollection();
    let descriptionList = await descriptionInfo.find({}).toArray();
    for (let i = 0; i < descriptionList.length; i++) {
      let single_description = descriptionList[i];
      for (let [key, value] of Object.entries(single_description)) {
        if (key === "assignments") {
          let assignmentList = value;
          for (let j = 0; j < assignmentList.length; j++) {
            for (let [key2, value2] of Object.entries(assignmentList[j])) {
              if (assignmentName === value2) {
                return assignmentList[j];
              }
            }
          }
        }
      }
    }

    if (!description) throw [404, "Assignment not found"];
  },

  async getAll(studentId) {
    studentId = validator.checkId(studentId);

    const descriptionInfo = await descriptionCollection();
    const description = await descriptionInfo.findOne({
      _id: new ObjectId(studentId),
    });

    if (!description) throw [404, "No assignments assigned for the student"];

    if (!description.assignments)
      throw [404, "Assignments not found for this student"];
    return description.assignments;
  },

  //function to send all the assignments based on status
  async getAllStatus(studentId) {
    studentId = validator.checkId(studentId);

    const descriptionInfo = await descriptionCollection();
    const descriptionList = await descriptionInfo.findOne({
      _id: new ObjectId(studentId),
    });


    if (!descriptionList)
      throw [404, "No assignments assigned for the student"];


    if (!descriptionList.assignments)
      throw [404, "Assignments not found for this student"];


      let todo_list=[],doing_list=[], done_list=[]
      for (let i = 0; i < descriptionList.assignments.length; i++) {
        let single_description = descriptionList.assignments[i];
        for (let [key, value] of Object.entries(single_description)) {
          if (key === "status") {
            if(value==="to-do"){
              todo_list.push(single_description)
            }
            else if (value==="doing"){
              doing_list.push(single_description)
            }
            else if (value==="done"){
              done_list.push(single_description)
            }
          }
        }
      }
    
    return {todo_list,doing_list,done_list};

  },
  async create(
    studentId,
    assignmentName,
    status,
    priority,
    grade,
    subject,
    dueDate,
    notes
  ) {
    studentId = validator.checkId(studentId, "Student ID");
    assignmentName = validator.checkString(assignmentName, "Assignment Name");
    status = validator.checkString(status, "Status");
    priority = validator.checkString(priority, "Priority");
    grade = validator.checkNumber(grade, "Grade");
    subject = validator.checkString(subject, "Subject");
    dueDate = validator.checkString(dueDate, "Due Date");
    notes = validator.checkString(notes, "Notes");

    const descriptionInfo = await descriptionCollection();
    const oldData = await descriptionInfo.findOne({
      _id: new ObjectId(studentId),
    });

    let oldAssignments = [];
    let newAssignment = {
      _id: new ObjectId(),
      assignmentName: assignmentName,
      status: status,
      priority: priority,
      grade: grade,
      subject: subject,
      dueDate: dueDate,
      notes: notes,
    };

    const descriptionAssignments = await this.getAll(studentId);
    console.log(descriptionAssignments);
    oldAssignments = descriptionAssignments;
    oldAssignments.push(newAssignment);

    let updatedAssignmentData = {
      _id: oldData._id,
      assignments: oldAssignments,
    };

    const updateInfo = await descriptionInfo.findOneAndReplace(
      { _id: new ObjectId(studentId) },
      updatedAssignmentData,
      { returnDocument: "after" }
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [
        404,
        `Update failed! Could not update course description with id ${studentId}`,
      ];

    const resultdescription = await descriptionInfo.findOne({
      _id: new ObjectId(studentId),
    });
    return resultdescription;
  },
  async remove(assignmentId) {
    assignmentId = validator.checkId(assignmentId, "Assignment ID");
    const descriptionInfo = await descriptionCollection();
    let descriptionList = await descriptionInfo.find({}).toArray();
    let flag = false;
    for (let i = 0; i < descriptionList.length; i++) {
      let single_description = descriptionList[i];
      for (let [key, value] of Object.entries(single_description)) {
        if (key === "assignments") {
          let assignmentList = value;
          for (let j = 0; j < assignmentList.length; j++) {
            for (let [key2, value2] of Object.entries(assignmentList[j])) {
              if (new ObjectId(assignmentId).equals(value2)) {
                assignmentList.splice(j, 1);
                let updatedDescriptionData = {
                  assignments: assignmentList,
                };
                flag = true;
                const updateInfo = await descriptionInfo.findOneAndReplace(
                  { _id: single_description._id },
                  updatedDescriptionData,
                  { returnDocument: "after" }
                );
                if (updateInfo.lastErrorObject.n === 0)
                  throw [404, `No Assignment found with id ${assignmentId}`];

                return { assignmentId: value2, deleted: true };
              }
            }
          }
        }
      }
    }

    if (flag === false)
      throw [404, `Could not find Aassignment with id of ${assignmentId}`];
  },
  async update(
    studentId,
    assignmentId,
    assignmentName,
    status,
    priority,
    grade,
    subject,
    dueDate,
    notes
  ) {
    studentId = validator.checkId(studentId, "Student ID");
    assignmentId = validator.checkId(assignmentId, "Assignment ID");
    assignmentName = validator.checkString(assignmentName, "Assignment Name");
    status = validator.checkString(status, "Status");
    priority = validator.checkString(priority, "Priority");
    grade = validator.checkNumber(grade, "Grade");
    subject = validator.checkString(subject, "Subject");
    dueDate = validator.checkString(dueDate, "Due Date");
    notes = validator.checkString(notes, "Notes");

    const descriptionInfo = await descriptionCollection();
    const oldData = await descriptionInfo.findOne({
      _id: new ObjectId(studentId),
    });
    const descriptionAssignments = await this.get(assignmentId);
    let flag = false;
    if (descriptionAssignments.assignmentName !== assignmentName) flag = true;
    if (descriptionAssignments.status !== status) flag = true;
    if (descriptionAssignments.priority !== priority) flag = true;
    if (descriptionAssignments.grade !== grade) flag = true;
    if (descriptionAssignments.subject !== subject) flag = true;
    if (descriptionAssignments.dueDate !== dueDate) flag = true;
    if (descriptionAssignments.notes !== notes) flag = true;

    if (flag === false) throw [400, "No new values to update"];

    const removedAssignments = await this.remove(assignmentId);
    const AssignmentsList = await this.getAll(studentId);

    let oldAssignments = [];
    oldAssignments = AssignmentsList;

    let newAssignment = {
      _id: assignmentId,
      assignmentName: assignmentName,
      status: status,
      priority: priority,
      grade: grade,
      subject: subject,
      dueDate: dueDate,
      notes: notes,
    };
    oldAssignments.push(newAssignment);

    let newInfo = {
      _id: new ObjectId(studentId),
      assignments: oldAssignments,
    };

    const updateInfo = await descriptionInfo.findOneAndReplace(
      { _id: new ObjectId(studentId) },
      newInfo,
      { returnDocument: "after" }
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [
        404,
        `Update failed! Could not update course description with id ${studentId}`,
      ];

    const resultdescription = await descriptionInfo.findOne({
      _id: new ObjectId(studentId),
    });
    return resultdescription;
  },
};

export default exportedMethods;
