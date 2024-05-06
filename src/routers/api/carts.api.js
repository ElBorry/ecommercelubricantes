import { Router } from "express";
import cartsManager from "../../data/mongo/manager/CartsManager.mongo.js";

const cartsRouter = Router();  // Usas cartsRouter para definir el Router

cartsRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const one = await cartsManager.create(data);
        return res.json({
            statusCode: 201,
            message: "CREATED",
            response: one
        });
    } catch (error) {
        return next(error);
    }
});

cartsRouter.get("/", async (req, res, next) => {
    try {
        const { user_Id } = req.query;
        if (user_Id) {
            const all = await cartsManager.read({ user_Id });
            if (all.length > 0) {
                return res.json({
                    statusCode: 200,
                    message: "READ",
                    response: all
                });
            }
            const error = new Error("Missing user_Id");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
});

cartsRouter.get("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
        const one = await cartsManager.readById(cid);  // Suponiendo que tienes un método readById en tu cartsManager
        if (!one) {
            return res.status(404).json({
                statusCode: 404,
                message: "Cart not found"
            });
        }
        return res.json({
            statusCode: 200,
            message: "READ",
            response: one
        });
    } catch (error) {
        return next(error);
    }
});

cartsRouter.put("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
        const updateData = req.body;
        const updated = await cartsManager.update(cid, updateData);  // Suponiendo que tienes un método update en tu cartsManager
        if (!updated) {
            return res.status(404).json({
                statusCode: 404,
                message: "Cart not found"
            });
        }
        return res.json({
            statusCode: 200,
            message: "UPDATED",
            response: updated
        });
    } catch (error) {
        return next(error);
    }
});

cartsRouter.delete("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
        const deleted = await cartsManager.delete(cid);  // Suponiendo que tienes un método delete en tu cartsManager
        if (!deleted) {
            return res.status(404).json({
                statusCode: 404,
                message: "Cart not found"
            });
        }
        return res.json({
            statusCode: 200,
            message: "DELETED",
            response: deleted
        });
    } catch (error) {
        return next(error);
    }
});




export default cartsRouter; 
