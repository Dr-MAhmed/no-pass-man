// src/app/api/save-website-details/route.js
import connectToDatabase from '@/lib/mongodb'; // Assuming src directory as root, use "@/lib/mongodb" for absolute paths
import WebsiteDetails from '../../models/WebsiteDetails'; //  Assuming src directory as root, use "@/models/WebsiteDetail" for absolute paths
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json(); // Parse request body as JSON
    const { url, username, password } = data;

    if (!url || !username || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const websiteDetail = new WebsiteDetails({
      url,
      username,
      password,
    });

    await websiteDetail.save();

    return NextResponse.json({ success: true, message: 'Website details saved successfully!' }, { status: 201 });
  } catch (error) {
    console.error("Error saving website details:", error);
    return NextResponse.json({ success: false, message: 'Failed to save website details', error: error.message }, { status: 500 });
  }
}