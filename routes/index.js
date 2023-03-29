import postRoutes from "./posts.js";
import userRoutes from "./users.js";
import path from "path";

const constructorMethod = (app) => {
  app.use("/homepage", postRoutes);
};

export default constructorMethod;
