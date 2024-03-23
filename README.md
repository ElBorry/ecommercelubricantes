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
4. Inicia el servidor: npm start

El servidor debería estar corriendo y accesible en `http://localhost:3000`.

## Uso

Este proyecto ofrece una API para gestionar productos y usuarios. A continuación, se detallan los endpoints disponibles y cómo utilizarlos.

### ProductsManager

La gestión de productos se realiza a través de los siguientes endpoints:

- **Crear un Producto**: `POST /api/products`
- Body ejemplo:
 ```json
 {
   "name": "Cafetera",
   "price": 2500,
   "description": "Cafetera automática con molinillo integrado."
 }
 ```
- **Leer Productos**: `GET /api/products`
- No requiere body.
- **Actualizar un Producto**: `PUT /api/products/:id`
- Body ejemplo:
 ```json
 {
   "name": "Cafetera Actualizada",
   "price": 3000,
   "description": "Cafetera automática con molinillo y temporizador."
 }
 ```
- **Eliminar un Producto**: `DELETE /api/products/:id`
- No requiere body.

### UsersManager

_Esta sección está en proceso de creación por Esteban Samaniego y se actualizará próximamente con detalles sobre cómo gestionar usuarios._

## Contribuyendo

Si deseas contribuir a este proyecto, por favor haz un fork del repositorio y crea una pull request con tus cambios. Las contribuciones son bienvenidas y apreciadas.


## Agradecimientos

- A CoderHouse por la oportunidad de aprender y desarrollar este proyecto.
- A todos los que contribuyeron con código, ideas o sugerencias.