"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
  description: string;
}

interface JobFormProps {
  existingJob?: Job | null;
  onSuccess: (job: Job) => void;
}

export default function JobForm({ existingJob, onSuccess }: JobFormProps) {
  const [job, setJob] = useState<Job>({
    title: "",
    company: "",
    location: "",
    salary: undefined,
    description: "",
  });

  useEffect(() => {
    if (existingJob) setJob(existingJob);
  }, [existingJob]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = existingJob ? "PUT" : "POST";
    const endpoint = existingJob ? `/api/jobs/${existingJob.id}` : "/api/jobs";
  
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...job,
          salary: job.salary ? Number(job.salary) : undefined, // ✅ Ensure salary is a number
        }),
      });
  
      if (res.ok) {
        const updatedJob = await res.json();
        onSuccess(updatedJob);
      } else {
        console.error("Failed to save job:", await res.text());
      }
    } catch (error) {
      console.error("Error saving job:", error);
    }
  }
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className=" top-0 text-2xl font-semibold">Post New Jobs</h1>
      <input
        type="text"
        placeholder="Job Title"
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Company"
        value={job.company}
        onChange={(e) => setJob({ ...job, company: e.target.value })}
        className="border p-2 w-full"
      />
         <input
        type="text"
        placeholder="Location "
        value={job.location}
        onChange={(e) => setJob({ ...job, location: e.target.value })}
        className="border p-2 w-full"
      />
    <input
  type="text"
  placeholder="Salary without ','"
  value={job.salary || ""}
  onChange={(e) => setJob({ ...job, salary: Number(e.target.value) || 0 })} // ✅ Convert to number
  className="border p-2 w-full"
/>

      <textarea
        placeholder="Job Description"
        value={job.description}
        onChange={(e) => setJob({ ...job, description: e.target.value })}
        className="border p-2 w-full"
      />
      <Button type="submit" className="bg-blue-600 text-white px-4 py-2">
        {existingJob ? "Update Job" : "Post Job"}
      </Button>
    </form>
  );
}
