//Creación de la Clase UserManager
class UserManager {
  // Se definen los parametros de creación de la clase. En este caso
  // solo se utiliza un array vacio para almacenar a los usuarios.
  constructor() {
    this._users = [];
    this._nextUserId = 1;
  }

  //Metodo de adición o creación de usuarios mediante el parametro de data
  createUser(data) {
    const id = this._nextUserId++;
    const newUser = { id, ...data };
    this._users.push(newUser);
  }

  //Metodo para la lectura de los usuarios dentro de la classe UserManager
  readUsers() {
    return this._users
  }
}

const userManager = new UserManager();
userManager.createUser({
  photo: "ruta_imagen_1",
  email: "usuario1@example.com",
  password: "contraseña1",
  role: "rol1",
});
userManager.createUser({
  photo: "ruta_imagen_2",
  email: "usuario2@example.com",
  password: "contraseña2",
  role: "rol2",
});
// Ejecución del metodo de lectura
console.log(userManager.readUsers());
