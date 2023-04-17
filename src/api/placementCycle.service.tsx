import { APIRequest, baseURL } from ".";

const studentBaseURL = baseURL + "/placementcycle";
const adminBaseURL = studentBaseURL + "/admin";

export const fetchAllPlacementCycles = async () =>
  await APIRequest(adminBaseURL, "GET");

export const fetchEnrolledPlacementCycles = async () =>
  await APIRequest(studentBaseURL + "/enrolled", "GET");

export const createPlacementCycle = async (cycleDetails: any) =>
  await APIRequest(adminBaseURL, "POST", cycleDetails);

export const fetchPlacementCycleById = async (placementCycleId: number) =>
  await APIRequest(adminBaseURL + `/${placementCycleId}`, "GET");
