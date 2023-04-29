import {courseCollection} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validator from '../validator.js';

const method = {
    async create(student_id, semester, totalCourses, courseNames) {   
    let newCourse = {
        student_id: student_id,
        semester: semester,
        totalCourses: totalCourses,
        courseNames: courseNames,
    };
    const courseInfo = await courseCollection();
    const insertInfo = await courseInfo.insertOne(newCourse)

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw [400,'Could not add course details'];

    const newId = insertInfo.insertedId;
    return await this.get(newId.toString());
    },
    async get(id){
      if (!id) throw [400,'You must provide an id to search for'];
    if (typeof id !== 'string') throw [400,'Id must be a string'];
    if (id.trim().length === 0)
      throw [400,'id cannot be an empty string or just spaces'];
    id = id.trim();
      if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
        throw [400,'Invalid input provided for id'];
      }
    if (!ObjectId.isValid(id)) throw [400,'invalid object ID'];
    
        const courseInfo = await courseCollection();
        const course = await courseInfo.findOne({_id: new ObjectId(id)});
        if (!course) throw [404, 'No course found with that id'];
        course._id = course._id.toString();
        return course; 
    },
    async getAll() {
        const courseInfo = await courseCollection();
        let courseList = await courseInfo.find({}).toArray();
        if (!courseList) throw [400,'Could not get all courses'];
        courseList = courseList.map((element) => {
          element._id = element._id.toString();
          return {"_id":element._id.toString(), "name":element.name};
        });
        return courseList;
    },
    async remove(id) {
        if (!id) throw [400,'You must provide an id to search for'];
        if (typeof id !== 'string') throw [400,'Id must be a string'];
        if (id.trim().length === 0)
          throw [400,'id cannot be an empty string or just spaces'];
        id = id.trim();
          if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
            throw [400,'Invalid input provided for id'];
          }
        if (!ObjectId.isValid(id)) throw [400,'invalid object ID'];
    
        const courseInfo = await courseCollection();
        const deletionInfo = await courseInfo.findOneAndDelete({
          _id: new ObjectId(id)
        });
    
        if (deletionInfo.lastErrorObject.n === 0) {
          throw [404,`Could not delete course details with id of ${id}`];
        }
        let result={"courseId": id, "deleted": true}
        return result;
      },

    
}
export default method;