import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const buffer = await fetch(url).then(async (res) => {
      return Buffer.from(await res.arrayBuffer());
    });

    const { base64 } = await getPlaiceholder(buffer);

    return NextResponse.json({ blurDataURL: base64 });
  } catch (error) {
    console.error("Error generating blur data:", error);
    return NextResponse.json(
      { error: "Failed to generate blur data" },
      { status: 500 }
    );
  }
}
