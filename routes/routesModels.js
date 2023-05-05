import { Router } from "express";
import path from "path";
import { studentsInfo, assignmentInfo, courseInfo } from "../data/index.js";
import { title } from "process";
import validator from "../validator.js";

const router = Router();
router.route("/").post(async (req, res) => {
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
      password = validator.validPassword(password);
      confirmPassword = validator.checkString(
        confirmPassword,
        "Confirm Password"
      );
      confirmPassword = validator.validPassword(confirmPassword);

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
router
  .route("/homepage")
  .get(async (req, res) => {
    const studentId = user.session.student_id;

    try {
      studentId = validator.checkId(studentId, "studentId");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const courses = await courseInfo.get(studentId);
      const assignments = await assignmentInfo.get(studentId);
      res.json(post);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .post(async (req, res) => {});
router.route("/profile").post(async (req, res) => {
  let { student_id, semester, totalCourses, courseNames } = req.body;

  if (!userInfo || Object.keys(userInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }

  try {
    userInfo.semester = validator.checkNumber(userInfo.semester, "semester");
    userInfo.totalCourses = validator.checkNumber(
      userInfo.totalCourses,
      "totalCourses"
    );
    userInfo.courseNames = validator.checkStringArray(
      userInfo.courseNames,
      "courseNames"
    );
    userInfo.student_id = validator.checkId(userInfo.student_id, "student_id");
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  const course = { student_id, semester, totalCourses, courseNames };
  try {
    const newCourse = await courseInfo.create(course);
    res.json(newCourse);
  } catch (e) {
    res.sendStatus(500);
  }
});

export default router;
