/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: number;
};

export default function JobApplicationForm({ job }: { job: Job }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      currentCompany: "",
      experience: "",
      noticePeriod: "",
      expectedSalary: "",
      resume: "",
      coverLetter: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
      // if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.resume.trim()) newErrors.resume = "Resume URL is required";
      if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required"; // Cover letter validation
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
      setSubmitStatus(""); // Clear submit status on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
          setSubmitStatus("Please fill in all required fields.");
          return;
      }

      setIsSubmitting(true);
      try {
          const dataToSend = {
              jobId: job.id,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              currentCompany: formData.currentCompany,
              experience: Number(formData.experience), // Use Number for parsing
              noticePeriod: formData.noticePeriod,
              expectedSalary: Number(formData.expectedSalary), // Use Number for parsing
              resume: formData.resume,
              coverLetter: formData.coverLetter,
          };

          console.log("Submitting application with data:", dataToSend); // Log data being sent

          const response = await fetch("/api/applications", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json", // Important: Set Content-Type
              },
              body: JSON.stringify(dataToSend), // Stringify the data
          });

          if (!response.ok) {
              const errorData = await response.json(); // Try to get error details from server
              console.error("Server error:", errorData); // Log server error details
              throw new Error(errorData.error || "Failed to submit application"); // Throw error with message
          }

          const responseBody = await response.json(); // Parse JSON response
          console.log("Application submitted successfully:", responseBody);
          setSubmitStatus("Application submitted successfully!");
          setFormData({  // Reset form
              name: "",
              email: "",
              phone: "",
              currentCompany: "",
              experience: "",
              noticePeriod: "",
              expectedSalary: "",
              resume: "",
              coverLetter: "",
          });

      } catch (error: any) { // Catch any type of error
          console.error("Submission error:", error); // Log the full error object
          setSubmitStatus(error.message || "Failed to submit application. Please try again."); // Display specific error message
      } finally {
          setIsSubmitting(false);
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Apply for {job.title}</CardTitle>
          <p className="text-gray-600">{job.company} - {job.location}</p>
          <p className="text-gray-500 text-sm">{job.description}</p>
          <p className="text-gray-700 font-medium mt-2">Salary:₹{job.salary}</p>
        </CardHeader>
        <CardContent>
          {submitStatus && (
            <div className={`mb-4 p-3 rounded-lg ${submitStatus.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {submitStatus}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} <span className="text-red-500">*</span>
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 ${errors[field] ? "border-red-500" : ""}`}
                  placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}
            <div className="flex justify-end gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
