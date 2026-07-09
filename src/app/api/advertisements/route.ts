import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Public GET: Fetch active advertisements
export async function GET() {
  try {
    const ads = await prisma.advertisement.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(ads);
  } catch (error: any) {
    console.error("GET Advertisements Error:", error);
    return NextResponse.json({ error: "Failed to fetch advertisements" }, { status: 500 });
  }
}

// Admin POST: Create an advertisement
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, image, link, isActive } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const createdAd = await prisma.advertisement.create({
      data: {
        title,
        subtitle,
        image,
        link,
        isActive: isActive !== undefined ? !!isActive : true,
      },
    });

    return NextResponse.json(createdAd, { status: 201 });
  } catch (error: any) {
    console.error("POST Advertisement Error:", error);
    return NextResponse.json({ error: "Failed to create advertisement" }, { status: 500 });
  }
}
