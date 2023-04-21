import { APIRequest, baseURL } from ".";

const studentURL = baseURL + "/discipline";
const adminBaseURL = studentURL + "/admin";

export const fetchAllDisciplines = async () =>
  await APIRequest(studentURL + `/`, "GET");

export const createNewDiscipline = async (discipline: Discipline.RootObject) =>
  await APIRequest(adminBaseURL, "POST", discipline);
