// This data file should export all functions using the ES6 standard as shown in the lecture code

import {ObjectId} from 'mongodb';
import validator from '../validator.js';
import {descriptionCollection} from '../config/mongoCollections.js';
let exportedMethods = {
  async get(assignmentId) {

    assignmentId = validator.checkId(assignmentId);
    
    let description=false
    const descriptionInfo = await descriptionCollection();
    let descriptionList = await descriptionInfo.find({}).toArray();
    for(let i=0;i<descriptionList.length;i++)
    {
      let single_description=descriptionList[i]
      for(let [key,value] of Object.entries(single_description)){
        if(key==="assignments"){
          let assignmentList=value
          for(let j=0;j<assignmentList.length;j++){
            for(let [key2,value2] of Object.entries(assignmentList[j])){
              if(new ObjectId(assignmentId).equals(value2)){
                return assignmentList[j]
              }
            }
          }
        }
      }   
    }
    
    if (!description) throw [404,'Assignment not found'];
    // return description;
  },

  async getAll(descriptionId) {

    descriptionId = validator.checkId(descriptionId);
    
    const descriptionInfo = await descriptionCollection();
    const description = await descriptionInfo.findOne({_id: new ObjectId(descriptionId)});

    if (!description) throw [404,'Course Description not found'];
    
    if(!description.assignments) throw [404,'Assignments not found for this course description'];
    return description.assignments;
  },  
  async create(descriptionId, assignmentName, type, status, dateOfSubmission, dateOfInitialization, dateOfCompletion, notes) {
    descriptionId = validator.checkId(descriptionId);

    const descriptionInfo = await descriptionCollection();
    const oldData = await descriptionInfo.findOne({_id: new ObjectId(descriptionId)});

    let oldAssignments=[]
    let newAssignment = {
      _id: new ObjectId(),
      assignmentName: assignmentName,
      type: type,
      status: status,
      dateOfSubmission: dateOfSubmission,
      dateOfInitialization: dateOfInitialization,
      dateOfCompletion: dateOfCompletion,
      notes: notes
    };

    const descriptionAssignments= await this.getAll(descriptionId);
    oldAssignments=descriptionAssignments
    oldAssignments.push(newAssignment)

    let updatedAssignmentData = {
        course_id: oldData.course_id,
        assignmentsCount: oldData.assignmentsCount,
        hasExam: oldData.hasExam,
        weightage: oldData.weightage, 
        assignments: oldAssignments
    };

    const updateInfo = await descriptionInfo.findOneAndReplace(
      {_id: new ObjectId(descriptionId)},
      updatedAssignmentData,
      {returnDocument: 'after'}
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [404, `Update failed! Could not update course description with id ${descriptionId}`];

    const resultdescription = await descriptionInfo.findOne({_id: new ObjectId(descriptionId)});
    return resultdescription;
  },
  async remove(assignmentId) {

    assignmentId = validator.checkId(assignmentId);
    const descriptionInfo = await descriptionCollection();
    let descriptionList = await descriptionInfo.find({}).toArray();
    let flag=false
    for(let i=0;i<descriptionList.length;i++)
    {
      let single_description=descriptionList[i]
      for(let [key,value] of Object.entries(single_description)){
        if(key==="assignments"){
          let assignmentList=value
          for(let j=0;j<assignmentList.length;j++){
            for(let [key2,value2] of Object.entries(assignmentList[j])){
              if(new ObjectId(assignmentId).equals(value2)){
                assignmentList.splice(j,1)
                let updatedDescriptionData = {
                    course_id: single_description.course_id,
                    assignmentsCount: single_description.assignmentsCount,
                    hasExam: single_description.hasExam,
                    weightage: single_description.weightage,
                    assignments: assignmentList
                };
                flag =true
                const updateInfo = await descriptionInfo.findOneAndReplace(
                  {_id: single_description._id},
                  updatedDescriptionData,
                  {returnDocument: 'after'}
                );
                if (updateInfo.lastErrorObject.n === 0)
                  throw [404, `No Assignment found with id ${assignmentId}`];

                return {"assignmentId":value2, "deleted": true};

              }
            }
          }
        }
      }   
    }

    if (flag===false)
      throw [404, `Could not find Aassignment with id of ${albumId}`];
 },
 async update(descriptionId, assignmentId, assignmentName, type, status, dateOfSubmission, dateOfInitialization, dateOfCompletion, notes) {
  descriptionId = validator.checkId(descriptionId);

  const descriptionInfo = await descriptionCollection();
  const oldData = await descriptionInfo.findOne({_id: new ObjectId(descriptionId)});
  const descriptionAssignments= await this.get(assignmentId);

  console.log(oldData)
  let flag=false
  if(descriptionAssignments.assignmentName!==assignmentName) flag = true
  if(descriptionAssignments.type!==type) flag = true
  if(descriptionAssignments.status!==status) flag = true
  if(descriptionAssignments.dateOfSubmission!==dateOfSubmission) flag = true
  if(descriptionAssignments.dateOfInitialization!==dateOfInitialization) flag = true
  if(descriptionAssignments.dateOfCompletion!==dateOfCompletion) flag = true
  if(descriptionAssignments.notes!==notes) flag = true

  if(flag===false) throw [400,'No new values to update'];

  let oldAssignments=[]
  let newAssignment = {
    _id: assignmentId,
    assignmentName: assignmentName,
    type: type,
    status: status,
    dateOfSubmission: dateOfSubmission,
    dateOfInitialization: dateOfInitialization,
    dateOfCompletion: dateOfCompletion,
    notes: notes
  };

  // const removedAssignments= await this.remove(assignmentId);
  
  // const updatedAssignments= await this.create(assignmentId)


  // console.log(descriptionAssignments)
  // oldAssignments=descriptionAssignments
  // console.log(oldAssignments)
  // oldAssignments.push(newAssignment)

  let updatedAssignmentData = {
      course_id: oldData.course_id,
      assignmentsCount: oldData.assignmentsCount,
      hasExam: oldData.hasExam,
      weightage: oldData.weightage, 
      assignments: newAssignment
  };

  const updateInfo = await descriptionInfo.findOneAndReplace(
    {_id: new ObjectId(descriptionId)},
    updatedAssignmentData,
    {returnDocument: 'after'}
  );
  if (updateInfo.lastErrorObject.n === 0)
    throw [404, `Update failed! Could not update course description with id ${descriptionId}`];

  const resultdescription = await descriptionInfo.findOne({_id: new ObjectId(descriptionId)});
  return resultdescription;
}
};

export default exportedMethods;