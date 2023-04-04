import { Router } from "express";

import { studentsInfo } from "../data/index.js";

// import validation from "../helpers.js";
const router = Router();
router
  .route("/")
  // .getAll(async (req, res) => {
  //   //code here for GET
  //   try {
  //     const student = await studentsInfo.getAll();
  //     // const formattedBands = student.map(({ _id, name }) => ({
  //     //   _id: _id.toString(),
  //     //   name,
  //     // }));
  //     res.json(student);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // })
  .post(async (req, res) => {
    // const studentId = req.params.user;
    console.log(req.body);
    let {
      first_Name,
      last_Name,
      emailId,
      password,
      stevensId,
      program,
      degree,
      year_Completion,
    } = req.body;

    try {
      const student = await studentsInfo.create(
        first_Name,
        last_Name,
        emailId,
        password,
        stevensId,
        program,
        degree,
        year_Completion
      );

      return res.json(student);
    } catch (error) {
      // if (error.message === "No Band Found")
      //   return res.status(404).json({ error: error.message });
      // else return res.status(500).json({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  });

export default router;
