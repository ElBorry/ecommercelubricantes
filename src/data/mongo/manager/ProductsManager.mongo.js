import Products from "../models/products.model.js";
import Manager from "../manager/Manager.mongo.js";

const productsManager = new Manager(Products);
export default productsManager;
