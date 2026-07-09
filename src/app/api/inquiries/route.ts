import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all inquiries (admin use)
export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("GET /api/inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

// POST — create a new inquiry (public)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        phone: phone ? String(phone).trim() : null,
        subject: subject ? String(subject).trim() : null,
        message: String(message).trim(),
        source: source || "CONTACT_FORM",
        status: "NEW",
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}
