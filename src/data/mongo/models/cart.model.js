import { Schema, model } from "mongoose"; 

const collection = "carts"
const cartSchema = new Schema(  
    {
        userId: { type: "string", required: true },
        clothe_id: { type: "string", required: true },
        quantity: { type: "number", required: true },
        state: {
            type: "string",
            enum: ["reserved", "paid", "delivered"],
            default: "reserved",
        },
    },
    { timestamps: true } 
);
const Cart = model(collection, cartSchema); 
export default Cart;
