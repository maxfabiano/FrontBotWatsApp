import axios from "axios";
import { useAuth } from "../composables/useAuth";

const api = axios.create({
    baseURL: "https://localhost:5001",
});

// Interceptor para adicionar token JWT
api.interceptors.request.use(
    (config) => {
        const { user } = useAuth();

        console.log("Interceptor - Usuário carregado:", user.value);

        if (user.value?.token) {
            console.log("Interceptor - token JWT presente:", user.value.token);
            config.headers.Authorization = `Bearer ${user.value.token}`;
        } else {
            console.warn("Interceptor - Nenhum token encontrado!");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
