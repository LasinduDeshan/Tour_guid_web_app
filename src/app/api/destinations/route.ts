import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { translateDestination, ensureOfflineStatus } from "@/lib/translator";

export const dynamic = "force-dynamic";

// Public GET: Fetch all destinations sorted alphabetical or by creation date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cookieLang = request.cookies.get("preferred_language")?.value;
    const lang = searchParams.get("lang") || cookieLang || "en";

    console.log("[API GET /api/destinations] Request received. lang parameter:", lang, "cookieLang:", cookieLang);

    // Call single quick ping check to determine offline mode before translating multiple records
    await ensureOfflineStatus();

    const destinations = await prisma.destination.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log("[API GET /api/destinations] Found destinations in db:", destinations.length);

    const translatedDestinations = await Promise.all(
      destinations.map(dest => translateDestination(dest, lang))
    );

    console.log("[API GET /api/destinations] Translated destinations successfully. First item name:", translatedDestinations[0]?.name);

    return NextResponse.json(translatedDestinations);
  } catch (error: any) {
    console.error("[API GET /api/destinations] GET Destinations Error:", error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}

// Admin POST: Add a new destination
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, region, description, image, bestTime, temp, attractions, activities, features, gallery, lat, lng, categoryFilter } = body;

    if (!name || !region || !description || !image || !bestTime || !temp || !categoryFilter) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const createdDest = await prisma.destination.create({
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

    return NextResponse.json(createdDest, { status: 201 });
  } catch (error: any) {
    console.error("POST Destination Error:", error);
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}
