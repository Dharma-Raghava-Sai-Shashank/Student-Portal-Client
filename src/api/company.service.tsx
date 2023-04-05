import { APIRequest, baseURL } from ".";

const authBaseURL = baseURL + '/company';
const adminBaseURL = authBaseURL + '/admin';

export const fetchAllCompanies = async () =>
  await APIRequest(adminBaseURL + `/all`, "GET");

export const fetchCompaniesForCycle = async (placementCycleId: number) =>
  await APIRequest(adminBaseURL + `/${placementCycleId}`, "GET");

export const searchCompany = async (placementCycleId: number,query: string) =>
  await APIRequest(baseURL + `/search/${placementCycleId}/${query}`, "GET");

export const fetchCompanyById = async (companyId: number) =>
  await APIRequest(baseURL + `/${companyId}`, "GET");

export const fetchCompanyHRs = async (companyId: number) =>
  await APIRequest(adminBaseURL + `/hrs/${companyId}`, "GET");

export const fetchCompanyNFs = async (companyId: number) =>
  await APIRequest(adminBaseURL + `/nfs/${companyId}`, "GET");