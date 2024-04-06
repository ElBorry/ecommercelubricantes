import express from 'express';
import ProductsManager from './src/data/fs/ProductsManager.js'; 
import UsersManager from './src/data/fs/UsersManager.js';
import morgan from 'morgan';
import validateProduct from './src/middlewares/validateProduct.js';
import errorHandler from './src/middlewares/errorHandler.js';
import notFoundHandler from './src/middlewares/notFoundHandler.js';
import productsRouter from './src/routers/productsRouter.js';



const app = express();
const PORT = process.env.PORT || 3000;
const productsManager = new ProductsManager(); 
const userManager = new UsersManager(); 

app.use(express.json());
app.use(express.static('public')); 
app.use(morgan('tiny')); 
// Ruta base para los productos
app.use('/api', productsRouter);

// Manejadores de errores y rutas no encontradas
app.use(errorHandler);
app.use(notFoundHandler);
// Punto de entrada principal
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});

// Rutas para operaciones CRUD de productos
app.get('/api/products', async (req, res) => {
    try {
        const products = await productsManager.read();
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

app.post('/api/products', validateProduct, async (req, res) => {
    try {
        const product = await productsManager.create(req.body);
        res.status(201).json({ message: "Producto creado con éxito", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await productsManager.update(req.params.id, req.body);
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
        const wasDeleted = await productsManager.destroy(req.params.id);
        if (wasDeleted) {
            res.json({ statusCode: 200, message: "Producto eliminado con éxito" });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rutas para UsersManager (Ejemplo basado en tu pregunta anterior)
app.get('/api/users/:uid', async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userManager.readOne(userId);
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).send("Lo siento, no podemos encontrar eso!");
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});
