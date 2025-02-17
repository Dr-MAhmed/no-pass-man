// src/app/api/signup/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '../../models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Please fill in all fields" }, { status: 400 });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already registered" }, { status: 409 }); // 409 Conflict
    }

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    return NextResponse.json({ success: true, message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error during user signup:", error);
    if (error.name === 'ValidationError') {
      // Mongoose validation error
      const messages = Object.values(error.errors).map(val => val.message);
      return NextResponse.json({ success: false, message: "Validation failed", errors: messages }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to register user", error: error.message }, { status: 500 });
  }
}