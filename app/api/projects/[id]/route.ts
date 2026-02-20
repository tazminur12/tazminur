import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import Project from "@/models/Project";

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
    const existing = await Project.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let imageUrl = existing.image;
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      if (existing.image) {
        await deleteImage(existing.image).catch(() => {});
      }
      imageUrl = await uploadImage(imageFile);
    }

    const tagsRaw = formData.get("tags") as string;

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        tags: tagsRaw ? JSON.parse(tagsRaw) : existing.tags,
        liveUrl: normalizeUrl((formData.get("liveUrl") as string) ?? existing.liveUrl),
        githubUrl: normalizeUrl((formData.get("githubUrl") as string) ?? existing.githubUrl),
        image: imageUrl,
        status: formData.get("status") || existing.status,
        order: Number(formData.get("order")) || existing.order,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
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

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.image) {
      await deleteImage(project.image).catch(() => {});
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
