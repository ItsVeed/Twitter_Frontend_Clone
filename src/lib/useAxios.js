import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { user, authTokens } from "../stores";
import { get } from "svelte/store";

const baseUrl = "http://127.0.0.1:8000/api/";

const useAxios = () => {

    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${get(authTokens)?.access}`}
    });

    axiosInstance.interceptors.request.use(async req => {
        user.set(jwt_decode(get(authTokens).access));
        const isExpired = dayjs.unix(get(user).exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        const response = await axios.post(`${baseUrl}/auth/refresh-token/`, {
            refresh: get(authTokens).refresh
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));

        authTokens.set(response.data);
        user.set(jwt_decode(response.data.access));

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    });

    return axiosInstance;
}

export default useAxios;