import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { translateFAQ } from "@/lib/translator";

// Public GET: Fetch all FAQs, ordered by 'order' asc, with support for translation query
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const faqs = await prisma.fAQ.findMany({
      orderBy: {
        order: "asc",
      },
    });

    if (lang && lang !== "en") {
      const translatedFaqs = await Promise.all(
        faqs.map((faq) => translateFAQ(faq, lang))
      );
      return NextResponse.json(translatedFaqs);
    }

    return NextResponse.json(faqs);
  } catch (error: any) {
    console.error("GET FAQs Error:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

// Admin POST: Create a new FAQ
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { question, answer, order } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: "Missing required fields: question and answer" }, { status: 400 });
    }

    // Automatically calculate default order if not provided
    let finalOrder = order;
    if (typeof finalOrder !== "number") {
      const maxOrderFaq = await prisma.fAQ.findFirst({
        orderBy: { order: "desc" },
      });
      finalOrder = maxOrderFaq ? maxOrderFaq.order + 1 : 0;
    }

    const createdFaq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        order: finalOrder,
      },
    });

    return NextResponse.json(createdFaq, { status: 201 });
  } catch (error: any) {
    console.error("POST FAQ Error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
