import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { uploadImage } from "@/lib/cloudinary";
import Project from "@/models/Project";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter = status ? { status } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
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

    const tagsRaw = formData.get("tags") as string;

    const project = await Project.create({
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      tags: tagsRaw ? JSON.parse(tagsRaw) : [],
      liveUrl: normalizeUrl((formData.get("liveUrl") as string) || ""),
      githubUrl: normalizeUrl((formData.get("githubUrl") as string) || ""),
      image: imageUrl,
      status: formData.get("status") || "draft",
      order: Number(formData.get("order")) || 0,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
