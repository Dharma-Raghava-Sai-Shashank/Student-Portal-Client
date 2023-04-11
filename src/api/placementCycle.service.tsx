import { APIRequest, baseURL } from ".";

const studentBaseURL = baseURL + '/placementcycle';
const adminBaseURL = studentBaseURL + '/admin';

export const fetchAllPlacementCycles = async () =>
await APIRequest(adminBaseURL, "GET");

export const fetchEnrolledPlacementCycles = async () =>
await APIRequest(studentBaseURL + '/enrolled', "GET");