<template>
  <BContainer fluid style="background-color:black">
    <div class="container-fluid">
      <div class="row">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <BAvatar class="avatar" variant="success"/>
          <BCard
              v-if="user != null"
              bg-variant="dark"
              class="usuarioTitle"
              text-variant="white"
          >
            <h4 style="font-size: 1.5em;">Bem Vindo</h4>
            <h4 style="font-size: 1.5em;">{{ user.nome }}</h4>
            <BCardText> {{ user.email }}</BCardText>
          </BCard>
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul class="nav nav-pills flex-column mb-auto">
              <li class="nav-item">
                <BDropdown class="me-2" text="Usuario" variant="dark">
                  <li v-if="nivelUsuario == 1" class="nav-item">
                    <BButton v-b-modal.modal-center variant="dark" @click="openCadastroUsuarioModal">Cadastrar usuario
                    </BButton>
                  </li>
                  <li class="nav-item">
                    <BButton v-b-modal.modal-center variant="dark" @click="openAlterarSenhaModal">Alterar Senha
                    </BButton>
                  </li>
                  <li class="nav-item">
                    <BButton v-b-modal.modal-center variant="dark" @click="openAlterarTokenModal">Alterar Token
                    </BButton>
                  </li>
                </BDropdown>
              </li>
              <li class="nav-item">
                <BDropdown class="me-2" text="Robos" variant="dark">
                  <li class="nav-item">
                    <BButton v-b-modal.modal-center variant="dark" @click="openFourModal">Adicionar Robô Telefone
                      existente
                    </BButton>
                  </li>
                  <li class="nav-item">
                    <BButton v-b-modal.modal-center variant="dark" @click="openMensagemMassaModal">Enviar mensagem em
                      massa
                    </BButton>
                  </li>
                </BDropdown>
              </li>
              >
              <li class="nav-item">
                <BButton v-b-modal.modal-center variant="dark" @click="sair">Sair</BButton>
              </li>
            </ul>
          </div>
        </div>
        <div class="col py-3">
          <div class="container overflow-y-scroll">
            <h2>Lista de Robos</h2>
            <BCardGroup v-for="(group, index) in groupedRobos" :key="index" class="cardGroup" deck>
              <div class="mt-3">
              <BCard v-for="robo in group" :key="robo.telefone" :header=robo.usuario bg-variant="dark"
                     class="robocard text-center" header-bg-variant="primary" border-variant="primary"
                     text-variant="white">
                <FontAwesomeIcon icon="fa-solid fa-robot" size="2x"/>
                <BCardText>Telefone: {{ robo.telefone }}</BCardText>
                <FontAwesomeIcon class="fa-spin" icon="fa-solid fa-gear" size="1x"/>
              </BCard>
              </div>
            </BCardGroup>
            <div class="listaMensagens overflow-y-scroll">
              <BCard bg-variant="dark" text-variant="white" header="Watsapp menssage" class="text-top">
              </BCard>
              <BListGroup v-for="(itenHeader, index) in messagesOptions" :key="itenHeader.telefone">
                <BListGroupItem class="d-flex justify-content-between align-items-center">
                  <BAccordionItem :title="itenHeader.telefone">
                    <p :show="scrollToBottom(index)" :ref="el => messageBodyRefs[index] = el as HTMLElement | null" class="messageBody overflow-y-scroll" v-html="formatMessages(itenHeader.messages)"></p>
                    <BFormInput @keyup.enter="sendMessage(index,itenHeader.telefone,itenHeader.phoneid)" style="width: 140%" v-model="menssageSend[index]" placeholder="Enviar mensagem"></BFormInput>
                  </BAccordionItem>
                </BListGroupItem>
              </BListGroup>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BModal v-model="showModal2" centered title="Verificação de Número" @ok="handleSecondModal">
      <p>Enviamos um código de verificação para {{ phoneNumber }}.
      </p>
      <BFormGroup label="Código de Verificação">
        <BFormInput v-model="verificationCode" placeholder="Digite o código recebido" required/>
      </BFormGroup>
    </BModal>

    <BModal v-model="showModal3" centered size="lg" title="Criar Robô" @ok="handleThirdModal">
      <BFormGroup label="Conteúdo do Robô">
        <BFormTextarea v-model="content" placeholder="Digite o conteúdo do robô" required rows="6"/>
      </BFormGroup>
    </BModal>

    <BModal v-model="showModalfinal" centered size="lg" title="Criar Robô" @ok="handleFourModal">
      <BFormGroup label="O numero do telefone com o codigo do pais exemplo: 5511999999999">
        <BFormInput v-model="phoneNumber" placeholder="Digite o numero do telefone" required/>
      </BFormGroup>
      <BFormGroup label="Conteúdo da inteligencia artificial">
        <BFormTextarea v-model="content" placeholder="Alimente a inteligencia artificial do robô" required rows="8"/>
      </BFormGroup>
    </BModal>

    <BModal v-model="showModalCadastroUsuario" centered size="lg" title="Cadastro de usuario" @ok="cadastrarUsuario">
      <BFormGroup label="Login do usuario">
        <BFormInput v-model="usuarioC" placeholder="Usuario" required/>
      </BFormGroup>
      <BFormGroup label="Email">
        <BFormInput v-model="emailC" placeholder="Email" required rows="1"/>
      </BFormGroup>
      <BFormGroup label="Senha">
        <BFormInput v-model="senhaC" placeholder="Senha" required rows="1"/>
      </BFormGroup>
      <BFormGroup label="Nivel">
        <BFormSelect v-model="nivelC" :options="exFirstSlotOptions" class="mb-3" required>
          <BFormSelectOption :value="null" disabled>Selecione o nivel</BFormSelectOption>
        </BFormSelect>
      </BFormGroup>
    </BModal>
    <BModal v-model="showModalCadastroUsuario" centered size="lg" title="Cadastro de usuario" @ok="cadastrarUsuario">
      <BFormGroup label="Login do usuario">
        <BFormInput v-model="usuarioC" placeholder="Usuario" required/>
      </BFormGroup>
      <BFormGroup label="Email">
        <BFormInput v-model="emailC" placeholder="Email" required rows="1"/>
      </BFormGroup>
      <BFormGroup label="Senha">
        <BFormInput v-model="senhaC" placeholder="Senha" required rows="1" type="password"/>
      </BFormGroup>
      <BFormGroup label="Token Facebook">
        <BFormInput v-model="TokenFacebook" placeholder="Token Facebook" required rows="1" type="password"/>
      </BFormGroup>
      <BFormGroup label="Token Gemini">
        <BFormInput v-model="TokenGemini" placeholder="Token Gemini" required rows="1" type="password"/>
      </BFormGroup>
      <BFormGroup label="Nivel">
        <BFormSelect v-model="nivelC" :options="exFirstSlotOptions" class="mb-3" required>
          <BFormSelectOption :value="null" disabled>Selecione o nivel</BFormSelectOption>
        </BFormSelect>
      </BFormGroup>
    </BModal>
    <BModal v-model="showModalAlterarSenha" centered size="lg" title="Alterar Senha" @ok="alterarSenha">
      <BFormGroup v-if="user?.nivel == 1" label="Login do usuario">
        <BFormInput v-model="usuarioAlterarSenha" placeholder="Nome do Usuario"/>
      </BFormGroup>
      <BFormGroup label="Nova Senha">
        <BFormInput v-model="senhaNovaAlterarSenha" placeholder="Nova Senha" required rows="1" type="password"/>
      </BFormGroup>
    </BModal>
    <BModal v-model="showModalToken" centered size="lg" title="Cadastrar Token" @close="sair" @cancel="sair" @ok="alterarToken">
      <BFormGroup label="Cadastrar Token Facebook">
        <BFormInput v-model="TokenFacebook" placeholder="Novo Token" required rows="1" type="password"/>
      </BFormGroup>
      <BFormGroup label="Cadastrar Token Gemini">
        <BFormInput v-model="TokenGemini" placeholder="Novo Token" required rows="1" type="password"/>
      </BFormGroup>
    </BModal>

    <BModal v-model="showModalMensagemEmMassa" centered size="lg" title="Envio de mensagem em massa"
            @ok="sendMessageTemplate(roboNameTemplate, phoneNumber,  templateNameEnviar,  param1,  param2,  urlButtomTemplate)">
      <BForm>
        <BFormGroup label="Robo">
          <BFormSelect v-model="roboNameTemplate" :options="roboOptions" class="mb-3" required>
            <BFormSelectOption :value="null" disabled>Selecione o Robo</BFormSelectOption>
          </BFormSelect>
        </BFormGroup>
        <BFormGroup label="Mensagem template">
          <BFormSelect v-model="templateNameEnviar" :options="templateOptions" class="mb-3" required>
            <BFormSelectOption :value="null" disabled>Selecione o template</BFormSelectOption>
          </BFormSelect>
        </BFormGroup>
        <BFormGroup label="Telefone">
          <BFormInput v-model="phoneNumber" placeholder="Telefone" required rows="1" type="text"/>
        </BFormGroup>
        <BFormGroup label="Inicio da mensagem">
          <BFormInput v-model="param1" placeholder="Inicio da mensagem" required rows="1" type="text"/>
        </BFormGroup>
        <BFormGroup label="Final da mensagem">
          <BFormInput v-model="param2" placeholder="Novo Token" required rows="1" type="text"/>
        </BFormGroup>
        <BFormGroup label="Url redirecionamento do botão">
          <BFormInput v-model="urlButtomTemplate" placeholder="Novo Token" required rows="1" type="text"/>
        </BFormGroup>
      </BForm>
    </BModal>

    <BModal v-model="showModal1" centered size="lg" title="Cadastrar Robô" @ok="handleFirstModal">
      <BForm>
        <BFormGroup label="Número de Telefone">
          <BFormInput v-model="phoneNumber" placeholder="Digite o número de telefone" required/>
        </BFormGroup>
      </BForm>
    </BModal>
  </BContainer>
