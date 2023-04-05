import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/stage';
const adminBaseURL = studentURL + '/admin';

export const fetchAllStages = async () =>
await APIRequest(adminBaseURL, "GET");