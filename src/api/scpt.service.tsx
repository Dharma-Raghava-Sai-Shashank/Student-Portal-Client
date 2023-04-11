import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/scpt';
const adminBaseURL = studentURL + '/admin';

export const fetchAllScpts = async () =>
await APIRequest(adminBaseURL, "GET");