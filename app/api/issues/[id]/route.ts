import { issueSchema } from "@/app/validationSchemas";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { values } = await req.json();
    const validation = issueSchema.safeParse(values);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const issue = await db.issue.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!issue)
      return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue = await db.issue.update({
      where: {
        id: issue.id,
      },
      data: {
        title: values.title,
        description: values.description,
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    console.log("[ISSUES_PATCH]: " + error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
