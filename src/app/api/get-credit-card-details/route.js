// src/app/api/get-credit-card-details/route.js
import connectToDatabase from '@/lib/mongodb';
import CreditCardDetail from '../../models/CreditCardDetail';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectToDatabase();
    const creditCardDetails = await CreditCardDetail.find({}).sort({ createdAt: -1 }); // Fetch all, sorted by creation date (newest first)
    return NextResponse.json({ success: true, data: creditCardDetails }, { status: 200 });
  } catch (error) {
    console.error("Error fetching credit card details:", error);
    return NextResponse.json({ success: false, message: 'Failed to fetch credit card details', error: error.message }, { status: 500 });
  }
}