</template>

<script lang="ts" setup>
import {ref, onMounted, computed,nextTick,onUnmounted,watch } from "vue";
import WhatsAppService from "../Service/watsapiservice.ts";
import {useAuth} from "../composables/useAuth.ts";
import PhoneNumberService from "../Models/PhoneNumberData.ts";
import type {Robo} from "../Models/Robo.ts";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faRobot} from '@fortawesome/free-solid-svg-icons';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from "vue-router";
import type {User} from "../Models/User.ts";
import type {Message} from "../Models/Message.ts";
import type {Template} from "../Models/Template.ts";
library.add(faRobot);
library.add(faGear);

const {user} = useAuth();

// Estados para os modais
const showModal1 = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);
const showModalfinal = ref(false);
const showModalCadastroUsuario = ref(false);
const showModalAlterarSenha = ref(false);
const showModalToken = ref(false);
const showModalMensagemEmMassa = ref(false);
const robos = ref<Robo[]>([]);

// Dados do robô
const phoneNumber = ref("");
const verificationCode = ref("");
const content = ref("");
let phoneNumberIdR = "";
const router = useRouter();


const usuarioC = ref("");
const emailC = ref("");
const senhaC = ref("");
const admsenhaC = ref("");
const nivelC = ref("");
const roboNameTemplate = ref("");
const templateNameEnviar = ref("");
const param1 = ref("");
const param2 = ref("");
const urlButtomTemplate = ref("");
const nivelLocal = ref(0);
const nivelUsuario = ref(0);
const roboOptions = ref<Array<{ value: string; text: string; }>>([]);
const templateOptions = ref<Array<{ value: string; text: string; }>>([]);
const messagesOptions = ref<Array<{ telefone: string; messages: string[];  phoneid: string; }>>([]);
const { saveUserToLocalStorage } = useAuth();
const { logout } = useAuth();

