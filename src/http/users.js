import request, { constructAuthHeader } from "./request";

const BASE_URL = "/users";

export async function getUsers(token, { unset = false, patient = false } = {}) {
  let queryParams = "";
  if (patient) {
    queryParams += "?patient=true";
  } else if (unset) {
    queryParams += "?unset=true";
  }

  return await request(`${BASE_URL}/${queryParams}`, {
    headers: constructAuthHeader(token),
  });
}

export async function getUser(userId) {
  return await request(`${BASE_URL}/${userId}`);
}

export async function inviteAdmin(token, email) {
  return await request(`${BASE_URL}/invite`, {
    method: "POST",
    headers: constructAuthHeader(token),
    data: {
      email,
    },
  });
}

export async function signIn(username, password) {
  return await request(`${BASE_URL}/signin`, {
    method: "POST",
    data: {
      username,
      password,
    },
  });
}

export async function signUp(userData) {
  return await request(BASE_URL, {
    method: "POST",
    data: userData,
  });
}

export async function editUser(token, userId, data) {
  const url = `${BASE_URL}/${userId}`;
  return await request(url, {
    method: "PUT",
    data,
    headers: constructAuthHeader(token),
  });
}

export async function getById(userId) {
  return await request(`${BASE_URL}/${userId}`, {});
}

export async function resetPassword(username) {
  return await request(`${BASE_URL}/reset-password`, {
    method: "POST",
    data: {
      username,
    },
  });
}

export async function confirmReset(username, newPassword, resetCode) {
  return await request(`${BASE_URL}/confirm-reset`, {
    method: "POST",
    data: {
      username,
      newPassword,
      resetCode,
    },
  });
}
