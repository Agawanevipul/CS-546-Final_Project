import {courseCollection} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validator from '../validator.js';

const method = {
    async create(student_id, semester, totalCourses, courseNames) {   
      student_id= validator.checkId(student_id,'Student ID')
      semester  = validator.checkNumber(semester,'Semester')
      totalCourses  = validator.checkNumber(totalCourses,'Total Courses')
      courseNames = validator.checkStringArray(courseNames, 'Course Names')
      
      let newCourse = {
          student_id: student_id,
          semester: semester,
          totalCourses: totalCourses,
          courseNames: courseNames
      };
      const courseInfo = await courseCollection();
      const insertInfo = await courseInfo.insertOne(newCourse)

      if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw [400,'Could not add course details'];

      const newId = insertInfo.insertedId;
      return await this.get(newId.toString());
    },
    async get(id){
      id= validator.checkId(id,'Course ID')
    
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
      id= validator.checkId(id,'Course ID')
    
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
    async update(id,student_id, semester, totalCourses, courseNames) {
      id= validator.checkId(id,'Course ID')
      student_id= validator.checkId(student_id,'Student ID')
      semester  = validator.checkNumber(semester,'Semester')
      totalCourses  = validator.checkNumber(totalCourses,'Total Courses')
      courseNames = validator.checkStringArray(courseNames, 'Course Names');
    
      const oldData = await this.get(id);
      let new_flag=false
      if(student_id!==oldData.student_id) new_flag=true
      if(semester!==oldData.semester) new_flag=true
      if(totalCourses!==oldData.totalCourses) new_flag=true
      if(courseNames.length!==oldData.courseNames.length) new_flag=true
      for(let i=0;i<courseNames.length;i++){
        if(courseNames[i]!==oldData.courseNames[i]) new_flag=true
      }

      if(new_flag===false) throw [400,'No new values to update'];
      let updatedCourseData = {
        student_id: student_id,
        semester: semester,
        totalCourses: totalCourses,
        courseNames: courseNames 
      };
      const courseInfo = await courseCollection();
      const updateInfo = await courseInfo.findOneAndReplace(
        {_id: new ObjectId(id)},
        updatedCourseData,
        {returnDocument: 'after'}
      );
      if (updateInfo.lastErrorObject.n === 0)
        throw [404, `Update failed! Could not update course details with id ${id}`];
    
      const result = await courseInfo.findOne({_id: new ObjectId(id)});
      return result;
  }    
}
export default method;