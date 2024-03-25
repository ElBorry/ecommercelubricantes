class UsersManager {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  create(data) {
    const user = {
      id: this.nextId++,
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      if (!data.photo || !data.email || !data.password || !data.role) {
        throw new Error('Complete los campos antes de crear un usuario.');
      }

      this.users.push(user);

      console.log('Usuario creado correctamente.');
    } catch (error) {
      console.log('Error al crear usuario:', error.message);
    }
  }

  read() {
    return this.users;
  }

  readOne(id) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      console.log('Usuario no encontrado');
      return null;
    }
    return user;
  }

  destroy(id) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      console.log('Usuario no encontrado');
      return null;
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    console.log('Usuario eliminado correctamente.');
    return deletedUser;
  }
}

const gestorDeUsuarios = new UsersManager();
gestorDeUsuarios.create({
  photo: 'photo.jpg',
  email: 'test@example.com',
  password: 'password',
  role: 'user',
});

gestorDeUsuarios.create({
  photo: 'photo.jpg',
  email: 'carlos@example.com',
  password: 'password',
  role: 'user',
});

gestorDeUsuarios.create({
  photo: 'photo.jpg',
  email: 'manuel@example.com',
  password: 'password',
  role: 'user',
});

gestorDeUsuarios.create({
  photo: 'photo.jpg',
  email: 'toni@example.com',
  password: 'password',
  role: 'user',
});

console.log('Usuarios:', gestorDeUsuarios.read());
console.log('Usuario con id 1:', gestorDeUsuarios.readOne(1)); // Cambio de id a numérico
console.log('Usuario eliminado:', gestorDeUsuarios.destroy(1)); // Cambio de id a numérico
