# CoderHouse_BackEnd
 Repositorio de Desafios & Pre-Entregas del Curso de BackEnd. #Comisión 53135
# Sistema de Gestión de Productos y Usuarios

Este proyecto proporciona una solución integral para la gestión de productos y usuarios, facilitando las operaciones de añadir y listar tanto productos como usuarios en un sistema. Está diseñado para ser utilizado en entornos donde se requiere mantener un registro actualizado de inventario de productos y una base de datos de usuarios, como empresas o proyectos en línea.

## Características

- **Gestión de Productos**: Agrega y lista productos en el sistema con detalles como título, foto, categoría, precio y stock.
- **Gestión de Usuarios**: Permite la creación y listado de usuarios, almacenando información relevante como foto, email, contraseña y rol.

## Comenzando

### Pre-requisitos

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### Instalación

1. Clona el repositorio en tu máquina local:
2. Navega al directorio del proyecto:
3. Instala las dependencias necesarias:


## Uso

### Gestión de Productos

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

## Uso

### Gestión de Usuarios

Para agregar un usuario al sistema, utiliza el siguiente código como ejemplo:

```javascript
const userManager = new UserManager();

userManager.createUser({
  photo: "ruta/a/la/foto.jpg",
  email: "usuario@example.com",
  password: "contraseñaSegura",
  role: "administrador",
});

Para obtener una lista de todos los usuarios registrados en el sistema:

console.log(userManager.readUsers());

