import { APIRequest, baseURL } from ".";

const studentURL = baseURL + '/hr';
const adminBaseURL = studentURL + '/create';

export const createHR = async (hr: any) => await APIRequest(adminBaseURL, "POST", hr);