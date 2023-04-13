import studentRoute from "./routesModels.js";

const constructorMethod = (app) => {
  // app.use("/", (req, res.render("foo"));
  app.use("/register", studentRoute);
  
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
