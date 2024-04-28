import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    text: { type: String, required: true },
    category: { type: String, default: "to do", enum: ["to do", "done"] },
  },
  {
    timestamps: true,
  }
);

const Products = model(collection, schema);
export default Products;
