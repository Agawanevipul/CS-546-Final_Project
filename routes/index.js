import studentRoute from "./routesModels.js";

const constructorMethod = (app) => {
  // app.use("/", (req, res.render("foo"));
  app.use("/register", studentRoute);
  app.use("/login", studentRoute);
  app.get("/login", (req, res) => {
    res.render("register", {
      title: "Login",
      loginPage: true,
    });
  });

  app.get("/register", (req, res) => {
    res.render("register", {
      title: "Register",
      loginPage: false,
    });
  });
  app.use("/", studentRoute);

  app.use("/profile", studentRoute);
  app.get("/profile", (req, res) => {
    res.render("profile", {
      title: "Profile",
    });
  });
  app.use("/homepage", studentRoute);
  app.get("/homepage", (req, res) => {
    res.render("homepage", {
      showProfileLink: true,
      showLogoutLink: true,
      title: "Homepage",
    });
  });
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
