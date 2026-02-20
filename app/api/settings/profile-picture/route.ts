import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  try {
    await connectDB();
    const setting = await SiteSettings.findOne({ key: "profilePicture" });
    return NextResponse.json({ url: setting?.value || "" });
  } catch (error) {
    console.error("GET profile-picture error:", error);
    return NextResponse.json({ url: "" });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const existing = await SiteSettings.findOne({ key: "profilePicture" });
    if (existing?.value) {
      await deleteImage(existing.value).catch(() => {});
    }

    const imageUrl = await uploadImage(imageFile);

    await SiteSettings.findOneAndUpdate(
      { key: "profilePicture" },
      { value: imageUrl },
      { upsert: true, new: true }
    );

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("POST profile-picture error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await connectDB();
    const existing = await SiteSettings.findOne({ key: "profilePicture" });

    if (existing?.value) {
      await deleteImage(existing.value).catch(() => {});
      existing.value = "";
      await existing.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE profile-picture error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
