# CoderHouse_BackEnd
 Repositorio de Desafios & Pre-Entregas del Curso de BackEnd. #Comisión 53135
# Gestor de Productos

El Gestor de Productos es una herramienta diseñada para facilitar la administración de productos dentro de una empresa o proyecto. Permite agregar, listar y gestionar productos de manera eficiente.

## Características

- **Agregar Productos**: Permite ingresar nuevos productos al sistema con toda su información relevante.
- **Listar Productos**: Proporciona una vista de todos los productos disponibles en el sistema.

## Comenzando

Para empezar a utilizar el Gestor de Productos, sigue estos pasos:

### Pre-requisitos

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema.

### Instalación

1. Clona el repositorio en tu máquina local:
2. Navega al directorio del proyecto:
3. Instala las dependencias necesarias:

### Uso

Para agregar un producto al sistema, utiliza el siguiente comando, sustituyendo los valores de ejemplo por los datos del producto que deseas agregar:

```javascript
const gestorDeProductos = new ProductManager();

gestorDeProductos.addProduct({
title: "Nombre del Producto",
photo: "ruta/a/la/foto.jpg",
category: "Categoría del Producto",
price: precio,
stock: cantidadEnStock,
});
