import { APIRequest, baseURL } from ".";

const endpoint = baseURL + '/category/admin';

export const fetchAllCategories = async () =>
    await APIRequest(endpoint, "GET");