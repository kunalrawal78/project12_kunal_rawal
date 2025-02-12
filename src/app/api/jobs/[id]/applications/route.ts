import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const applications = await prisma.application.findMany({
      where: { jobId: params.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
