// src/app/api/delete-website-details/[id]/route.js
import connectToDatabase from '@/lib/mongodb';
import WebsiteDetails from '../../../models/WebsiteDetails';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: "Website Detail ID is required" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const deletedWebsiteDetail = await WebsiteDetails.findByIdAndDelete(id);

    if (!deletedWebsiteDetail) {
      return NextResponse.json({ success: false, message: "Website detail not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Website detail deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting website detail:", error);
    return NextResponse.json({ success: false, message: "Failed to delete website detail", error: error.message }, { status: 500 });
  }
}