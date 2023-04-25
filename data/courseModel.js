import {courseCollection} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validator from './validator.js';
const method = {
    async create(student_id, semester, total_Courses, courses_Name) {   
    const course_id = new ObjectId();
    let obj1 = {
        _id: course_id,
        course_id,
        student_id: student_id,
        semester: semester,
        total_Courses: total_Courses,
        courses_Name: courses_Name,
    };
    const courseInfo = await courseCollection();
    const insertInfo = await courseInfo.insertOne(obj1)

    const newId = insertInfo.insertedId.toString();
    const course1 = await this.get(newId);
    return course1;
    },
    async get(id){
        const courseInfo = await courseCollection();
        const info_obj = await courseInfo.findOne({course_id: new ObjectId(id)});
        if (!info_obj) throw 'No band object with that id';
        info_obj._id = info_obj._id.toString();
        return info_obj; 
    }    
    
}
export default method;