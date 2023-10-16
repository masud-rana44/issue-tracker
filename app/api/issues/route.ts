import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import db from "@/lib/db";
import authOptions from "../auth/AuthOptions";
import { issueSchema } from "@/app/validationSchemas";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json("Unauthorized", { status: 401 });

    const { values } = await req.json();
    const validation = issueSchema.safeParse(values);

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
