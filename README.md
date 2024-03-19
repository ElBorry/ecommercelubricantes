# CoderHouse_BackEnd
 Repositorio de Desafios & Pre-Entregas del Curso de BackEnd. #Comisión 53135

 Contribución de Francisco Borriello y Esteban Samaniego

# Sistema de Gestión de Productos y Usuarios

Este proyecto proporciona una solución integral para la gestión de productos y usuarios, facilitando las operaciones de añadir y listar tanto productos como usuarios en un sistema. Está diseñado para ser utilizado en entornos donde se requiere mantener un registro actualizado de inventario de productos y una base de datos de usuarios, como empresas o proyectos en línea.

## Características

- **Gestión de Productos**: Agrega y lista productos en el sistema con detalles como título, foto, categoría, precio y stock.
- **Gestión de Usuarios**: Permite la creación y lectura de usuarios, almacenando información relevante como foto, email, contraseña y rol.

## Comenzando

### Pre-requisitos

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### Instalación

1. Clona el repositorio en tu máquina local:
2. Navega al directorio del proyecto:
3. Instala las dependencias necesarias:


## Uso

### Gestión de Productos y Gestión de Usuarios

Para agregar un producto al sistema, utiliza el siguiente código como ejemplo:

```javascript
const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
title: "Nombre del Producto",
photo: "ruta/a/la/foto.jpg",
category: "Categoría del Producto",
price: precio,
stock: cantidadEnStock,
});

Para obtener una lista de todos los productos registrados en el sistema:

console.log(gestorDeProductos.read());

A continuación, indicaremos los metodos a utilizar para la clase de UsersManager:

const gestorDeUsuarios = new UsersManager();

gestorDeUsuarios.create({
  photo: "ruta_imagen_1",
  email: "usuario1@example.com",
  password: "contraseña1",
  role: "rol1",
});

gestorDeUsuarios.create({
  photo: "ruta_imagen_2",
  email: "usuario2@example.com",
  password: "contraseña2",
  role: "rol2",
});

Para obtener una lista de todos los usuarios registrados en el sistema:

// Ejecución del metodo de lectura
console.log(gestorDeUsuarios.readUsers());