import { APIRequest, baseURL } from ".";

const studentURL = baseURL + "/jobs";
const adminBaseURL = studentURL + "/admin";

export const fetchJobsForAdmin = async (placementCycleId: number) =>
  await APIRequest(adminBaseURL + `/${placementCycleId}`, "GET");

export const searchJobsForAdmin = async (
  placementCycleId: number,
  query: string
) =>
  await APIRequest(
    adminBaseURL + `/search/${placementCycleId}/${query}`,
    "GET"
  );

export const deleteJob = async (jobId: number) =>
  await APIRequest(adminBaseURL + `/${jobId}`, "DELETE");

export const createJob = async (job: any) =>
  await APIRequest(adminBaseURL + `/`, "POST", job);

export const checkEligibilityForJob = async (admno: string, nfId: number) =>
  await APIRequest(studentURL + "/check/eligible", "PUT", { admno, nfId });

export const applyForJobByAdmin = async (admno: string, nfId: number) =>
  await APIRequest(adminBaseURL + "/check/apply", "PUT", { admno, nfId });
