import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/course';
const adminBaseURL = studentURL + '/admin';

export const fetchAllCourses = async () =>
await APIRequest(adminBaseURL, "GET");