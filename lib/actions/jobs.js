"use server";

import { mutedServer } from "../core/server";

export const createJob = async (jobData) => {
  const res = await mutedServer("/api/jobs", jobData);
  return res;
};
