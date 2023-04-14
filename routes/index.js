import studentRoute from "./routesModels.js";

const constructorMethod = (app) => {
  // app.use("/", (req, res.render("foo"));
   app.use("/register", studentRoute);
   app.use("/login", studentRoute);
  app.get('/login', (req, res) => {
    res.render('register', {
        title: 'Login',
        loginPage: true
    });
  });

  app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        loginPage: false
    });
});
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
