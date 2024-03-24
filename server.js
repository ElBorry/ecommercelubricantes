import express from 'express';
import ProductsManager from './data/fs/ProductsManager.js';
import UsersManager from './data/fs/UsersManager.js';

const app = express();
const PORT = 3000;

app.use(express.json()); 

//Feature de ProductsManager
const productsManager = new ProductsManager();


app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});


app.get('/api/products', async (req, res) => {
    try {
        let products = await productsManager.read(); 
        res.json({ statusCode: 200, response: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await productsManager.readOne(req.params.id); 
        if (product) {
            res.json({ statusCode: 200, response: product });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/api/products', async (req, res) => {
    try {
        const product = await productsManager.create(req.body); // Asegúrate de tener este método implementado en ProductsManager
        res.status(201).json({ message: "Producto creado con éxito", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await productsManager.update(req.params.id, req.body); // Implementar este método en ProductsManager
        if (updatedProduct) {
            res.json({ statusCode: 200, response: updatedProduct });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.delete('/api/products/:id', async (req, res) => {
    try {
        const wasDeleted = await productsManager.delete(req.params.id); // Implementar este método en ProductsManager
        if (wasDeleted) {
            res.json({ statusCode: 200, message: "Producto eliminado con éxito" });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


//Feature de UserManager

const userManager = new UsersManager();

app.get('/api/users/:uid', (req, res) => {
    const userId = req.params.uid;
    const user = userManager.readOne(userId);
    if (user) {
      res.status(200).json({
        statusCode: 200,
        response: user
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: 'Usuario no encontrado'
      });
    }
});
  

// Ruta para obtener un usuario por su ID
app.get('/api/users/:uid', (req, res) => {
    const userId = req.params.uid; // Obtener el ID del usuario de los parámetros de la solicitud
    const user = userManager.readOne(userId);
    if (user) {
      res.status(200).json({
        statusCode: 200,
        response: user
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        response: null,
        message: 'Usuario no encontrado'
      });
    }
});

