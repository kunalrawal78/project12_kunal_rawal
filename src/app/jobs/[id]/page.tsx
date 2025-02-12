"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JobApplicationForm from "../../../app/components/Jobapplication";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: number;
};

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch job details");
        return res.json();
      })
      .then(setJob)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching job details</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div className="p-6">
      <JobApplicationForm job={job} />
    </div>
  );
}
