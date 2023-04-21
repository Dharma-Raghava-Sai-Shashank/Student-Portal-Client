import { APIRequest, baseURL } from '.';

const adminBaseUrl = baseURL+'/acadyear/admin';

export const fetchCurrentAcadYear = async () => await APIRequest(adminBaseUrl, 'GET');

export const fetchAllAcadYears = async () => await APIRequest(adminBaseUrl + '/all', 'GET');

export const createAcademicYear = async (acadYear: { year: string }) => await APIRequest(adminBaseUrl, 'POST', acadYear);

export const changeAcadYearStatus = async (year: string) => await APIRequest(adminBaseUrl + `/${year}`, 'PUT');
