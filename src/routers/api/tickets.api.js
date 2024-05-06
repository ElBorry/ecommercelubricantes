import { Router } from "express";
import cartsManager from "../../data/mongo/manager/CartsManager.mongo.js";
import { Types } from "mongoose";

const ticketsRouter = Router();

ticketsRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const ticket = await cartsManager.aggregate([
            {
                $match: {
                    user_Id: new Types.ObjectId(uid),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product_Id",
                    foreignField: "_Id",
                    as: "product_Id",
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{ $arrayElemAt: ["$product_Id", 0] }, "$$ROOT"],
                    },
                },
            },
            {
                $set: { subTotal: { $multiply: ["$price", "$quantity"] } },
            },
            { $group: { _Id: "$user_Id", total: { $sum: "$subTotal" } } },
            { $project: { _Id: 0, userId: "$_Id", total: "$total", date: new Date()}},
            { $merge: { into: "tickets" } }
        ]);

        return res.json({
            statusCode: 200,
            response: ticket,
        });
    } catch (error) {
        return next(error);
    }
});

export default ticketsRouter;
