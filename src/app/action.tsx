// app/[locale]/action.ts
"use server";

import { prisma } from "../../lib/prisma";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string | number;
  description: string;
  createdAt: Date;
};

export type Application = {
  id: string;
  name: string;
  email: string;
  resume: string;
  coverLetter: string;
  jobId: string;
  createdAt: Date;
};

export async function getJobs(): Promise<Job[]> {
  try {
    return await prisma.job.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }
}

export async function addJob(
  title: string,
  company: string,
  location: string,
  salary: string | number,
  description: string
): Promise<Job> {
  try {
    return await prisma.job.create({
      data: {
        title,
        company,
        location,
        salary,
        description
      }
    });
  } catch (error) {
    console.error("Error adding job:", error);
    throw new Error("Failed to add job");
  }
}

export async function applyToJob(
  jobId: string,
  name: string,
  email: string,
  resume: string,
  coverLetter: string
): Promise<Application> {
  try {
    return await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        resume,
        coverLetter
      }
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    throw new Error("Failed to submit application");
  }
}

export async function getJobApplications(jobId: string): Promise<Application[]> {
  try {
    return await prisma.application.findMany({
      where: { jobId },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw new Error("Failed to fetch applications");
  }
}

