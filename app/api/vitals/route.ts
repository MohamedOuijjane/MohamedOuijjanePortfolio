import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Basic validation of the payload
    const { name, value, id, path } = body;
    
    if (!name || value === undefined || !id) {
      return new NextResponse("Invalid payload", { status: 400 });
    }

    // Log the metric
    console.log(`[Web Vital] ${name}: ${value} (ID: ${id}) on ${path || 'unknown'}`);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error processing Web Vital:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
