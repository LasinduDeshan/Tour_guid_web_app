import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Admin PUT: Update an existing destination
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, region, description, image, bestTime, temp, attractions, activities, features, gallery, lat, lng, categoryFilter } = body;

    if (!name || !region || !description || !image || !bestTime || !temp || !categoryFilter) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedDest = await prisma.destination.update({
      where: { id },
      data: {
        name,
        region,
        description,
        image,
        bestTime,
        temp,
        attractions: Array.isArray(attractions) ? attractions : [],
        activities: Array.isArray(activities) ? activities : [],
        features: Array.isArray(features) ? features : [],
        gallery: Array.isArray(gallery) ? gallery : [],
        lat: lat ? parseFloat(lat) : 0.0,
        lng: lng ? parseFloat(lng) : 0.0,
        categoryFilter,
      } as any,
    });

    return NextResponse.json(updatedDest);
  } catch (error: any) {
    console.error("PUT Destination Error:", error);
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 });
  }
}

// Admin DELETE: Remove a destination
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.destination.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Destination deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Destination Error:", error);
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 });
  }
}
