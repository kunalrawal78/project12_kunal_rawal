"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobForm from "./JobForm";
import { Home, Clock, Bolt, Trash2, Pencil, Users } from "lucide-react";
import { formatRelativeTime } from "../../lib/utils";
import { Button } from "../../components/ui/button";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
  description: string;
  createdAt: string;
}

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  async function handleDelete(jobId: string) {
    if (!jobId) return;
    console.log("From Frontend->", jobId);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }), // Send jobId in the body
      });
  
      if (res.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Failed to delete job:", errorData);
        alert("Failed to delete job. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("An error occurred while deleting the job.");
    }
  }

  return (
    <div className="max-w-full sm:max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Company Dashboard</h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border">
        <JobForm
          existingJob={editingJob}
          onSuccess={(newJob) => {
            if (editingJob) {
              setJobs((prevJobs) => prevJobs.map((job) => (job.id === newJob.id ? newJob : job)));
            } else {
              setJobs([...jobs, newJob]);
            }
            setEditingJob(null);
          }}
        />
      </div>

      <h3 className="text-2xl font-semibold text-white mb-4">Your Posted Jobs</h3>
      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-4 shadow-md bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 font-medium">{job.company}</p>
                  <span className="text-blue-600 text-xs font-semibold border border-blue-500 rounded-full px-2 py-1">
                    Actively hiring
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Home size={16} /> {job.location}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1">💰 ₹ {job.salary}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-600 text-xs font-semibold flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                    <Clock size={14} /> {formatRelativeTime(job.createdAt)}
                  </span>
                  <span className="text-orange-600 text-xs font-semibold flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
                    <Bolt size={14} /> Be an early applicant
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                <Button onClick={() => setEditingJob(job)} className="bg-gray-700 hover:bg-gray-800 text-white flex items-center gap-1 px-2 py-1 text-sm rounded-md sm:px-4 sm:py-2">
                  <Pencil size={16} className="sm:mr-2" /> <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this job?')) {
                      handleDelete(job.id);
                    }
                  }} 
                  className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 px-2 py-1 text-sm rounded-md sm:px-4 sm:py-2"
                >
                  <Trash2 size={16} className="sm:mr-2" /> <span className="hidden sm:inline">Delete</span>
                </Button>
                <Button onClick={() => router.push(`/company/jobs/${job.id}/applications`)} className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 px-2 py-1 text-sm rounded-md sm:px-4 sm:py-2">
                  <Users size={16} className="sm:mr-2" /> <span className="hidden sm:inline">View Applications</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}