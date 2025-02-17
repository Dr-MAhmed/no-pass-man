// src/app/api/login/route.js
import connectToDatabase from '@/lib/mongodb';
import User from '../../models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Please provide email and password" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select('+password'); // Explicitly select password for comparison

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 }); // 401 Unauthorized
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 }); // 401 Unauthorized
    }

    return NextResponse.json({ success: true, message: "Login successful!" }, { status: 200 });
  } catch (error) {
    console.error("Error during user login:", error);
    return NextResponse.json({ success: false, message: "Login failed", error: error.message }, { status: 500 });
  }
}