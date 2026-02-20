import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter = status ? { status } : {};
    const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const testimonial = await Testimonial.create({
      name: body.name,
      role: body.role || "",
      content: body.content || "",
      rating: body.rating || 5,
      status: body.status || "draft",
      order: body.order || 0,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
