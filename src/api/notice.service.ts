import { APIRequest, baseURL } from ".";

const studentBaseUrl = baseURL + "/notice";
const adminBaseUrl = studentBaseUrl + "/admin";

export const fetchNoticesForCycles = async (cycleIds: number[]) =>
  await APIRequest(studentBaseUrl + "/", "POST", { cycleIds });

export const createNotice = async (
  placementCycleId: number,
  noticeDetails: Notice.RootObject
) =>
  await APIRequest(adminBaseUrl + `/${placementCycleId}`, "POST", noticeDetails);

export const updateNotice = async (
  noticeId: number,
  noticeDetails: Notice.RootObject
) =>
  await APIRequest(adminBaseUrl + `/${noticeId}`, "PUT", noticeDetails);

export const deleteNotice = async (
  noticeId: number,
) =>
  await APIRequest(adminBaseUrl + `/${noticeId}`, "DELETE");
