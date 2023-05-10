import {descriptionCollection} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validator from '../validator.js';

const method = {
    async create(student_id, assignments) {   
      student_id= validator.checkId(student_id,'Student ID')
      // weightage = validator.checkStringObject(weightage, 'Weightage');
      // assignments = validator.checkStringArrayObject(assignments, 'Assignments');

      let newDescription = {
          _id: new ObjectId(student_id),
          assignments: assignments
      };
      const descriptionInfo = await descriptionCollection();
      const insertInfo = await descriptionInfo.insertOne(newDescription)

      if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw [400,'Could not add assignment details'];

      const newId = insertInfo.insertedId;
      return await this.get(newId.toString());
      },
      async get(id){
        id= validator.checkId(id,'Description ID')
        const descriptionInfo = await descriptionCollection();
        const description = await descriptionInfo.findOne({_id: new ObjectId(id)});
        if (!description) throw [404, 'No description found with that id'];
        description._id = description._id.toString();
        return description; 
    },
    async getAll() {
        const descriptionInfo = await descriptionCollection();
        let descriptionList = await descriptionInfo.find({}).toArray();
        if (!descriptionList) throw [400,'Could not get all descriptions'];
        descriptionList = descriptionList.map((element) => {
          element._id = element._id.toString();
          return {"_id":element._id.toString(), "assignments":element.assignments};
        });
        return descriptionList;
    },
    async remove(id) {
      id= validator.checkId(id,'Description ID')
    
      const descriptionInfo = await descriptionCollection();
      const deletionInfo = await descriptionInfo.findOneAndDelete({
        _id: new ObjectId(id)
      });
  
      if (deletionInfo.lastErrorObject.n === 0) {
        throw [404,`Could not delete description details with id of ${id}`];
      }
      let result={"descriptionId": id, "deleted": true}
      return result;
    },
    async update(id,student_id, assignmentsCount, weightage, assignments) {

      id= validator.checkId(id,'Description ID')
      student_id= validator.checkId(student_id,'Student ID')
      assignmentsCount  = validator.checkNumber(parseInt(assignmentsCount.trim()),'Semester')
      // weightage = validator.checkObject(weightage, 'Weightage');
      // assignments = validator.checkArrayObject(assignments, 'Assignments');
    
      const oldData = await this.get(id);
      let new_flag=false
      if(course_id!==oldData.course_id) new_flag=true
      if(assignmentsCount!==oldData.assignmentsCount) new_flag=true
      // if(totalCourses!==oldData.totalCourses) new_flag=true
      if(assignments.length!==oldData.assignments.length) new_flag=true
      for(let i=0;i<assignments.length;i++){
        if(assignments[i]!==oldData.assignments[i]) new_flag=true
      }

      if(new_flag===false) throw [400,'No new values to update'];
      let updatedDescriptionData = {
        course_id: course_id,
        assignmentsCount: assignmentsCount,
        weightage: weightage,
        assignments: assignments 
      };
      const descriptionInfo = await descriptionCollection();
      const updateInfo = await descriptionInfo.findOneAndReplace(
        {_id: new ObjectId(id)},
        updatedDescriptionData,
        {returnDocument: 'after'}
      );
      if (updateInfo.lastErrorObject.n === 0)
        throw [404, `Update failed! Could not update description details with id ${id}`];
    
      const result = await descriptionInfo.findOne({_id: new ObjectId(id)});
      return result;
  }    
    
}
export default method;