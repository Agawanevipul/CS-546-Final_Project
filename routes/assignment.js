import { Router } from "express";
import path from 'path'
import { studentsInfo } from "../data/index.js";
import { title } from "process";
import validator from "../validator.js";

const router = Router();
router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try{
      res.render('loginDetails', {title: "Register"});
    } catch (e) {
      res.status(404).json({error: e});
    } 
    
  })
  .post(async (req, res) => {
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let emailId = req.body.email_id;
    let CWID = req.body.cwid;
    let program = req.body.program_value;
    let major = req.body.major_value;
    let password  = req.body.password_value;
    
    firstName = validator.checkString(firstName, 'First Name');
    lastName = validator.checkString(lastName, 'Last Name');
    emailId = validator.checkString(emailId, 'Email Id');
    program = validator.checkString(program, 'Program');
    major = validator.checkString(major, 'Major');
    password = validator.checkString(password, 'Password');
    password = validator.validatePassword(password);

    console.log(firstName)
    try {
      const student = await studentsInfo.create(
        firstName,
        lastName,
        emailId,
        CWID,
        program,
        major,
        password
      );
      return res.json(student);
    } catch (e) {
      res.status(404).json({error: e});
    }
  
    res.render('loginDetails', {
      result: "Sucessfully submitted"
    });
  });

  // router.route('/details').post(async (req, res) => {
  //   //code here for POST
  //   // const loginId = req.body.exampleInputEmail1;
  //   // const loginPassword=req.body.exampleInputPassword1;
  //   try {
  //     res.render('foo',{})
  //     // console.log(loginId,loginPassword)
  //     // res.render('foo',{loginId, loginPassword})
    
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // });

export default router;
