import { createIssueSchema } from "@/app/validationSchemas";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { values } = await req.json();
    const validation = createIssueSchema.safeParse(values);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await db.issue.create({
      data: {
        title: values.title,
        description: values.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.log("[ISSUES_POST]: " + error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
