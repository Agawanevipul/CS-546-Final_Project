import { Router } from "express";
import path from "path";
import { studentsInfo } from "../data/index.js";
import { title } from "process";
import validator from "./validator.js";

const router = Router();
router
  .route("/")
  // .get(async (req, res) => {
  //   //code here for GET
  //   try{
  //     res.render('register', {title: "Register"});
  //   } catch (e) {
  //     res.status(404).json({error: e});
  //   }

  // })
  .post(async (req, res) => {
    let isclicked = req.body.clicked;
    console.log(isclicked);
    if (isclicked === "registered") {
      let firstName = req.body.first_name;
      let lastName = req.body.last_name;
      let emailId = req.body.email_id;
      let CWID = req.body.cwid;
      let program = req.body.program;
      let major = req.body.major;
      let password = req.body.create_pass;
      let confirmPassword = req.body.confirm_pass;
      try {
        firstName = validator.checkString(firstName, "First Name");
        lastName = validator.checkString(lastName, "Last Name");
        emailId = validator.checkString(emailId, "Email Id");
        emailId = validator.validateEmailId(emailId);
        program = validator.checkString(program, "Program");
        major = validator.checkString(major, "Major");
        password = validator.checkString(password, "Password");
        password = validator.validatePassword(password);
        confirmPassword = validator.checkString(
          confirmPassword,
          "Confirm Password"
        );
        confirmPassword = validator.validatePassword(confirmPassword);

        if (password === confirmPassword) {
          const student = await studentsInfo.create(
            firstName,
            lastName,
            emailId,
            CWID,
            program,
            major,
            password,
            confirmPassword
          );
          res.json(student);
        } else {
          const error = "Confirm password must be similar to password.";
          return res.status(400).render("register", {
            title: "Register",
            loginPage: false,
            firstName: firstName,
            lastName: lastName,
            CWID: CWID,
            emailId: emailId,
            program: program,
            major: major,
            error,
          });
        }
      } catch (e) {
        res.status(404).render("register", {
          title: "Register",
          loginPage: false,
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          CWID: CWID,
          program: program,
          major: major,
          password: password,
          confirmPassword: confirmPassword,
          error: e,
        });
        return;
      }
    }
    if (isclicked === "loggedIn") {
      let emailId = req.body.emailId;
      let password = req.body.password;
      try {
        emailId = validator.checkString(emailId, "Email Id");
        emailId = validator.validateEmailId(emailId);
        password = validator.checkString(password, "Password");

        const student = await studentsInfo.get_details(emailId, password);
        res.json(student);
      } catch (e) {
        res.status(404).render("register", {
          title: "Login",
          loginPage: true,
          emailId: emailId,
          error: e,
        });
        return;
      }
    }
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
router.route("/homepage").get(async (req, res) => {
  res.render("homepage", {});
});
export default router;
