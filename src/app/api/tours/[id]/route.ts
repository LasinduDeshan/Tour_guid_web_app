import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Admin PUT: Update an existing tour and refresh its roadmap steps
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, image, price, duration, category, facilities, roadmap } = body;

    if (!title || !description || !image || !price || !duration || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Transaction to delete old steps and update tour details with new steps
    const updatedTour = await prisma.$transaction(async (tx: any) => {
      // Delete existing steps
      await tx.roadmapStep.deleteMany({
        where: { tourId: id },
      });

      // Update tour details and recreate steps
      return tx.tour.update({
        where: { id },
        data: {
          title,
          description,
          image,
          price: parseFloat(price),
          duration,
          category,
          facilities: Array.isArray(facilities) ? facilities : [],
          roadmap: {
            create: Array.isArray(roadmap)
              ? roadmap.map((step: any) => ({
                  day: parseInt(step.day),
                  location: step.location,
                  title: step.title,
                  description: step.description,
                  lat: parseFloat(step.lat),
                  lng: parseFloat(step.lng),
                }))
              : [],
          },
        },
        include: {
          roadmap: {
            orderBy: {
              day: "asc",
            },
          },
        },
      });
    });

    return NextResponse.json(updatedTour);
  } catch (error: any) {
    console.error("PUT Tour Error:", error);
    return NextResponse.json({ error: "Failed to update tour" }, { status: 500 });
  }
}

// Admin DELETE: Remove a tour and all cascade steps from database
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.tour.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Tour deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Tour Error:", error);
    return NextResponse.json({ error: "Failed to delete tour" }, { status: 500 });
  }
}
