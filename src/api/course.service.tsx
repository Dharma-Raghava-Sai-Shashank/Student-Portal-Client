import { APIRequest, baseURL } from ".";

const studentURL = baseURL + "/course";
const adminBaseURL = studentURL + "/admin";

export const fetchAllCourses = async () =>
  await APIRequest(adminBaseURL, "GET");

export const createNewCourse = async (course: Course.RootObject) =>
  await APIRequest(adminBaseURL, "POST", course);
