class UserManager {
  // Variables privadas y estáticas
  static #users = [];
  static #nextUserId = 1;

  // Método de adición o creación de usuarios mediante el parámetro de data
  static createUser(data) {
      const user = {
          id: UserManager.#nextUserId++,
          photo: data.photo,
          email: data.email,
          password: data.password,
          role: data.role,
      }
      UserManager.#users.push(user);
  }

  // Método para la lectura de los usuarios dentro de la clase UserManager
  static readUsers() {
      return UserManager.#users;
  }
}

UserManager.createUser({
  photo: "ruta_imagen_1",
  email: "usuario1@example.com",
  password: "contraseña1",
  role: "rol1",
});
UserManager.createUser({
  photo: "ruta_imagen_2",
  email: "usuario2@example.com",
  password: "contraseña2",
  role: "rol2",
});

// Ejecución del método de lectura
console.log(UserManager.readUsers());
