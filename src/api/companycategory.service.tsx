import { APIRequest, baseURL } from ".";

const endpoint = baseURL + '/category/';

export const fetchAllCategories = async () =>
    await APIRequest(endpoint, "GET");