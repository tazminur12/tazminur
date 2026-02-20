import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import Certificate from "@/models/Certificate";

function buildDateString(month: string, year: string): string {
  if (month && year) return `${month} ${year}`;
  if (year) return year;
  return "";
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const formData = await req.formData();
    const existing = await Certificate.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    let imageUrl = existing.image;
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      if (existing.image) {
        await deleteImage(existing.image).catch(() => {});
      }
      imageUrl = await uploadImage(imageFile);
    }

    const issueMonth = (formData.get("issueMonth") as string) ?? existing.issueMonth;
    const issueYear = (formData.get("issueYear") as string) ?? existing.issueYear;
    const skillsRaw = (formData.get("skills") as string) || "";

    const updated = await Certificate.findByIdAndUpdate(
      id,
      {
        title: formData.get("title") || existing.title,
        issuer: formData.get("issuer") ?? existing.issuer,
        issueMonth,
        issueYear,
        expirationMonth: formData.get("expirationMonth") ?? existing.expirationMonth,
        expirationYear: formData.get("expirationYear") ?? existing.expirationYear,
        credentialId: formData.get("credentialId") ?? existing.credentialId,
        credentialUrl: normalizeUrl((formData.get("credentialUrl") as string) ?? existing.credentialUrl),
        skills: skillsRaw ? skillsRaw.split(",").map((s: string) => s.trim()).filter(Boolean) : (existing.skills || []),
        image: imageUrl,
        date: buildDateString(issueMonth, issueYear),
        order: Number(formData.get("order")) || existing.order,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/certificates error:", error);
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const cert = await Certificate.findById(id);
    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    if (cert.image) {
      await deleteImage(cert.image).catch(() => {});
    }

    await Certificate.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/certificates error:", error);
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
