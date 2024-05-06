import fs from "fs";
import crypto from "crypto";

class CartManager {
    constructor() {
        this.path = "./src/data/fs/files/carts.json";
        this.init();
    }

    init() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        }
    }

    async create(data) {
        try {
            const cart = {
                id: crypto.randomBytes(12).toString("hex"),
                userId: data.userId,
                products: data.products || [],
                state: data.state || "reserved",
                date: new Date(),
            };
            let allCarts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            allCarts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async read() {
        try {
            let allCarts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(allCarts);
        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            const allCarts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            const cart = allCarts.find(cart => cart.id === id);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            let allCarts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            let cartIndex = allCarts.findIndex(cart => cart.id === id);
            if (cartIndex !== -1) {
                allCarts[cartIndex] = { ...allCarts[cartIndex], ...data };
                await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
                return allCarts[cartIndex];
            } else {
                const error = new Error("Cart not found!");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async destroy(id) {
        try {
            let allCarts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
            const cart = allCarts.find(cart => cart.id === id);
            if (cart) {
                allCarts = allCarts.filter(cart => cart.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
                return cart;
            } else {
                const error = new Error("Cart not found!");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
}

const cartManager = new CartManager();
export default cartManager;
