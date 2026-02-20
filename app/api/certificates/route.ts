import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { uploadImage } from "@/lib/cloudinary";
import Certificate from "@/models/Certificate";

export async function GET() {
  try {
    await connectDB();
    const certs = await Certificate.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(certs);
  } catch (error) {
    console.error("GET /api/certificates error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

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

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    let imageUrl = "";
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    const issueMonth = (formData.get("issueMonth") as string) || "";
    const issueYear = (formData.get("issueYear") as string) || "";
    const skillsRaw = (formData.get("skills") as string) || "";

    const cert = await Certificate.create({
      title: formData.get("title"),
      issuer: formData.get("issuer") || "",
      issueMonth,
      issueYear,
      expirationMonth: formData.get("expirationMonth") || "",
      expirationYear: formData.get("expirationYear") || "",
      credentialId: formData.get("credentialId") || "",
      credentialUrl: normalizeUrl((formData.get("credentialUrl") as string) || ""),
      skills: skillsRaw ? skillsRaw.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      image: imageUrl,
      date: buildDateString(issueMonth, issueYear),
      order: Number(formData.get("order")) || 0,
    });

    return NextResponse.json(cert, { status: 201 });
  } catch (error) {
    console.error("POST /api/certificates error:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
