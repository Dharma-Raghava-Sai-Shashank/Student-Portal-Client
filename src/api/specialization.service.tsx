import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/specialization';
const adminBaseURL = studentURL + '/admin';

export const fetchSpecializationForCourses = async (courseId: number) =>
await APIRequest(adminBaseURL + `/${courseId}`, "GET");