import { Router } from "express";

import { assignmentInfo } from "../data/index.js";
import xss from "xss";
const router = Router();

router
  .route("/")
  .post(async (req, res) => {
    let descriptionId,
      assignmentName,
      type,
      status,
      dateOfSubmission,
      dateOfInitialization,
      dateOfCompletion,
      notes;
    console.log(req.body);
    try {
      descriptionId = "29t49t94yt949ty4t";
      assignmentName = req.body.assignmentName;
      type = req.body.type;
      status = req.body.status;
      dateOfSubmission = req.body.dateOfSubmission;
      dateOfInitialization = req.body.dateOfInitialization;
      dateOfCompletion = req.body.dateOfCompletion;
      notes = req.body.notes;
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    try {
      let response = assignmentInfo.create(
        descriptionId,
        assignmentName,
        type,
        status,
        dateOfSubmission,
        dateOfInitialization,
        dateOfCompletion,
        notes
      );

      return response;
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    let data = await assignmentInfo.getAll(req.session.studentId);
    if (!data) {
      return res.status(500).json({ error: "server error" });
    }
    return res.json(data);
  });

export default router;
