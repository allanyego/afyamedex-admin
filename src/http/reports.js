import request, { constructAuthHeader } from "./request";

const BASE_URL = "/appointments/payments/summary";

export async function getPayments(token) {
  return await request(`${BASE_URL}`, {
    headers: constructAuthHeader(token),
  });
}

export async function getAppointmentHistory(patient, professional, token) {
  let queryParams = `?professional=${professional}&patient=${patient}`;

  return await request(`${BASE_URL}${queryParams}`, {
    headers: constructAuthHeader(token),
  });
}
