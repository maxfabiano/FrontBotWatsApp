import axios from "axios";
import { useAuth } from "../composables/useAuth"; // Caminho para o seu `useAuth.ts`

const api = axios.create({
    baseURL: "https://localhost:5001", // Sua API
});

// Interceptor para adicionar o Token JWT nos requests
api.interceptors.request.use(
    (config) => {
        const { user } = useAuth();

        // Se houver um usuário logado, adiciona o token nos headers
        if (user.value?.Token) {
            config.headers.Authorization = `Bearer ${user.value.Token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