const usuarioAlterarSenha = ref("");
const senhaNovaAlterarSenha = ref("");
const TokenFacebook= ref("");
const TokenGemini= ref("");

const formatMessageWithBreaks = (message: string): string => {
  return message.replace(/(.{25})/g, "$1\n"); // Insere uma quebra de linha a cada 5 caracteres
};
const formatMessages = (messages: string[]): string => {
  return messages.map(msg => formatMessageWithBreaks(msg)).join("<br>");
};
const messageBodyRefs = ref<(HTMLElement | null)[]>([]);
const menssageSend = ref<Array<string>>([]); // Array para armazenar as mensagens

const scrollToBottom = (index: number) => {
  nextTick(() => {
    if (messageBodyRefs.value[index]) {
      messageBodyRefs.value[index]!.scrollTop = messageBodyRefs.value[index]!.scrollHeight;
    }
  });
};
let iniciarRobosMensagens = async () => {
  if(user.value !=null) {
    if (user.value.nivel == 1) {
      nivelUsuario.value = user.value.nivel;
      const response = await WhatsAppService.getRoboNamesAll(user.value?.nome, user.value?.senha);
      robos.value = response.data; // Assumindo que response.data é um array de objetos Robo
    } else {
      nivelUsuario.value = user.value.nivel;
      const response = await WhatsAppService.getRoboNomesUsuario(user.value?.nome, user.value?.senha);
      robos.value = response.data; // Assumindo que response.data é um array de objetos Robo
    }
    roboOptions.value = robos.value.map(robo => ({value: robo.telefone, text: robo.telefone}));


    await iniciaMensagens(robos.value);
  }
}
const sendMessage = async (index: number, telefone: string, phoneid: string) => {
  if (menssageSend.value[index] && menssageSend.value[index].trim() !== "") {
    const message = menssageSend.value[index].trim();
    // Aqui você pode adicionar a lógica para enviar a mensagem
    if(user.value !=null){
    await WhatsAppService.enviarMensagem(user.value?.nome,user.value?.senha,phoneid,telefone,message);
    }
    await iniciarRobosMensagens();
    // Limpar o campo de entrada após o envio
    menssageSend.value[index] = "";
  }
};const sendMessageTemplate = async ( phoneNumberId: string, destinatario: string,  templateName:string,  param1:string,  param2:string,  url:string) => {

      var arrayDestinatario = destinatario.split(",");
      for (const element of arrayDestinatario) {
        if(user.value !=null) {
          await WhatsAppService.enviarMensagemTemplate(user.value?.nome, user.value?.senha, phoneNumberId, element, templateName, param1, param2, url);
        }
      }
  await iniciarRobosMensagens();
};
let iniciarVariaveis = async ()=>{
  if (user.value != null) {
    try {
      messageBodyRefs.value = messagesOptions.value.map(() => new HTMLElement());
      menssageSend.value = messagesOptions.value.map(() => ""); // Inicializa com strings vazias
      const responseTemplate = await WhatsAppService.GetThemplates(user.value?.nome,user.value?.senha);

      if (Array.isArray(responseTemplate.data.data)) {
        responseTemplate.data.data.forEach((templl:Template) => {
          templateOptions.value.push({value: templl.name, text: templl.name});
        });
      } else {
        console.error("Erro: templa.data não é um array válido.");
      }
      await iniciarRobosMensagens();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (user.value != null) {
          WhatsAppService.loginUsuario(user.value?.nome, user.value?.senha)
              .then(response => {
                if (response.status === 200) { // Verifica se a requisição foi bem-sucedida
                  const userR: User = response.data;
                  saveUserToLocalStorage(userR);
                }
              })
          nivelLocal.value = user.value.nivel;
        }
        if (nivelLocal.value == 1) {
          showModalToken.value = true;
        } else {
          await logout();
          await router.push("/");
          console.error("Erro ao fazerlogin:", error.message);
          // Exibir mensagem de erro para o usuário, por exemplo, usando um modal ou toast
        }
      }
    }
  }
}
const iniciaMensagens = async (robos: Robo[]) => {
  for (const roboM of robos) {
    if(user.value != null) {
      const responseMessages = await WhatsAppService.allmessagesfromnumber(roboM.telefone, user.value.nome, user.value.senha);
      if (Array.isArray(responseMessages.data)) {
        responseMessages.data.forEach((messageItem:Message) => {
          const existingEntry = messagesOptions.value.find(
              (entry) => entry.telefone === messageItem.telefone
          );

          if (existingEntry) {
            // Se o telefone já existe, adiciona a mensagem ao array de mensagens
            existingEntry.messages.push(messageItem.mensagem);
          } else {
            // Se o telefone ainda não existe, cria uma nova entrada
            messagesOptions.value.push({
              telefone: messageItem.telefone,
              messages: [messageItem.mensagem], // Armazena as mensagens como um array
              phoneid: roboM.telefone // Armazena as mensagens como um array
            });
          }
        });
      }
      else {
        console.error("Erro: templa.data não é um array válido.");
      }
    }
  }
};
let intervalId: number | null = null;


