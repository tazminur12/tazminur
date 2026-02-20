import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Certificate from "@/models/Certificate";
import Testimonial from "@/models/Testimonial";
import Message from "@/models/Message";

export async function GET() {
  try {
    await connectDB();

    const [projects, certificates, testimonials, messages, unreadMessages] =
      await Promise.all([
        Project.countDocuments(),
        Certificate.countDocuments(),
        Testimonial.countDocuments(),
        Message.countDocuments(),
        Message.countDocuments({ read: false }),
      ]);

    const recentItems = await Promise.all([
      Project.find().sort({ createdAt: -1 }).limit(3).select("title createdAt").lean(),
      Certificate.find().sort({ createdAt: -1 }).limit(2).select("title createdAt").lean(),
      Testimonial.find().sort({ createdAt: -1 }).limit(2).select("name createdAt").lean(),
      Message.find().sort({ createdAt: -1 }).limit(3).select("name subject createdAt read").lean(),
    ]);

    const activity = [
      ...recentItems[0].map((p) => ({
        type: "project",
        text: "Added project",
        item: (p as Record<string, unknown>).title as string,
        time: (p as Record<string, unknown>).createdAt as string,
      })),
      ...recentItems[1].map((c) => ({
        type: "certificate",
        text: "Added certificate",
        item: (c as Record<string, unknown>).title as string,
        time: (c as Record<string, unknown>).createdAt as string,
      })),
      ...recentItems[2].map((t) => ({
        type: "testimonial",
        text: "New testimonial from",
        item: (t as Record<string, unknown>).name as string,
        time: (t as Record<string, unknown>).createdAt as string,
      })),
      ...recentItems[3].map((m) => ({
        type: "message",
        text: "Message from",
        item: (m as Record<string, unknown>).name as string,
        time: (m as Record<string, unknown>).createdAt as string,
      })),
    ]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 8);

    return NextResponse.json({
      counts: { projects, certificates, testimonials, messages },
      unreadMessages,
      activity,
    });
  } catch (error) {
    console.error("GET /api/dashboard/stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
