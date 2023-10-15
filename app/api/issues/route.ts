import { createIssueSchema } from "@/app/validationSchemas";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await db.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.log("[ISSUES_POST]: " + error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
