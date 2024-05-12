import storageHelper from "@/lib/storage-helper";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blood-bridge-umber.vercel.app/api/",
  // baseURL: "http://localhost:5000/api/",
});
const ResponseInterceptor = (response: AxiosResponse) => {
  return response;
};
const RequestInterceptor = async (config: AxiosRequestConfig) => {
  const accessToken = await storageHelper.getItem(
    storageHelper.StorageKeys.Access_Token,
  );

  config!.headers!["accesstoken"] = accessToken;
  return config;
};
//@ts-ignore
axiosInstance.interceptors.request.use(RequestInterceptor);
axiosInstance.interceptors.response.use(
  ResponseInterceptor,
  async (error: any) => {
    if (error?.message === "Network Error") {
      alert("Please Connect To Internet");
    }
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      console.log("error", error);
      return;
    } else {
      if (error.response.status === 401) {
        //logOut User
        storageHelper.removeItem(storageHelper.StorageKeys.Access_Token);
        storageHelper.removeItem(storageHelper.StorageKeys.Role);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
      return Promise.reject(error);
    }
  },
);
