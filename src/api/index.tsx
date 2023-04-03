export const APIRequest = async (url: string, method: string, data?: Object | FormData) => {
  const response = await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      // "Content-Type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response: any) => response.json())
    .catch((error) => ({ success: false, message: error.message}));

  return response;
};

export const baseURL = `http://localhost:3001/api`;

// ----------------------------------- AUTH REQUESTS -------------------------------------------

export const signin = async (data: User.AuthData) =>
  await APIRequest(baseURL + `/auth/signin`, "POST", data);

export const adminSignin = async (data: User.AuthData) =>
  await APIRequest(baseURL + `/auth/admin/signin`, "POST", data);

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

// ----------------------------------- JOB REQUESTS ----------------------------------------

export const fetchJobsForAdmin = async (placementCycleId: number) =>
await APIRequest(baseURL + `/jobs/admin/${placementCycleId}`, "GET");

export const searchJobsForAdmin = async (placementCycleId: number, query: string) =>
await APIRequest(baseURL + `/jobs/admin/search/${placementCycleId}/${query}`, "GET");

export const deleteJob = async (jobId: number) =>
await APIRequest(baseURL + `/jobs/admin/${jobId}`, "DELETE");

export const createJob = async (job: any) =>
await APIRequest(baseURL + `/jobs/admin/`, "POST", job);

// ----------------------------------- DOCUMENT REQUESTS ----------------------------------------

export const uploadFile = async (data: FormData) : Promise<any> =>{
  return fetch(baseURL + `/document/`, {
    body: data,
    method: 'post'
  }).then((response: any) => response.json());
}

// ----------------------------------- CATEGORY REQUESTS ----------------------------------------

export const fetchAllCategories = async () =>
await APIRequest(baseURL + `/category/admin`, "GET");

// ----------------------------------- COURSES REQUESTS ----------------------------------------

export const fetchAllCourses = async () =>
await APIRequest(baseURL + `/course/admin`, "GET");

// ----------------------------------- CATEGORY REQUESTS ----------------------------------------

export const fetchSpecializationForCourses = async (courseId: number) =>
await APIRequest(baseURL + `/specialization/admin/${courseId}`, "GET");

// ----------------------------------- SCPT REQUESTS ----------------------------------------

export const fetchAllScpts = async () =>
await APIRequest(baseURL + `/scpt/admin`, "GET");

// ----------------------------------- HR REQUESTS ----------------------------------------

export const createHR = async (hr: any) => await APIRequest(baseURL + `/hr/admin`, "POST", hr);

// ----------------------------------- SELECTION STAGE REQUESTS ----------------------------------------

export const fetchAllStages = async () =>
await APIRequest(baseURL + `/stage/admin`, "GET");
