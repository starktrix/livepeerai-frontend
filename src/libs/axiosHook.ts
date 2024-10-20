import { useEffect } from "react";
import axios from "axios";
import { useToken } from "./token-context"; // Import your token context

const useAxiosInstance = () => {
  const { getStore } = useToken(); // Access the token from the context
  const token = getStore("token");

  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`, // Your API base URL
  });

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (getStore("token")) {
          config.headers["Authorization"] = `Bearer ${getStore("token")}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Remove the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Depend on token to refresh interceptor if it changes

  return axiosInstance; // Return the configured Axios instance
};

export default useAxiosInstance;
