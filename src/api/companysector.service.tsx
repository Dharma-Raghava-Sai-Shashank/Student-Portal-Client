import { APIRequest, baseURL } from ".";

const endpoint = baseURL + '/sector/';

export const fetchAllSectors = async () =>
    await APIRequest(endpoint, "GET");