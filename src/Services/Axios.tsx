import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3600",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    function (config: any) {

        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        return config;
    },
    function (error: any) {
        return Promise.reject(error);
    }
);

// Tambahkan interceptor respons
api.interceptors.response.use(
    function (response: any) {
        return response;
    },
    function (error: any) {
        return Promise.reject(error);
    }
);

export default api;
