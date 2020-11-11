import request, { constructAuthHeader } from "./request";

const BASE_URL = "/conditions";

export async function getConditions(token, search) {
  return await request(`${BASE_URL + (!!search ? "?search=" + search : "")}`, {
    headers: constructAuthHeader(token),
  });
}

export async function getById(id) {
  return await request(`${BASE_URL}/${id}`, {});
}

export async function addCondition(data, token) {
  return await request(BASE_URL, {
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function editCondition(token, conditionId, data) {
  return await request(`${BASE_URL}/${conditionId}`, {
    method: "PUT",
    headers: constructAuthHeader(token),
    data,
  });
}
