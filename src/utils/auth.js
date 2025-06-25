// /utils/auth.js
import jwt from 'jsonwebtoken';

export function signToken(user) {
  return jwt.sign(
    {
      _id: user._id, // ✅ Make sure this is _id not id
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}
