import { ref, watchEffect } from "vue";
import type { User } from "../Models/User.ts";

const user = ref<User | null>(null);

// Função para recuperar usuário do localStorage dinamicamente
function loadUserFromLocalStorage() {
    const data = localStorage.getItem("user");
    if (data) {
        try {
            user.value = JSON.parse(data);
        } catch (error) {
            console.error("Erro ao recuperar usuário do localStorage:", error);
        }
    }
}

// Chamada automática para carregar os dados assim que `useAuth()` for importado
loadUserFromLocalStorage();

// Salvar usuário no localStorage e atualizar o estado reativo
function saveUserToLocalStorage(userData: User) {
    localStorage.setItem("user", JSON.stringify(userData));
    user.value = userData;
}

// Remover usuário no logout
function logout() {
    localStorage.removeItem("user");
    user.value = null;
}

// Atualiza o `user` automaticamente quando o localStorage mudar
watchEffect(() => {
    loadUserFromLocalStorage();
});

export function useAuth() {
    return {
        user,
        saveUserToLocalStorage,
        logout,
    };
}
