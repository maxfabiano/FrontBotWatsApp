import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // Importando como "type"

import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";

// Definição das rotas
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Login",
        component: Login,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
];

// Criando o roteador
const router = createRouter({
    history: createWebHistory(), // Define o modo de histórico do navegador
    routes,
});

export default router;
