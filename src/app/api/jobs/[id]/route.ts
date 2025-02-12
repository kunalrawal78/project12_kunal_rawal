/* eslint-disable @typescript-eslint/no-unused-vars */

import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

// Get a specific job by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({ where: { id: params.id } });
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Error fetching job details" }, { status: 500 });
  }
}

// Update a job by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, company, location, description, salary } = await req.json();
    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: { title, company, location, description, salary },
    });
    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}


import { PrismaClient } from "@prisma/client";



export async function DELETE(
  request: Request,
  { params }: { params: { jobId?: string } }
) {
  console.log("Received params:", params);
  const body = await request.json();
  const bodyJobId = body.jobId;

  if (!bodyJobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  const { jobId } = params;

  try {
    // Extract jobId from the request body
  
   

    // Validate jobId from params and body
    // if (jobId !== bodyJobId) {
    //   return NextResponse.json({ error: "Job ID mismatch" }, { status: 400 });
    // }

    const job = await prisma.job.findUnique({ where: { id: bodyJobId } });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    await prisma.job.delete({ where: { id: bodyJobId } });

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}