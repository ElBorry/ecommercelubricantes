import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor() {
    this.filePath = "./files/users.json";
  }

  create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo || "profilepic.jpg",
      email: data.email,
      password: data.password,
      role: data.role || "Guest",
    };

    try {
      if (!data.photo || !data.email || !data.password || !data.role) {
        throw new Error(
          "Complete los campos antes de crear un usuario en el archivo."
        );
      }

      let jsonData = fs.readFileSync(this.filePath, "utf-8");
      let users = [];
      if (jsonData) {
        users = JSON.parse(jsonData);
      }

      users.push(user);

      fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
      console.log("Usuario creado correctamente.");
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
}

// Se han comentado la inicialización en esta clase para evitar la creación continua mediante el debug de metodos que se 
//realizo en el Sprint 1 y Sprint 2.


// const gestorDeUsuarios = new UsersManager();
// gestorDeUsuarios.create({
//   photo: "photo.jpg",
//   email: "juanarizona@example.com",
//   password: "password",
//   role: "user",
// });

// gestorDeUsuarios.create({
//   photo: "photo.jpg",
//   email: "carlosrestrepo@example.com",
//   password: "password",
//   role: "user",
// });

// gestorDeUsuarios.create({
//   photo: "photo.jpg",
//   email: "manuelcaceres@example.com",
//   password: "password",
//   role: "user",
// });

// gestorDeUsuarios.create({
//   photo: "photo.jpg",
//   email: "tonikroos@example.com",
//   password: "password",
//   role: "user",
// });

// //Los metodos utilizan una variable, para tomar el primer usuario creado y realizar los ejemplos de lectura unica y eliminación unica

// const users = gestorDeUsuarios.read();
// console.log("Usuarios:", users);

// if (users.length > 0) {
//   const userId = users[0].id;
//   console.log(`Usuario con id "${userId}":`, gestorDeUsuarios.readOne(userId));
//   console.log("Usuario eliminado:", gestorDeUsuarios.destroy(userId));
// } else {
//   console.log("No hay usuarios creados.");
// }

// // console.log("Usuario eliminado:", gestorDeUsuarios.destroy(userId));

export default UsersManager;