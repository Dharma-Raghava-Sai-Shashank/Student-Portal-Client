import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/sector';
const adminBaseURL = studentURL + '/admin';

export const fetchAllSectors = async () =>
await APIRequest(adminBaseURL, "GET");