const exFirstSlotOptions = [
  {value: '1', text: 'Usuario Administrador'},
  {value: '2', text: 'Usuario comum'},
]
onMounted(async () => {
  await iniciarVariaveis();
});
onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});

const groupedRobos = computed(() => {
  const groups = [];
  for (let i = 0; i < robos.value.length; i += 3) {
    groups.push(robos.value.slice(i, i + 3));
  }
  return groups;
});

const cadastrarUsuario = async () => {
  if (user.value != null) {
    admsenhaC.value = user.value?.senha;
    await WhatsAppService.addUsuario(usuarioC.value, emailC.value, senhaC.value, user.value.senha, user.value.nome, nivelC.value);
    await WhatsAppService.AlterarToken(usuarioC.value, emailC.value, TokenFacebook.value, TokenGemini.value);
  }
};
const alterarSenha = () => {
  if (user.value != null) {
    if (user.value.nivel == 1) {
      WhatsAppService.alterarSenhaAdm(usuarioAlterarSenha.value, senhaNovaAlterarSenha.value, user.value.nome, user.value.senha);
    } else {
      WhatsAppService.alterarSenhaComum(user.value.nome, user.value.senha, senhaNovaAlterarSenha.value);
    }
  }
};
const alterarToken = async () => {
  if (user.value != null) {
    try {
      await WhatsAppService.AlterarToken(user.value.nome, user.value.senha, TokenFacebook.value, TokenGemini.value);
    } catch (error) {
      await logout();
      await router.push("/");
    }
  } else {
    await logout();
    await router.push("/");
  }
};
// Abre o primeiro modal

