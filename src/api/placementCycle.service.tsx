import { APIRequest, baseURL } from ".";

const authBaseURL = baseURL + '/placementcycle';
const adminBaseURL = authBaseURL + '/admin';

export const fetchAllPlacementCycles = async () =>
await APIRequest(adminBaseURL, "GET");