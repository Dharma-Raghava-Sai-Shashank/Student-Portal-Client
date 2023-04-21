import { APIRequest, baseURL } from ".";

const studentURL = baseURL + "/department";
const adminBaseURL = studentURL + "/admin";

export const fetchAllDepartments = async () =>
  await APIRequest(adminBaseURL + `/`, "GET");

export const createNewDepartment = async (department: Department.RootObject) =>
  await APIRequest(adminBaseURL, "POST", department);
