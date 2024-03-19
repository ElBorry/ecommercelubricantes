//Definimos las "importaciones"
const fs = require("fs");
const crypto = require("crypto");

//Inicializamos la clase para gestionar a los usuarios
class UsersManager {
  constructor() {
    //En el constructor, definimos la ruta y la almacenamos en una variable.
    this.filePath = "./users.json";
  }

  //Creamos el metodo de creación
  create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      if (!data.photo || !data.email || !data.password || !data.role) {
        throw new Error(
          "Complete los campos antes de crear un usuario en el archivo."
        );
      }

      fs.readFile(this.filePath, "utf-8", (error, jsonData) => {
        if (error) {
          throw new Error("Error al leer el archivo de usuarios");
        }

        let users = [];
        if (jsonData) {
          users = JSON.parse(jsonData);
        }

        users.push(user);

        fs.writeFile(
          this.filePath,
          JSON.stringify(users, null, 2),
          (writeError) => {
            if (writeError) {
              throw new Error("Error al escribir en el archivo de usuarios");
            }

            console.log("Usuario creado correctamente.");
          }
        );
      });
    } catch (error) {
      console.log("Error al crear usuario:", error.message);
    }
  }

  read() {
    try {
      const jsonData = fs.readFileSync(this.filePath, "utf-8");
      const users = JSON.parse(jsonData);
      return users;
    } catch (error) {
      console.log("Error al leer el archivo de usuarios:", error.message);
      return [];
    }
  }

  readOne(id) {
    try {
      const jsonData = fs.readFileSync(this.filePath, "utf-8");
      const users = JSON.parse(jsonData);
      const user = users.find((u) => u.id === id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      console.log("Error al buscar usuario:", error.message);
      return null;
    }
  }

  destroy(id) {
    try {
      const jsonData = fs.readFileSync(this.filePath, "utf-8");
      let users = JSON.parse(jsonData);
      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new Error("Usuario no encontrado");
      }
      const deletedUser = users.splice(userIndex, 1)[0];
      fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      return deletedUser;
    } catch (error) {
      console.log("Error al eliminar usuario:", error.message);
      return null;
    }
  }

  update(id, data) {
    try {
      const jsonData = fs.readFileSync(this.filePath, "utf-8");
      let users = JSON.parse(jsonData);
      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new Error("Usuario no encontrado");
      }
      users[userIndex] = { ...users[userIndex], ...data };
      fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      console.log("Usuario actualizado correctamente.");
    } catch (error) {
      console.log("Error al actualizar usuario:", error.message);
    }
  }
}

const gestorDeUsuarios = new UsersManager();
gestorDeUsuarios.create({
  photo: "photo.jpg",
  email: "juanarizona@example.com",
  password: "password",
  role: "user",
});

gestorDeUsuarios.create({
    photo: "photo.jpg",
    email: "carlosrestrepo@example.com",
    password: "password",
    role: "user",
  });

  gestorDeUsuarios.create({
    photo: "photo.jpg",
    email: "manuelcaceres@example.com",
    password: "password",
    role: "user",
  });

  gestorDeUsuarios.create({
    photo: "photo.jpg",
    email: "tonikroos@example.com",
    password: "password",
    role: "user",
  });

console.log("Usuarios:", gestorDeUsuarios.read());
console.log('Usuario con id "123":', gestorDeUsuarios.readOne("123"));
console.log("Usuario eliminado:", gestorDeUsuarios.destroy("123"));
console.log(
  "Usuarios actualizados:",
  gestorDeUsuarios.update("123", { role: "admin" })
);