const openFourModal = () => {
  showModal1.value = false;
  showModal2.value = false;
  showModal3.value = false;
  showModalfinal.value = true;
};
const openCadastroUsuarioModal = () => {
  showModalCadastroUsuario.value = true;

};
const openAlterarSenhaModal = () => {
  showModalAlterarSenha.value = true;

};
const openAlterarTokenModal = () => {
  showModalToken.value = true;
};
const sair = async () => {
  await logout();
  await router.push("/");
};

const openMensagemMassaModal = () => {
  showModalMensagemEmMassa.value = true;
};
// Confirma o primeiro modal e solicita código de verificação
const handleFirstModal = async () => {
  if (!user.value) return alert("Erro: Usuário não autenticado!");

  try {
    if (user.value != null) {
      var phones = await WhatsAppService.getPhoneNumbers(user.value?.nome, user.value?.senha);
      var phoneNumberIdRR = await PhoneNumberService.getPhoneNumberIdByDisplayPhoneNumber(phoneNumber.value, JSON.stringify(phones.data));
      if (phoneNumberIdRR != null) {
        phoneNumberIdR = phoneNumberIdRR.toString();
        await WhatsAppService.requestCodePhoneNumber(user.value?.nome,user.value?.senha,phoneNumberIdR);
      }
    }
    showModal1.value = false;
    showModal2.value = true;
  } catch (error) {
    alert("Erro ao solicitar código: " + error);
  }
};

