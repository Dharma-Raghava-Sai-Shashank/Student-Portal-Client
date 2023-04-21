import { APIRequest, baseURL } from ".";

const studentURL = baseURL + "/specialization";
const adminBaseURL = studentURL + "/admin";

export const fetchSpecializationForCourses = async (
  courseIds: number[],
  acadYear: string
) => await APIRequest(adminBaseURL, "POST", { courseIds, acadYear });

export const createNewSpecialization = async (specialization: Specialization.RootObject) =>
  await APIRequest(adminBaseURL + "/create", "POST", specialization);
