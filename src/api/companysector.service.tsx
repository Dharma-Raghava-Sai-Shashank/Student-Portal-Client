import { APIRequest, baseURL } from ".";

const endpoint = baseURL + '/sector/admin';

export const fetchAllSectors = async () =>
    await APIRequest(endpoint, "GET");