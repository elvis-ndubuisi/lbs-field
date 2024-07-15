import axios from "axios";

const API = import.meta.env.PROD
  ? "https://africanproverbs.onrender.com/"
  : "http://localhost:8080/api/";

const http = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
http.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("asc");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const preRequest = error?.config;
    if (error?.response?.status === 403 && !preRequest?._retry) {
      preRequest._retry = true;
      try {
        const refreshTokenResponse = await http.post("/auth/refresh", {
          xRefresh: localStorage.getItem("rfs"),
        });

        localStorage.setItem("asc", refreshTokenResponse.data.token);
        localStorage.setItem("asc", refreshTokenResponse.data.xRefresh);

        preRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshTokenResponse.data.token}`;
        return http(preRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        localStorage.removeItem("asc");

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default http;
