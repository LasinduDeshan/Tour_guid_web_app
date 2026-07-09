import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Admin PUT: Update an existing FAQ
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { question, answer, order } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: "Missing required fields: question and answer" }, { status: 400 });
    }

    const updatedFaq = await prisma.fAQ.update({
      where: { id },
      data: {
        question,
        answer,
        order: typeof order === "number" ? order : 0,
      },
    });

    return NextResponse.json(updatedFaq);
  } catch (error: any) {
    console.error("PUT FAQ Error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

// Admin DELETE: Remove an FAQ
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.fAQ.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error: any) {
    console.error("DELETE FAQ Error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
