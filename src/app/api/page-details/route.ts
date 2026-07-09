import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Public GET: Fetch all page-details / static text configs
export async function GET() {
  try {
    const details = await prisma.pageDetail.findMany();
    // Convert to a clean key-value object keying by key for fast frontend layout reads
    const result: Record<string, string> = {};
    details.forEach((d: any) => {
      result[d.key] = d.value;
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("GET PageDetails Error:", error);
    return NextResponse.json({ error: "Failed to fetch page configurations" }, { status: 500 });
  }
}

// Admin PUT: Bulk update static text configs
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json(); // Expecting Record<string, string> e.g. { "home_hero_title": "new text" }

    const updates = Object.entries(body).map(([key, value]) => {
      return prisma.pageDetail.upsert({
        where: { key },
        update: { value: String(value) },
        create: {
          key,
          value: String(value),
          description: `Bulk updated configuration key`,
        },
      });
    });

    await prisma.$transaction(updates);

    return NextResponse.json({ message: "Configurations bulk updated successfully" });
  } catch (error: any) {
    console.error("PUT PageDetails Error:", error);
    return NextResponse.json({ error: "Failed to bulk update page configurations" }, { status: 500 });
  }
}
