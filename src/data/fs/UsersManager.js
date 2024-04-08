import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

class UsersManager {
    constructor() {
        this.__dirname = path.dirname(fileURLToPath(import.meta.url));
        // Usa this.__dirname y asigna la ruta a una propiedad de la clase para que sea accesible en otros métodos
        this.filePath = path.join(this.__dirname, '..', '..', 'data', 'fs', 'files', 'users.json');

        this.initFile();
    }

    initFile() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
            console.log('Archivo de usuarios creado ya que no existía.');
        }
    }

    create(data) {
        try {
            const user = {
                id: crypto.randomBytes(12).toString('hex'),
                photo: data.photo || 'default_profile_pic.jpg',
                email: data.email,
                password: data.password,
                role: data.role || 'Guest',
            };

            const users = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            users.push(user);
            fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));

            console.log('Usuario creado correctamente.');
            return user;
        } catch (error) {
            console.error('Error al crear usuario:', error.message);
            throw error; // Lanza el error para manejo externo si es necesario
        }
    }

    read() {
        try {
            const users = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            if (users.length === 0) {
                throw new Error('No se encontraron usuarios.');
            }
            return users;
        } catch (error) {
            console.error('Error al leer usuarios:', error.message);
            throw error;
        }
    }

    readOne(id) {
        try {
            const users = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            const user = users.find(u => u.id === id);
            if (!user) {
                throw new Error(`Usuario con id ${id} no encontrado.`);
            }
            return user;
        } catch (error) {
            console.error('Error al buscar usuario:', error.message);
            throw error;
        }
    }

    destroy(id) {
        try {
            let users = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            const userIndex = users.findIndex(u => u.id === id);
            if (userIndex === -1) {
                throw new Error(`Usuario con id ${id} no encontrado.`);
            }
            const [deletedUser] = users.splice(userIndex, 1);
            fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
            console.log('Usuario eliminado correctamente.');
            return deletedUser;
        } catch (error) {
            console.error('Error al eliminar usuario:', error.message);
            throw error;
        }
    }
}

export default UsersManager;
