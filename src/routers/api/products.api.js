import { Router } from "express";
import productsManager from "../../data/mongo/manager/ProductsManager.mongo.js";
import isText from "../../middlewares/isText.mid.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:nid", readOne);
productsRouter.post("/", isText, create);
productsRouter.put("/:nid", update);
productsRouter.delete("/:nid", destroy);

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await productsManager.readOne(nid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await productsManager.update(nid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await productsManager.destroy(nid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;
