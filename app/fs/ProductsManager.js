const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ProductsManager {
    constructor() {
        this.filePath = path.join(__dirname, 'files', 'products.json');
        console.log(`Ruta del archivo de productos: ${this.filePath}`);
        this.initDirectory(); 
        this.initFile();
        this.initProducts(); 
    }

    initDirectory() {
        const dirPath = path.join(__dirname, 'files');
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

    create(data) {
        try {
            if (!data.title || !data.photo || !data.category || data.price == null || data.stock == null) {
                throw new Error("Todos los campos son obligatorios, excepto el id.");
            }

            const products = this.readFileSync();
            const newProduct = {
                id: crypto.randomBytes(12).toString("hex"),
                ...data
            };

            products.push(newProduct);
            this.writeFileSync(products);
            console.log("Producto creado con éxito:", newProduct.id);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Aquí definirías el resto de tus métodos: read(), readOne(id), destroy(id), etc.

    initProducts() {
        // Solo inicializa los productos si el archivo está vacío
        if (this.readFileSync().length === 0) {
            const initialProducts = [
                // Define aquí tus 10 productos iniciales
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
        ];
        console.log('Inicializando productos...');
            initialProducts.forEach(product => this.create(product));
        } else {
            console.log('Ya existen productos en el archivo, no se inicializan nuevos.');
        }
    }
}

// Instancia la clase para ejecutar el código
new ProductsManager();