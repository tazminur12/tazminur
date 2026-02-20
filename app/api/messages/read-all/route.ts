import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function PUT() {
  try {
    await connectDB();
    await Message.updateMany({ read: false }, { read: true });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/messages/read-all error:", error);
    return NextResponse.json({ error: "Failed to mark all read" }, { status: 500 });
  }
}
