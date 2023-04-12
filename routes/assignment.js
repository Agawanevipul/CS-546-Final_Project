import { Router } from "express";
import path from 'path'
import { studentsInfo } from "../data/index.js";

// import validation from "../helpers.js";
const router = Router();
router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try{
      res.render('loginDetails');
    } catch (e) {
      res.status(404).json({error: e});
    } 
    
  })
  // .post(async (req, res) => {
  //   // const studentId = req.params.user;
    

  //   console.log(req.body);
  //   let {
  //     first_Name,
  //     last_Name,
  //     emailId,
  //     password,
  //     stevensId,
  //     program,
  //     degree,
  //     year_Completion,
  //   } = req.body;

  //   try {
  //     const student = await studentsInfo.create(
  //       first_Name,
  //       last_Name,
  //       emailId,
  //       password,
  //       stevensId,
  //       program,
  //       degree,
  //       year_Completion
  //     );

  //     return res.json(student);
  //   } catch (error) {
  //     // if (error.message === "No Band Found")
  //     //   return res.status(404).json({ error: error.message });
  //     // else return res.status(500).json({ error: error.message });
  //     res.status(500).json({ error: error.message });
  //   }
  // });

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
