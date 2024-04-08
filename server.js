import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import ProductsManager from './src/data/fs/ProductsManager.js';
import UsersManager from './src/data/fs/UsersManager.js';
import morgan from 'morgan';

import indexRouter from './src/routers/index.router.js';
import validateProduct from './src/middlewares/validateProduct.js';
import validateUser from './src/middlewares/validateUser.js';
import errorHandler from './src/middlewares/errorHandler.js';
import notFoundHandler from './src/middlewares/notFoundHandler.js';
import productsRouter from './src/routers/productsRouter.js';
import _dirname from './utils.js';

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // Crea un servidor HTTP a partir de Express
const io = new Server(server); // Vincula Socket.io al servidor HTTP
const productsManager = new ProductsManager();
const userManager = new UsersManager();

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', _dirname+'/src/views');

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
// Ruta base para los productos
app.use('/api', productsRouter);

// Manejadores de errores y rutas no encontradas
app.use("/", indexRouter);
app.use(errorHandler);
app.use(notFoundHandler);
// Punto de entrada principal
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});

// Socket.io ejemplo de uso
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    // Emitir todos los productos cuando un cliente se conecte
    productsManager.read().then(products => {
        socket.emit('products', products);
    });

    // Recibir un nuevo producto y actualizar la lista de productos
    socket.on('new product', async (newProduct) => {
        await productsManager.create(newProduct);
        const updatedProducts = await productsManager.read();
        io.emit('products', updatedProducts); // Emitir a todos los clientes
    });
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });

    // Puedes agregar más eventos y lógica de Socket.io aquí
});

// Rutas para operaciones CRUD de productos
app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query; // Obteniendo la categoría desde la query de la URL
        const products = await productsManager.read(category); // Asumiendo que read puede filtrar por categoría
        if (products.length > 0) {
            res.json({ statusCode: 200, response: products });
        } else {
            res.status(404).json({ statusCode: 404, response: null, message: "No se encontraron productos" });
        }
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
app.get('/api/users', validateUser, async (req, res) => {
    try {
        const { role } = req.query; // Obteniendo el rol desde la query de la URL
        const users = await userManager.read(role); // Asumiendo que read puede filtrar por rol
        if (users.length > 0) {
            res.status(200).json({
                statusCode: 200,
                response: users
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                response: null,
                message: 'No se encontraron usuarios'
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Inicializar servidor con server.listen en lugar de app.listen
server.listen(PORT, () => {
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