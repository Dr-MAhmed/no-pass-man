// src/app/api/get-website-details/route.js
import connectToDatabase from '@/lib/mongodb';
import WebsiteDetails from '../../models/WebsiteDetails';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectToDatabase();
    const websiteDetails = await WebsiteDetails.find({}).sort({ createdAt: -1 }); // Fetch all, sorted by creation date (newest first)
    return NextResponse.json({ success: true, data: websiteDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching website details:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch website details', error: error.message }, { status: 500 });
  }
}