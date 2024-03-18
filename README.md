# CoderHouse_BackEnd

Repositorio de Desafíos & Pre-Entregas del Curso de BackEnd. #Comisión 53135

Contribución de Francisco Borriello y Esteban Samaniego

## Sistema de Gestión de Productos y Usuarios

Este proyecto proporciona una solución integral para la gestión de productos y usuarios, facilitando las operaciones de añadir y listar tanto productos como usuarios en un sistema. Está diseñado para ser utilizado en entornos donde se requiere mantener un registro actualizado de inventario de productos y una base de datos de usuarios, como empresas o proyectos en línea.

## Características

- **Gestión de Productos**: Agrega y lista productos en el sistema con detalles como título, foto, categoría, precio y stock.
- **Gestión de Usuarios**: Permite la creación y listado de usuarios, almacenando información relevante como foto, email, contraseña y rol.

## Comenzando

### Pre-requisitos

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### Instalación

1. Clona el repositorio en tu máquina local usando `git clone <url-del-repositorio>`.
2. Navega al directorio del proyecto con `cd CoderHouse_BackEnd`.
3. Instala las dependencias necesarias con `npm install`.

## Uso

### Gestión de Productos

Para agregar un producto al sistema, utiliza el siguiente código como ejemplo:

```javascript
const ProductManager = require('./path/to/ProductManager');

const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
  title: "Nombre del Producto",
  photo: "ruta/a/la/foto.jpg",
  category: "Categoría del Producto",
  price: precio,
  stock: cantidadEnStock,
});

// Para obtener una lista de todos los productos registrados en el sistema:
console.log(gestorDeProductos.read());

Gestión de Usuarios
(NOTA: Esta sección será completada por Esteban Samaniego, quien está a cargo de la gestión de usuarios)