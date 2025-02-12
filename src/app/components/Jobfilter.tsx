"use client";
import { useState } from "react";
import { Slider } from "../../components/ui/slider";
import { Button } from "../../components/ui/button";




import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Search, Building2, MapPin, IndianRupeeIcon as CurrencyRupee, X } from "lucide-react"

type JobFiltersProps = {
  onFilterChange: (filters: {
    title?: string
    company?: string
    location?: string
    minSalary?: number
    maxSalary?: number
  }) => void
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [salaryRange, setSalaryRange] = useState<[number, number]>([10000, 50000])

  const handleSalaryChange = (value: number[]) => {
    setSalaryRange([value[0], value[1]])
  }

  const handleFilterChange = () => {
    const filters: {
      title?: string
      company?: string
      location?: string
      minSalary?: number
      maxSalary?: number
    } = {}

    if (title.trim().length > 0) filters.title = title.trim().toLowerCase()
    if (company.trim().length > 0) filters.company = company.trim().toLowerCase()
    if (location.trim().length > 0) filters.location = location.trim().toLowerCase()

    if (salaryRange[0] <= salaryRange[1]) {
      filters.minSalary = salaryRange[0]
      filters.maxSalary = salaryRange[1]
    }

    onFilterChange(filters)
  }

  const resetFilters = () => {
    setTitle("")
    setCompany("")
    setLocation("")
    setSalaryRange([10000, 50000])
    onFilterChange({})
  }

  return (
    <Card className="w-full mt-10 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">Find Your Dream Job</CardTitle>
        <p className="text-sm text-indigo-600 dark:text-indigo-400">Use the filters below to narrow down your search</p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Job Title/Job Category
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
              <Input
                id="title"
                type="text"
                placeholder="e.g. Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:border-indigo-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 bg-white dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Company
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
              <Input
                id="company"
                type="text"
                placeholder="e.g. Acme Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:border-indigo-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 bg-white dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
              <Input
                id="location"
                type="text"
                placeholder="e.g. Mumbai"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400 dark:border-indigo-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 bg-white dark:bg-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-indigo-700 dark:text-indigo-300 flex items-center">
            <CurrencyRupee className="mr-2 text-indigo-500" size={18} />
            Salary Range (₹10K - ₹50K)
          </label>
          <Slider
            value={salaryRange}
            min={10000}
            max={50000}
            step={5000}
            onValueChange={handleSalaryChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-indigo-600 dark:text-indigo-400">
            <span>₹{salaryRange[0].toLocaleString()}</span>
            <span>₹{salaryRange[1].toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            onClick={resetFilters}
            variant="outline"
            className="flex items-center border-indigo-300 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-colors duration-200"
          >
            <X className="mr-2" size={18} />
            Reset Filters
          </Button>

          <Button
            onClick={handleFilterChange}
            className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200"
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

