const APIRequest = async (url: string, method: string, data?: Object) => {
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response: any) => response.json())
    .catch((error) => error.message);

  return response;
};

const baseURL = `http://localhost:3001/api`;

// ----------------------------------- AUTH REQUESTS -------------------------------------------

export const signin = async (data: User.AuthData) =>
  await APIRequest(baseURL + `/auth/signin`, "POST", data);

// ----------------------------------- COMPANY REQUESTS ----------------------------------------

export const fetchAllCompanies = async () =>
  await APIRequest(baseURL + `/company/admin/all`, "GET");

export const fetchCompaniesForCycle = async (placementCycleId: number) =>
  await APIRequest(baseURL + `/company/admin/${placementCycleId}`, "GET");

export const searchCompany = async (placementCycleId: number,query: string) =>
  await APIRequest(baseURL + `/company/search/${placementCycleId}/${query}`, "GET");

export const fetchCompanyById = async (companyId: number) =>
  await APIRequest(baseURL + `/company/${companyId}`, "GET");

export const fetchCompanyHRs = async (companyId: number) =>
  await APIRequest(baseURL + `/company/admin/hrs/${companyId}`, "GET");

export const fetchCompanyNFs = async (companyId: number) =>
  await APIRequest(baseURL + `/company/admin/nfs/${companyId}`, "GET");

// ----------------------------------- COMPANY REQUESTS ----------------------------------------

export const fetchAllPlacementCycles = async () =>
await APIRequest(baseURL + `/placementcycle/admin`, "GET");