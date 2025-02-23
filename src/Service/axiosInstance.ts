import axios from "axios";
import { useAuth } from "../composables/useAuth";

const api = axios.create({
    baseURL: "https://d6a0-170-231-235-102.ngrok-free.app",
});

// Interceptor para adicionar token JWT e ngrok-skip-browser-warning
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

        // Adiciona o cabeçalho ngrok-skip-browser-warning
        config.headers['ngrok-skip-browser-warning'] = 'true';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;