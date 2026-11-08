import {
  File, // For Total Job Posts
  Persons, // For Total Applicants
  ThunderboltFill, // For Active Jobs
  Check, // For Jobs Closed
} from "@gravity-ui/icons";
import RecruiterState from "./RecruiterState";

export default function RecruiterDashboard() {
  const stats = [
    { title: "Total Job Posts", value: "48", icon: File },
    { title: "Total Applicants", value: "1,284", icon: Persons },
    { title: "Active Jobs", value: "18", icon: ThunderboltFill },
    { title: "Jobs Closed", value: "32", icon: Check },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 ">
      <h1 className="text-xl font-medium text-zinc-200">
        Welcome back, Alex Sterling
      </h1>

      {/* Responsive Grid for Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <RecruiterState
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
