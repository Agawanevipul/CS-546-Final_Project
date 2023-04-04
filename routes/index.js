import studentRoute from "./assignment.js";

const constructorMethod = (app) => {
  // app.use("/", (req, res.render("foo"));
  app.use("/login", studentRoute);

  app.use("/", (req, res) => {
    res.render("foo", {});
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
