"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import JobListings from "../app/jobs/page";  // Displays jobs for seekers
import CompanyDashboard from "./components/CompanyDashboard"; // Allows job posting/editing

export default function JobsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setMode] = useState<"company" | "seeker" | null>(null);

  // Set mode based on URL
  useEffect(() => {
    if (pathname.includes("/company")) {
      setMode("company");
    } else if (pathname.includes("/jobs")) {
      setMode("seeker");
    } else {
      setMode(null);
    }
  }, [pathname]);

  // Function to handle navigation
  const handleModeSelection = (selectedMode: "company" | "seeker") => {
    setMode(selectedMode);
    router.push(selectedMode === "company" ? "/company" : "/jobs");
  };

  return (
  
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Mini Job Board</h1>
  
        {/* Mode Selection */}
        {!mode && (
          <div className="flex gap-12">
            <button
              onClick={() => handleModeSelection("seeker")}
              className="bg-blue-600 w-32 h-32 text-lg font-semibold rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
            >
              Job Seeker
            </button>
            <button
              onClick={() => handleModeSelection("company")}
              className="bg-green-600 w-32 h-32 text-lg font-semibold rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition"
            >
              Company
            </button>
          </div>
        )}
  
        {/* Render Components Based on Mode */}
        {mode === "seeker" && <JobListings />}
        {mode === "company" && <CompanyDashboard />}
      </div>
    );
  }