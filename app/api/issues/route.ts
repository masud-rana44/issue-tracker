import { createIssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    return NextResponse.json("success");
  } catch (error) {
    console.log("[ISSUES_POST]: " + error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
