// src/middlewares/validateUser.js
const validateUser = (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "El email y la contraseña son obligatorios." });
    }
    if (role && !['Admin', 'User', 'Guest'].includes(role)) {
        return res.status(400).json({ message: "El rol especificado no es válido." });
    }
    next();
};

export default validateUser;
