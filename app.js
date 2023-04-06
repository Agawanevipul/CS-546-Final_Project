import express from "express";
import exphbs from "express-handlebars";

import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import exphbs from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/login");

const app = express();
app.use("/login", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configRoutes(app);
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
