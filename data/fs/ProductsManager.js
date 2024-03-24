import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { fileURLToPath } from 'url';

class ProductsManager {
    constructor() {
        this.__dirname = path.dirname(fileURLToPath(import.meta.url));
        this.filePath = path.join(this.__dirname, 'files', 'products.json');
        console.log(`Ruta del archivo de productos: ${this.filePath}`);
        this.initDirectory();
        this.initFile();
        this.initProducts();
    }

    initDirectory() {
        const dirPath = path.join(this.__dirname, 'files');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log('Directorio creado ya que no existía.');
        } else {
            console.log('El directorio files ya existe dentro de fs.');
        }
    }

    initFile() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf-8');
            console.log('Archivo creado ya que no existía.');
        } else {
            console.log('El archivo ya existe, no es necesario crearlo.');
        }
    }

    readFileSync() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            console.log('Archivo leído con éxito.');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error leyendo el archivo:', error.message);
            return [];
        }
    }

    writeFileSync(data) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
            console.log('Archivo escrito con éxito.');
        } catch (error) {
            console.error('Error escribiendo el archivo:', error.message);
        }
    }
    read(category = null) {
        try {
            const products = this.readFileSync();
            // Si se proporciona una categoría, filtrar los productos por esa categoría.
            if (category) {
                return products.filter(product => product.category === category);
            }
            // De lo contrario, devolver todos los productos.
            return products;
        } catch (error) {
            console.error('Error al leer los productos:', error.message);
            return [];
        }
    }
    create(data) {
        try {
            if (!data.title || !data.photo || !data.category || data.price == null || data.stock == null) {
                throw new Error("Todos los campos son obligatorios, excepto el id.");
            }

            const products = this.readFileSync();
            const newProduct = {
                id: randomBytes(12).toString("hex"),
                ...data
            };

            products.push(newProduct);
            this.writeFileSync(products);
            console.log("Producto creado con éxito:", newProduct.id);
        } catch (error) {
            console.error(error.message);
        }
    }

    readOne(id) {
        const products = this.readFileSync();
        return products.find(product => product.id === id);
    }

    update(id, newData) {
        const products = this.readFileSync();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return null;

        
        products[index] = { ...products[index], ...newData };
        this.writeFileSync(products);
        return products[index];
    }

    delete(id) {
        const products = this.readFileSync();
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return false;

        products.splice(index, 1);
        this.writeFileSync(products);
        return true;
    }

    initProducts() {

        if (this.readFileSync().length === 0) {
            const initialProducts = [

                { title: "Producto 1", photo: "..", category: "Lubricantes", price: 100, stock: 10 },
                { title: "Producto 2", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 3", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 4", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 5", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 6", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 7", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 8", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 9", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 10", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 11", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 12", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 13", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 14", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 15", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 16", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 17", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 18", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 19", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
                { title: "Producto 20", photo: "..", category: "Lubricantes", price: 200, stock: 20 },
            ];
            console.log('Inicializando productos...');
            initialProducts.forEach(product => this.create(product));
        } else {
            console.log('Ya existen productos en el archivo, no se inicializan nuevos.');
        }
    }
    countProducts() {
        const products = this.readFileSync();
        console.log(`Total de productos: ${products.length}`);
        return products.length;
    }
}


new ProductsManager();

export default ProductsManager;
