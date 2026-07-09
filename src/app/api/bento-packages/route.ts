import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { translateBentoPackage, ensureOfflineStatus } from "@/lib/translator";

// Public GET: Fetch all bento packages sorted by custom index
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cookieLang = request.cookies.get("preferred_language")?.value;
    const lang = searchParams.get("lang") || cookieLang || "en";

    await ensureOfflineStatus();

    const packages = await prisma.bentoPackage.findMany({
      orderBy: {
        order: "asc",
      },
    });

    const translatedPackages = await Promise.all(
      packages.map((pkg) => translateBentoPackage(pkg, lang))
    );

    return NextResponse.json(translatedPackages);
  } catch (error: any) {
    console.error("GET Bento Packages Error:", error);
    return NextResponse.json({ error: "Failed to fetch bento packages" }, { status: 500 });
  }
}


// Admin POST: Create a bento package
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      highlight,
      headerDesc,
      tabName,
      sectionBg,
      
      card1Title,
      card1Desc,
      card1FooterTitle,
      card1FooterSub,
      card1Bg,
      card1Text,
      
      card2Title,
      card2Desc,
      card2Image,
      card2Link,
      card2Button,
      
      card3Bg,
      card3Text,
      card3Title,
      card3Footer,
      card3Inclusions,
      
      card4Title,
      card4Desc,
      card4Image,
      card4Link,
      card4Button,
      order,
    } = body;

    // Validate essential fields
    if (!title || !highlight || !tabName) {
      return NextResponse.json({ error: "Missing required fields: title, highlight, or tabName" }, { status: 400 });
    }

    const createdPackage = await prisma.bentoPackage.create({
      data: {
        title,
        highlight,
        headerDesc: headerDesc || "",
        tabName,
        sectionBg: sectionBg || "bg-[#9CBFA7]",
        
        card1Title: card1Title || "",
        card1Desc: card1Desc || "",
        card1FooterTitle: card1FooterTitle || "",
        card1FooterSub: card1FooterSub || "",
        card1Bg: card1Bg || "bg-[#0E1B15]",
        card1Text: card1Text || "text-white",
        
        card2Title: card2Title || "",
        card2Desc: card2Desc || "",
        card2Image: card2Image || "",
        card2Link: card2Link || "",
        card2Button: card2Button || "",
        
        card3Bg: card3Bg || "bg-[#C5B4F3]",
        card3Text: card3Text || "text-[#002244]",
        card3Title: card3Title || "",
        card3Footer: card3Footer || "",
        card3Inclusions: card3Inclusions || [],
        
        card4Title: card4Title || "",
        card4Desc: card4Desc || "",
        card4Image: card4Image || "",
        card4Link: card4Link || "",
        card4Button: card4Button || "",
        
        order: typeof order === "number" ? order : 0,
      },
    });

    return NextResponse.json(createdPackage, { status: 201 });
  } catch (error: any) {
    console.error("POST Bento Package Error:", error);
    return NextResponse.json({ error: "Failed to create bento package" }, { status: 500 });
  }
}
