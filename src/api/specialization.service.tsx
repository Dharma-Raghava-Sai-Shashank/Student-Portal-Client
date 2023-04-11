import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/specialization';
const adminBaseURL = studentURL + '/admin';

export const fetchSpecializationForCourses = async (courseIds: number[]) =>
await APIRequest(adminBaseURL , "POST", courseIds);