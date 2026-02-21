import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  try {
    await connectDB();
    const setting = await SiteSettings.findOne({ key: "profilePicture" });
    const imageUrl = setting?.value;

    if (imageUrl) {
      const res = await fetch(imageUrl);
      const buffer = await res.arrayBuffer();
      const contentType = res.headers.get("content-type") || "image/jpeg";

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      });
    }

    const fallbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://tazminur.me"}/profile.jpg`;
    const res = await fetch(fallbackUrl);
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
