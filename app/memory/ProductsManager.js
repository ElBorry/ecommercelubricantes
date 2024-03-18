class ProductManager {
  static #products = [];

  create(data) {
    try {
      if (!data.title || !data.photo || !data.category || data.price == null || data.stock == null) {
        throw new Error("Todos los campos son obligatorios, excepto el id.");
      }

      const newProduct = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "..",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };

      ProductManager.#products.push(newProduct);
      console.log("Producto creado con éxito");
    } catch (error) {
      console.error(error.message);
    }
  }

  read() {
    try {
      return ProductManager.#products;
    } catch (error) {
      console.error(error.message);
      return []; // Devolver un array vacío en caso de error
    }
  }

  readOne(id) {
    try {
      const product = ProductManager.#products.find(product => product.id === id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      console.error(error.message);
    }
  }

  destroy(id) {
    try {
      const index = ProductManager.#products.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error('Producto no encontrado para eliminar');
      }
      return ProductManager.#products.splice(index, 1)[0];
    } catch (error) {
      console.error(error.message);
    }
  }
}
