import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

schema.plugin(mongoosePaginate);

const Products = model(collection, schema);
export default Products;
