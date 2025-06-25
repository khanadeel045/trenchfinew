// /src/app/api/signup/route.js
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await connectToDatabase();

  const { name, email, password, username } = await request.json();
  if (!name || !email || !password || !username) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
  }


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 409 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    username, // ✅ required for schema
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new Response(JSON.stringify({ message: 'User successfully registered' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error: ' + error.message }), { status: 500 });
  }
}
