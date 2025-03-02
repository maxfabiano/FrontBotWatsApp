<script setup lang="ts">
import { reactive, ref } from 'vue'
import WhatsAppService from '../Service/watsapiservice'
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import type { User } from "../Models/User.ts";

const { saveUserToLocalStorage } = useAuth();

const form = reactive({
  Usuario: '',
  password: '',
  checked: [],
})
const show = ref(true)

const router = useRouter();

const onSubmit = (event: Event) => {
  event.preventDefault()
  WhatsAppService.loginUsuario(form.Usuario, form.password)
      .then(response => {
        if (response.status === 200) { // Verifica se a requisição foi bem-sucedida
          const userR: User = response.data;
          saveUserToLocalStorage(userR);
          router.push("/dashboard");
        } else {
          // Tratar caso de erro de login (ex.: usuário/senha inválidos)
          console.error("Erro de login:", response.data);
          // Exibir mensagem de erro ao usuário (opcional)
        }
      })
      .catch(error => {
        console.error("Erro na requisição:", error);
        // Exibir mensagem de erro ao usuário (opcional)
      });
}

const onReset = (event: Event) => {
  event.preventDefault()
  // Reset our form values
  form.Usuario = ''
  form.password = ''
  form.checked = []

}

defineProps<{ msg: string }>()
</script>

<template>
  <img class="imageWallp" src='../assets/watswallpaper.jpg'/>
  <BForm class="loginFOrm" v-if="show" @submit="onSubmit" @reset="onReset">
    <img src='../assets/slogan.jpg'/>
    <BFormGroup
        id="input-group-1"
        label="Usuario:"
        label-for="input-1"
    >
      <BFormInput
          id="input-1"
          v-model="form.Usuario"
          type="Usuario"
          placeholder="Usuario"
          required
      />
    </BFormGroup>
    <BFormGroup
        id="input-group-1"
        label="Senha:"
        label-for="input-1"
    >
      <BFormInput
          id="input-2"
          class="mb-3"
          autocomplete="current-password"
          v-model="form.password"
          type="password"
          placeholder="Senha"
          required
      />
    </BFormGroup>
    <BFormGroup id="input-group-4">
      <BFormCheckboxGroup id="checkboxes-4" v-model="form.checked">
        <BFormCheckbox value="me">Lembrar</BFormCheckbox>
      </BFormCheckboxGroup>
    </BFormGroup>
    <BButton type="submit" variant="primary">Acessar</BButton>
  </BForm>
</template>

<style scoped>
.loginFOrm{
  width: 150%;
  margin-left: 15%;
}
#input-2{
  border-style: solid;
}
.imageWallp{
  width: 40%;
  left: 0;
  top: 0;
  position: fixed;
  height: 100%;
  z-index: 999;
}
</style>