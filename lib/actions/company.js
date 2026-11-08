"use server";

import { mutedServer } from "../core/server";

export const createCompany = async (companyData) => {
  const res = await mutedServer("/api/company", companyData);
  return res;
};
