import Axios from "axios";

const API = Axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("profile")}`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);

export const login = (firebaseToken) => {
  return API.post(
    "/",
    {},
    { headers: { Authorization: `Bearer ${firebaseToken}` } }
  );
};
