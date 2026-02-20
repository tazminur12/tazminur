import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const existing = await Testimonial.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    const updated = await Testimonial.findByIdAndUpdate(
      id,
      {
        name: body.name || existing.name,
        role: body.role ?? existing.role,
        content: body.content ?? existing.content,
        rating: body.rating ?? existing.rating,
        status: body.status || existing.status,
        order: body.order ?? existing.order,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
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

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
