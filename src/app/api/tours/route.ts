import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { translateTour, ensureOfflineStatus } from "@/lib/translator";

export const dynamic = "force-dynamic";

// Public GET: Fetch all active tours with their roadmap steps
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cookieLang = request.cookies.get("preferred_language")?.value;
    const lang = searchParams.get("lang") || cookieLang || "en";

    // Call single quick ping check to determine offline mode before translating multiple records
    await ensureOfflineStatus();

    const tours = await prisma.tour.findMany({
      include: {
        roadmap: {
          orderBy: {
            day: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const translatedTours = await Promise.all(
      tours.map(t => translateTour(t, lang))
    );

    return NextResponse.json(translatedTours);
  } catch (error: any) {
    console.error("GET Tours Error:", error);
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 });
  }
}

// Admin POST: Create a new tour package along with its roadmap steps
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, image, price, duration, category, facilities, roadmap } = body;

    if (!title || !description || !image || !price || !duration || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const createdTour = await prisma.tour.create({
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
        roadmap: true,
      },
    });

    return NextResponse.json(createdTour, { status: 201 });
  } catch (error: any) {
    console.error("POST Tour Error:", error);
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 });
  }
}
