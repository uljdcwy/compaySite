import axios from "axios";

const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:10015" : "";

export const instance = axios.create({
    baseURL: baseUrl
});

instance.interceptors.request.use(function (/** @type {any} */ config) {
    return config;
}, function (/** @type {any} */ error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (/** @type {any} */ response) {
    return response;
}, function (/** @type {any} */ error) {
    return Promise.reject(error);
});

export const asyncRequest = function () {
    return instance({
        method: "post",
        url: "",
    });
}

