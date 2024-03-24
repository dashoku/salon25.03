import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name, surname, phone) => {
    const { data } = await $host.post('api/user/registration', { email, password, name, surname, phone });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } catch (error) {
        return null;
    }
};

export const fetchOneUser = async (id) => {
    const {data} = await $host.get('api/user/profile/' + id)
    return data
}
