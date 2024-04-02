import express from 'express';

// Crea el router de express
const router = express.Router();

// Aquí puedes definir tus rutas específicas para "productos"
// Ejemplo de ruta GET
router.get('/products', (req, res) => {
  res.send('Lista de productos');
});

// Ejemplo de ruta POST para agregar un nuevo producto
router.post('/products', (req, res) => {
  // Aquí deberías agregar lógica para manejar la adición de un nuevo producto
  res.status(201).send('Producto agregado');
});

// No olvides exportar el router
export default router;
