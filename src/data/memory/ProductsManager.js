import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { fileURLToPath } from 'url';

class ProductsManager {
    constructor() {
        this.__dirname = path.dirname(fileURLToPath(import.meta.url));
        this.filePath = path.join(this.__dirname, 'files', 'products.json');
        this.initFile();
    }

    initFile() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
            console.log('File created as it did not exist.');
            this.createDefaultProducts(); // Llama a la creación de productos por defecto si el archivo no existe.
        } else {
            const products = this.readFileSync();
            if (products.length === 0) {
                this.createDefaultProducts(); // También crea productos por defecto si el archivo está vacío.
            }
        }
    }

    createDefaultProducts() {
        const defaultProducts = [];
        for (let i = 1; i <= 40; i++) {
            defaultProducts.push({
                id: randomBytes(12).toString('hex'),
                title: `Product ${i}`,
                photo: 'default_product.jpg',
                category: 'Default Category',
                price: 1,
                stock: 1,
            });
        }
        this.writeFileSync(defaultProducts);
        console.log('40 default products have been created.');
    }

    readFileSync() {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    writeFileSync(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    create(data) {
        const products = this.readFileSync();
        const newProduct = { id: randomBytes(12).toString("hex"), ...data };
        products.push(newProduct);
        this.writeFileSync(products);
        return newProduct;
    }

    // Los métodos read, readOne, update y destroy siguen igual.
    read() {
        return this.readFileSync();
    }

    readOne(id) {
        const products = this.readFileSync();
        return products.find(product => product.id === id);
    }

    update(id, newData) {
        const products = this.readFileSync();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...newData };
            this.writeFileSync(products);
            return products[index];
        }
        return null;
    }

    destroy(id) {
        let products = this.readFileSync();
        const initialLength = products.length;
        products = products.filter(product => product.id !== id);
        if (products.length < initialLength) {
            this.writeFileSync(products);
            return true;
        }
        return false;
    }
}

export default ProductsManager;
