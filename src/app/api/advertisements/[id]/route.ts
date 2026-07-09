import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Admin PUT: Update an advertisement
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, subtitle, image, link, isActive } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedAd = await prisma.advertisement.update({
      where: { id },
      data: {
        title,
        subtitle,
        image,
        link,
        isActive: isActive !== undefined ? !!isActive : true,
      },
    });

    return NextResponse.json(updatedAd);
  } catch (error: any) {
    console.error("PUT Advertisement Error:", error);
    return NextResponse.json({ error: "Failed to update advertisement" }, { status: 500 });
  }
}

// Admin DELETE: Remove an advertisement
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.advertisement.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Advertisement deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Advertisement Error:", error);
    return NextResponse.json({ error: "Failed to delete advertisement" }, { status: 500 });
  }
}
