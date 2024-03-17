class ProductManager {
  static #products = [];
  create(data) {
    const products = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.#products.push(products);
    console.log("producto creado");
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
