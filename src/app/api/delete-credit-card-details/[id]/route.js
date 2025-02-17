// src/app/api/delete-credit-card-details/[id]/route.js
import connectToDatabase from '@/lib/mongodb';
import CreditCardDetail from '../../../models/CreditCardDetail';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: "Credit Card Detail ID is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const deletedCreditCardDetail = await CreditCardDetail.findByIdAndDelete(id);

    if (!deletedCreditCardDetail) {
      return NextResponse.json({ success: false, message: "Credit card detail not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Credit card detail deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting credit card detail:", error);
    return NextResponse.json({ success: false, message: "Failed to delete credit card detail", error: error.message }, { status: 500 });
  }
}