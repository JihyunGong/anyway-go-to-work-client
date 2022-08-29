import Axios from "axios";

const API = Axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
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
    "/login",
    {},
    { headers: { Authorization: `Bearer ${firebaseToken}` } }
  );
};

export const getCompany = (employeeId, companyInfo) => {
  return API.get(`/companies/${employeeId}`, { params: companyInfo });
};

export const createCompany = (companyInfo) => {
  return API.post("/companies", { ...companyInfo });
};

export const updateCompany = (companyId) => {
  return API.patch(`/companies/${companyId}`);
};
