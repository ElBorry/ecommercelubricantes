// src/middlewares/validateProduct.js
const validateProduct = (req, res, next) => {
    const { title, photo, category, price, stock } = req.body;
    if (!title || !photo || !category || price == null || stock == null) {
        return res.status(400).json({ message: "Todos los campos son obligatorios, excepto el id." });
    }
    next();
};

export default validateProduct;
