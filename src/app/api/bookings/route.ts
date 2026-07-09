import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Public POST: Submit a traveler booking inquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, guests, message, tourId, tourTitle } = body;

    if (!name || !email || !date || !guests || !tourId || !tourTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const createdBooking = await prisma.booking.create({
      data: {
        name,
        email,
        date,
        guests,
        message,
        tourId,
        tourTitle,
        status: "PENDING",
      },
    });

    return NextResponse.json(createdBooking, { status: 201 });
  } catch (error: any) {
    console.error("POST Booking Error:", error);
    return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 });
  }
}

// Admin GET: Fetch all bookings/inquiries
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("GET Bookings Error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
