export default function validateFormInput(input) {
  const newErrors = {};
  const { data, isRemote } = input;
  if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
  if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
  if (!data.jobType) newErrors.jobType = "Job type is required";
  if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
  if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
  if (!isRemote && !data.location)
    newErrors.location = "Location is required for non-remote roles";
  if (!data.deadline) newErrors.deadline = "Application deadline is required";
  if (!data.responsibilities)
    newErrors.responsibilities = "Responsibilities are required";
  if (!data.requirements) newErrors.requirements = "Requirements are required";

  return newErrors;
}
