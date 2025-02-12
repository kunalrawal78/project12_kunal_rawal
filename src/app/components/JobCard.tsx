/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Briefcase, Home, Clock, Bolt } from "lucide-react";
import { formatRelativeTime } from "../../lib/utils";
import { Button } from "../../components/ui/button";

export default function JobCard({ job }: { job: any }) {
  return (
    <div className="border mb-5 rounded-lg p-4 shadow-md bg-white flex justify-between items-center relative w-full max-w-4xl mx-auto">
      {/* Left Content */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{job.title}</h2>

        <div className="flex items-center gap-2">
          <p className="text-gray-600 font-medium">{job.company}</p>
          <span className="text-blue-600 text-[10px] lg:text-sm  font-semibold border border-blue-500 rounded-full px-2 py-1">
            Actively hiring
          </span>
        </div>

        {/* Job Details */}
        <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
          <span className="flex items-center gap-1 text-[10px] lg:text-sm ">
            <Home size={16} /> {job.location}
          </span>
          <span className="flex items-center gap-1 text-[10px] lg:text-sm ">
            <Briefcase size={16} /> {job.experience || "0"} year(s)
          </span>
          <span className="flex items-center gap-1 text-[10px] lg:text-sm ">
      ₹ {job.salary !== null ? job.salary : "Not specified"}
</span>
        </div>

        {/* Tags with Relative Time */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-green-600 text-[10px] lg:text-sm font-semibold flex items-center gap-1 bg-green-100 lg:px-2 py-1 lg:rounded-full">
            <Clock size={14} /> {formatRelativeTime(job.createdAt)}
          </span>
          <span className="text-orange-600 text-[10px] lg:text-sm  font-semibold flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
            <Bolt size={14} /> Be an early applicant
          </span>
          <span className="text-gray-500 text-[10px] lg:text-sm  bg-gray-200 px-2 py-1 rounded-full">
            Fresher Job
          </span>
        </div>
      </div>

      {/* Right side with Logo and Apply Button */}
      <div className="flex flex-col items-end gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          🏢 {/* Replace with actual job.logo */}
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] lg:text-sm w-15 bottom-0 lg:px-6 lg:py-2 rounded-md right-0"
          >
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}