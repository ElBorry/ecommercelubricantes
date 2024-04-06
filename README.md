# Entrega de Desafíos & Pre-Entregas del Curso Back End de CoderHouse

Repositorio de Desafíos & Pre-Entregas del Curso de BackEnd. #Comisión 53135

Autores: Francisco Borriello & Esteban Samaniego

## ¿Qué veremos en este repositorio?

Como se ha indicado anteriormente, este repositorio alberga código correspondiente a los desafíos y pre-entregas del curso de Coderhouse para el aprendizaje de tecnología BackEnd. Hasta el momento, cada uno de los involucrados trabaja un feat específico. Borriello se enfoca en aquellas asignaturas que van dirigidas al manejo de productos, mientras que Samaniego lo hace para la parte de usuarios.

## Sistema de Gestión de Productos y Usuarios

Este proyecto proporciona una solución integral para la gestión de productos y usuarios, facilitando las operaciones de añadir, listar, actualizar y eliminar tanto productos como usuarios en un sistema. Está diseñado para ser utilizado en entornos donde se requiere mantener un registro actualizado de inventario de productos y una base de datos de usuarios, como empresas o proyectos en línea.

### Características

- **Gestión de Productos**: Agrega, lista, actualiza y elimina productos en el sistema con detalles como nombre, precio, descripción, categoría, precio y stock.
- **Gestión de Usuarios**: Permite la creación, lectura, actualización y eliminación de usuarios, almacenando información relevante como foto, email, contraseña y rol.

## Comenzando

### Pre-requisitos o Dependencias

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema, además de instalar otras dependencias como "Nodemon" y Express.

```bash
# Nodemon:
npm install -D nodemon
# Express:
npm install express


### Instalación

1. Clona el repositorio en tu máquina local usando `git clone <url-del-repositorio>` o mediante GitHub Desktop simplemente asignando una carpeta para el repositorio
2. Abre el repositorio en tu IDE de preferencia y asegurate de estar navegando en el directorio del proyecto. Sino es el caso utiliza el comando `cd CoderHouse_BackEnd` para fijar la dirección en la carpeta de raíz del proyecto
3. Instala las dependencias necesarias mediante node package manager (npm), asegurate de no dejar ninguna dependencia por fuera, pues podrías presentar problemas para el uso del proyecto
4. En la consola, ingresa el comando "npm run dev" para correr el servidor en modo de prueba, en caso de querer saltar al modo de producción puedes utilizar npm start.

Una vez hayas completado estos 4 pasos., el servidor debería estar corriendo y accesible en `http://localhost:3000`.

## Instrucciones para el uso de la API

El proyecto sigue en construcción constante a medida que avanzamos en cada etapa de desafio de la cursada, sin embargo, en este punto podemos destacar el uso de librerias como File System propia del Node.js, además del uso del servidor como tal y la propia "memoria" en tiempo de ejecución.

### Feature: ProductsManager

La gestión de productos se realiza a través de los siguientes endpoints:

- **Crear un Producto**: `POST /api/products`
- Body ejemplo:
 json
 {
   "name": "Cafetera",
   "price": 2500,
   "description": "Cafetera automática con molinillo integrado."
 }
 
-**Leer Productos**: `GET /api/products`
- No requiere body.
- **Actualizar un Producto**: `PUT /api/products/:id`
- Body ejemplo:
 json
 {
   "name": "Cafetera Actualizada",
   "price": 3000,
   "description": "Cafetera automática con molinillo y temporizador."
 }

- **Eliminar un Producto**: `DELETE /api/products/:id`
- No requiere body.

### Feature: UsersManager

Existe un archivo llamado "users.json". Este archivo JSON almacena toda la información ya creada con anterioridad, pues se ha estado testeando en desafios previos (Revisar la rama Sprint 1 o 2 para referencia). El archivo en cuestión contiene información "ficticia" sobre 4 usuarios, cada uno con su respectiva identidad y campos ya rellenados.

A nivel de servidor, la API mantiene 2 endpoints hasta el momento. Estos son los siguientes:

**Buscar un usuario por medio de su ID**
GET/API/USERS/:UID

La solicitud mostrará el listado de usuarios en caso de que nosotros no hayamos brindado el parametro requerido "ID". De lo contrario, podremos visualizar unicamente la información del usuario con el cual coincida el ID ingresado. Cabe destacar que, actualmente, a nivel de codigo ya hay un ID fijado para las pruebas.

**Buscar un usuario por rol**
GET/API/USERS?ROLE=ROL

Esta solicitud filtrará el listao de usuarios en caso de recibir un "String" que sea compatible con los 4 roles disponibles hasta el momento (Owner,Supervisor,Guest). Lastimosamente, esta solicitud solo está disponible a nivel de codigo y no de prueba, pues no se ha logrado dar con el resultado esperado.

## Contribuyendo

Si deseas contribuir a este proyecto, por favor haz un fork del repositorio y crea una pull request con tus cambios. Las contribuciones son bienvenidas y apreciadas.

## Agradecimientos

- A CoderHouse por la oportunidad de aprender y desarrollar este proyecto.
- A todos los que contribuyeron con código, ideas o sugerencias.
