import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createBootstrap} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import router from "./router"; // Importa o arquivo de rotas

const app = createApp(App)
app.use(createBootstrap()) // Important
app.use(router); // Usa o roteador no Vue

app.mount('#app')