// Confirma o segundo modal e verifica o código
const handleSecondModal = async () => {
  try {
    await WhatsAppService.verifyCode(phoneNumberIdR, verificationCode.value);
    showModal2.value = false;
    showModal3.value = true;
  } catch (error) {
    alert("Erro na verificação: " + error);
  }
};
function removerCaracteresEspeciais(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

// Confirma o terceiro modal e cria o robô
const handleThirdModal = async () => {
  try {
    if (user.value != null) {
      var contentFinal= removerCaracteresEspeciais(content.value.toString());
      await WhatsAppService.criarRobo(phoneNumberIdR, contentFinal, user.value.nome, user.value?.senha, phoneNumber.value);
      alert("Robô criado com sucesso!");
      showModal3.value = false;
    }
  } catch (error) {
    alert("Erro ao criar robô: " + error);
  }
};
watch(messagesOptions, () => {
  nextTick(() => {
    messagesOptions.value.forEach((itenHeader, index) => {
      if (messageBodyRefs.value[index] && Array.isArray(itenHeader.messages)) {
        messageBodyRefs.value[index]!.innerHTML = formatMessages(itenHeader.messages);
      }
    });
  });
}, { deep: true }); // Observa mudanças profundas no array

const handleFourModal = async () => {
  try {
    if (user.value != null) {
      var phones = await WhatsAppService.getPhoneNumbers(user.value?.nome, user.value?.senha);
      var phoneNumberIdRR = await PhoneNumberService.getPhoneNumberIdByDisplayPhoneNumber(phoneNumber.value, JSON.stringify(phones.data));
      if (phoneNumberIdRR != null) {
        phoneNumberIdR = phoneNumberIdRR.toString();
        var contentFinal= removerCaracteresEspeciais(content.value.toString());

        await WhatsAppService.criarRobo(phoneNumberIdR, contentFinal, user.value.nome, user.value?.senha, phoneNumber.value);
      }
      alert("Robô criado com sucesso!");
      showModalfinal.value = false;
    }
  } catch (error) {
    alert("Erro ao criar robô: " + error);
  }
};
</script>

<style scoped>
.container-fluid {
  width: 100%;
  left: 0;
  position: absolute;
  top: 0;
}
body, .container-fluid {
  background-color: #212529 !important;
}
.container{
  max-height: 70%;
  position: absolute;
}
.nav-item {
  border-style: solid;
  border-bottom-color: green;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
}

.robocard {
  max-width: 300px;
  float: right;
  position: relative;
}
.avatar {
  margin-top: 20px;
}
.messageBody{
  white-space: pre-wrap; /* Respeita as quebras de linha */
  word-wrap: break-word; /* Evita que textos longos estourem o contêiner */
  max-height: 200px; /* Ajuste conforme necessário */
  height: 300px;
  width: 170%;
  max-width: 170%;
}
.listaMensagens{
  left: 70%;
  position: fixed;
  width: 30%;
  max-height: 100%;
  height: 100%;
  background-color: gray !important;
  border-style: solid;
  border-color: gray;
  top: 0;
}
.usuarioTitle {
  font-size: 12px;
}
</style>