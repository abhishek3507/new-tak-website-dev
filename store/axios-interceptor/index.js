import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  (response) => ({
    status: true,
    message: response.data.status_message,
    data: response.data.data ? response.data.data : response.data,
  }),
  (error) => {
    return {
      status: false,
      message: error.response?.message,
    };
  }
);

export default AxiosInstance;
