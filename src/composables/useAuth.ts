import { ref } from "vue";
import type {User} from "../Models/User.ts";

// Criar um estado reativo para armazenar os dados do usuário
const user = ref<User | null>(getUserFromLocalStorage());

// Função para salvar no LocalStorage
function saveUserToLocalStorage(userData: User) {
    localStorage.setItem("user", JSON.stringify(userData));
    user.value = userData;
}

// Função para recuperar os dados do LocalStorage
function getUserFromLocalStorage(): User | null {
    const data = localStorage.getItem("user");
    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error("Erro ao recuperar usuário do localStorage:", error);
            return null;
        }
    }
    return null;
}

// Função para remover os dados do usuário (logout)
function logout() {
    localStorage.removeItem("user");
    user.value = null;
}

// Exportar funções para serem usadas nos componentes
export function useAuth() {
    return {
        user,
        saveUserToLocalStorage,
        logout,
    };
}
