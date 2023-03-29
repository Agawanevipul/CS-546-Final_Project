import { Router } from "express";
const router = Router();
router.route("/").get(async (req, res) => {
  try {
    res.render("layouts/main");
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
