import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function authenticateToken(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // { userId, email }
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
    return null;
  }
}
