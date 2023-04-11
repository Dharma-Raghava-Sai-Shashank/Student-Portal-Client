import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/hr';
const adminBaseURL = studentURL + '/admin';

export const createHR = async (hr: any) => await APIRequest(adminBaseURL, "POST", hr);