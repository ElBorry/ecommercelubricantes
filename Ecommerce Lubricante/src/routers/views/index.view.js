import { Router } from "express";
import productsManager from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsManager);
viewsRouter.use("/users", usersRouter);
viewsRouter.get("/", async (req, res, next) => {
  try {
    return res.render("index", { title: "HOME" });
  } catch (error) {
    return next(error);
  }
});
viewsRouter.get("/chat", async(req,res,next)=> {
  try {
    return res.render("chat", { title: "CHAT" })
  } catch (error) {
    return next(error)
  }
})

export default viewsRouter;
