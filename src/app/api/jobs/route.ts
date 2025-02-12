import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const jobs = await prisma.job.findMany(); // ✅ Fetch all jobs
//     return NextResponse.json(jobs, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
//   }
// }
export async function GET() {
  try {
    const jobs = await prisma.job.findMany(); // Fetch jobs from DB
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text(); // ✅ Read raw body
    console.log("Received raw body:", bodyText);

    if (!bodyText) {
      return NextResponse.json({ error: "Empty request body" }, { status: 400 });
    }

    const { title, company, location, description, salary } = JSON.parse(bodyText);

    // ✅ Validate required fields
    if (!title || !company || !location || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Ensure salary is a number (fallback to 0 if missing)
    const formattedSalary = salary ? Number(salary) || 0 : 0;

    // ✅ Create new job
    const newJob = await prisma.job.create({
      data: { title, company, location, description, salary: formattedSalary },
    });

    console.log("Job created successfully:", newJob);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{jobId:string}>}
) {
  const jobId=(await params).jobId; // Extract jobId from params

  console.log("Received jobId:", jobId);

  if (!jobId) {
    return NextResponse.json(
      { error: "Job ID is required" },
      { status: 400 }
    );
  }

  try {
    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Delete the job
    await prisma.job.delete({
      where: { id: jobId },
    });

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);

    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}