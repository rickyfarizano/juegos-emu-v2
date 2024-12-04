// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado. No se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;  // Guarda la información del usuario decodificada en la solicitud
    next();  // Llama a la siguiente función (ruta)
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};
