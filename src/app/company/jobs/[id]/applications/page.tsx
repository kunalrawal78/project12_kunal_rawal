"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Users, Mail, Phone } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume: string; // URL to resume
  createdAt: string;
}

export default function JobApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const router = useRouter();
  const params = useParams(); 

const { id: jobId } = useParams() as { id: string };// Extract jobId from params
  console.log(jobId)
  useEffect(() => {
    if (!jobId) return;
  
    fetch(`/api/jobs/${jobId}/applications`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error("Error fetching applications:", err));
  }, [jobId]);
  console.log("Applications:", applications);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-white mb-6">Job Applications</h2>
      <Button onClick={() => router.back()} className="mb-4">Back</Button>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No applications received yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4 shadow-md bg-white">
              <h3 className="text-lg font-semibold">{app.name}</h3>
              <div className="text-gray-600 text-sm flex items-center gap-2">
                <Mail size={16} /> {app.email}
              </div>
              <div className="text-gray-600 text-sm flex items-center gap-2 mt-1">
                <Phone size={16} /> {app.phone}
              </div>
              <a
                href={app.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
              >
                View Resume
              </a>
              <p className="text-xs text-gray-500 mt-2">Applied on: {new Date(app.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
