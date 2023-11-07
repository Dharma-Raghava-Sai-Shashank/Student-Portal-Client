import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/category';
const adminBaseURL = studentURL + '/admin';

export const fetchAllCategories = async () =>
await APIRequest(adminBaseURL, "GET");