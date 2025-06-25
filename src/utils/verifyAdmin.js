// utils/verifyAdmin.js
import jwt from 'jsonwebtoken';

export function verifyAdminToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.role === 'admin';
  } catch (e) {
    return false;
  }
}
