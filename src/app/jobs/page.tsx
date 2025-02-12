"use client";
import { useEffect, useState } from "react";
import JobCard from "../../app/components/JobCard";
import JobFilters from "../../app/components/Jobfilter";

export default function JobListings() {
    const [jobs, setJobs] = useState([]);  // Ensure initial state is an array
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("/api/jobs")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Jobs Data:", data); // ✅ Log API response
          if (Array.isArray(data)) {
            setJobs(data);
            setFilteredJobs(data);
          } else {
            setJobs([]);
            setFilteredJobs([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error); // ✅ Log API error
          setJobs([]);
          setFilteredJobs([]);
          setLoading(false);
        });
    }, []);
    
    const handleFilterChange = (filters) => {
      if (!Array.isArray(jobs)) return;  // ✅ Ensure jobs is an array before filtering

      const filtered = jobs.filter((job) =>
        (filters.title ? job.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.company ? job.company.toLowerCase().includes(filters.company.toLowerCase()) : true) &&
        (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
        (filters.minSalary ? job.salary >= parseInt(filters.minSalary) : true)
      );
      setFilteredJobs(filtered);
    };
  
    return (
      <div>
        <JobFilters onFilterChange={handleFilterChange} />
        <div className="grid gap-4 mt-7">
          {loading ? <p>Loading jobs...</p> : 
            filteredJobs.length > 0 ? 
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />) : 
              <p>No jobs found.</p>
          }
        </div>
      </div>
    );
}
