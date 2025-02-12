import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
      const body = await req.text();
      console.log("Received body (before parsing):", body); // Log raw body

      const data = JSON.parse(body);
      console.log("Parsed data:", data); // Log parsed data

      const {
          name, email,
           phone, currentCompany,
          experience, noticePeriod, expectedSalary,
          resume, coverLetter, jobId
      } = data;

      // More detailed validation with specific error messages
      if (!name) {
          return NextResponse.json({ error: "Name is required" }, { status: 400 });
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
          return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }
      if (!phone) {
          return NextResponse.json({ error: "Phone is required" }, { status: 400 });
      }
      if (!resume) {
          return NextResponse.json({ error: "Resume is required" }, { status: 400 });
      }
      if (!coverLetter) {
          return NextResponse.json({ error: "Cover letter is required" }, { status: 400 });
      }
      if (!jobId) {
          return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
      }

      const newApplication = await prisma.application.create({
          data: {
              name,
              email,
              phone,
              currentCompany,
              experience: Number(experience) || 0, // Handle potential NaN
              noticePeriod,
              expectedSalary: Number(expectedSalary) || 0, // Handle potential NaN
              resume,
              coverLetter,
              jobId,
          },
      });

      return NextResponse.json(newApplication, { status: 201 });

  } catch (error: any) { // Catch any error
      console.error("Error in POST /api/applications:", error); // Log full error object
      return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 }); // Send error message to client
  }
}