import {descriptionCollection} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validator from '../validator.js';

const method = {
    async create(course_id, assignmentsCount, hasExam, weightage, assignments) {   
    let newDescription = {
        course_id: course_id,
        assignmentsCount: assignmentsCount,
        hasExam: hasExam,
        weightage: weightage,
        assignments: assignments
    };
    const descriptionInfo = await descriptionCollection();
    const insertInfo = await descriptionInfo.insertOne(newDescription)

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw [400,'Could not add details into description'];

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
          return {"_id":element._id.toString(), "name":element.name};
        });
        return descriptionList;
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

    
}
export default method;