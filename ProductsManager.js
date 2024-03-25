class ProductManager {
  static #products = []; 

  create(data) {
    if (!data.title || !data.photo || !data.category || data.price == null || data.stock == null) {
      console.error("Todos los campos son obligatorios, excepto el id.");
      return;
    }

    const newProduct = {
      id: ProductManager.#products.length > 0 ? ProductManager.#products[ProductManager.#products.length - 1].id + 1 : 1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };

    ProductManager.#products.push(newProduct);
    console.log("Producto creado con éxito");
  }


  read() {
    return ProductManager.#products;
  }
}

const gestorDeProductos = new ProductManager();
gestorDeProductos.create({
  title: "Rimula R4 X 15W-40a",
  photo: "Rimula R4 X 15W-40a.jpg",
  category: "Lubricantes",
  price: 1000,
  stock: 100,
}); 

gestorDeProductos.create({
  title: "Rimula R5 E 10W-40",
  photo: "Rimula R5 E 10W-40.jpg",
  category: "Lubricantes",
  price: 1000,
  stock: 100,
}); 

gestorDeProductos.create({
  title: "Rimula R4 Plus 15W-40",
  photo: "Rimula R4 Plus 15W-40.jpg",
  category: "Lubricantes",
  price: 1000,
  stock: 100,
}); 

gestorDeProductos.create({
  title: "Spirax S4 TXM",
  photo: "Spirax S4 TXM.jpg",
  category: "Lubricantes",
  price: 1000,
  stock: 100,
}); 

gestorDeProductos.create({
  title: "Spirax S2 A 80W-90",
  photo: "Spirax S2 A 80W-90.jpg",
  category: "Lubricantes",
  price: 1000,
  stock: 100,
}); 

console.log(gestorDeProductos.read()); // mostrar los productos
