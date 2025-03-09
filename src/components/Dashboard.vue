<template>
  <modal-alert
      :message="toastcontent"
      variant="info"
      :active="Toastactive"
  />
  <BContainer fluid style="background-color:black">
    <div class="container-fluid">
      <div class="row">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <BCard
              v-if="user != null"
              bg-variant="success"
              class="usuarioTitle"
              text-variant="dark"
          >
            <BAvatar class="avatar" variant="success"/>

            <h4 style="font-size: 1.5em;">Bem Vindo</h4>
            <h4 style="font-size: 1.5em;">{{ user.nome }}</h4>
            <BCardText> {{ user.email }}</BCardText>
          </BCard>
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul class="nav nav-pills flex-column mb-auto">
              <li class="nav-item" style="margin-bottom: 30px">
                <BDropdown size="lg"  class="me-6" text="Usuario" variant="dark">
                    <BButton v-if="nivelUsuario == 1" class="nav-item" v-b-modal.modal-center variant="light" @click="openCadastroUsuarioModal">Cadastrar usuario
                    </BButton>
                    <BButton v-if="nivelUsuario == 1" class="nav-item" v-b-modal.modal-center variant="light" @click="openAddTelefoneModal">Adicionar Telefone
                    </BButton>
                    <BButton class="nav-item" v-b-modal.modal-center variant="light" @click="openAlterarSenhaModal">Alterar Senha
                    </BButton>
                    <BButton class="nav-item" v-b-modal.modal-center variant="light" @click="openAlterarTokenModal">Alterar Token
                    </BButton>
                </BDropdown>
              </li>
              <li class="nav-item" style="margin-bottom: 30px">
                <BDropdown size="lg"  class="me-0" text="Robos" variant="dark">
                    <BButton class="nav-item" v-b-modal.modal-center variant="light" @click="openFourModal">Adicionar Robô Telefone
                      existente
                    </BButton>
                    <BButton class="nav-item" v-b-modal.modal-center variant="light" @click="openMensagemMassaModal">Api Oficial Enviar mensagem em
                      massa
                    </BButton>
                    <BButton class="nav-item" v-b-modal.modal-center variant="light" @click="openMensagemMassaModalScript">Script Enviar mensagem em
                      massa
                    </BButton>
                </BDropdown>
              </li >
                <BButton style="font-size: 30px" class="nav-item" v-b-modal.modal-center variant="dark" @click="sair">Sair</BButton>
            </ul>
          </div>
        </div>
        <div class="col py-3">
          <BTabs fill v-model="tabIndex" card>
            <BTab size="50%" title="Dashboard" :title-link-class="linkClass[0]">
              <div style="display: flex; flex-wrap: wrap;"> <div style="width: 300px; margin: 10px;">
                <h3 style="color: white">📊 Mensagens por Telefone</h3>
                <PieChart :chart-data="chartDataGetMensagensPorTelefone" :chart-options="chartOptionsGetMensagensPorTelefone" />
              </div>
                <div style="width: 300px; margin: 10px;">
                  <h3 style="color: white">📊 Mensagens por Horario</h3>
                  <LineChart :chart-data="chartDataGetMensagensPorHorario" :chart-options="chartOptionsGetMensagensPorHorario" />
                </div>
                <div style="width: 300px; margin: 10px;">
                  <h3 style="color: white">📊 Tempo Medio De Resposta</h3>
                  <ScatterChart :chart-data="chartDataGetTempoMedioResposta" :chart-options="chartOptionsGetTempoMedioResposta" />
                </div>
                <div style="width: 300px; margin: 10px;">
                  <h3 style="color: white">📊 Taxa De Respostas</h3>
                  <BarChart :chart-data="chartDataGetTaxaRespostaContatos" :chart-options="chartOptionsGetTaxaRespostaContatos" />
                </div>
                <div style="width: 300px; margin: 10px;">
                  <h3 style="color: white">📊 Contatos Recentes</h3>
                  <PieChart :chart-data="chartDataGetContatosRecentes" :chart-options="chartOptionsGetContatosRecentes" />
                </div>
              </div>
            </BTab>
            <BTab title="Lista De Bots" :title-link-class="linkClass[1]">
                <div class="container overflow-y-scroll">
                  <h2 style="color: white">Lista de Robos</h2>
                  <BCardGroup v-for="(group, index) in groupedRobos" :key="index" class="cardGroup" deck>
                    <div class="mt-3">
                      <BCard v-for="robo in group" :key="robo.telefone" :header=robo.usuario :bg-variant=CorRobos(robo.telefone,robo.telefoneId)
                             class="robocard text-center" header-bg-variant="primary" border-variant="primary"
                             text-variant="dark">
                        <FontAwesomeIcon icon="fa-solid fa-phone" size="2x"/>
                        <BCardText>Telefone: {{ robo.telefone }}</BCardText>
                        <BCardText>Tipo: {{ TipoRobos(robo.telefone,robo.telefoneId) }}</BCardText>
                        <FontAwesomeIcon class="fa-spin" icon="fa-solid fa-gear" size="1x"/>
                      </BCard>
                    </div>
                  </BCardGroup>

                </div>
              </BTab>
          </BTabs>
          <BButton>
            <img @click="showMessages" class="watsbutton" :src="whatsappIcon" alt="Ícone do WhatsApp" />
          </BButton>
          <div v-if="showModalMessages" class="listaMensagens overflow-y-scroll">
            <div bg-variant="dark" text-variant="white" header="Watsapp" class="text-top">
            </div>
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
      <BFormGroup label="Tipo De Robo">
        <BFormSelect v-model="roboOS" :options="roboScriptOficial" class="mb-3" required>
          <BFormSelectOption :value="null" disabled>Selecione o nivel</BFormSelectOption>
        </BFormSelect>
      </BFormGroup>
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


    <BModal v-model="showModalAddTelefone" centered size="lg" title="Adicionar Telefone" @ok="addTelefone">
      <BFormGroup label="Tipo De Telefone">
        <BFormSelect v-model="telefoneOS" :options="telefoneScriptOficial" class="mb-3" required>
          <BFormSelectOption :value="null" disabled>Selecione o nivel</BFormSelectOption>
        </BFormSelect>
      </BFormGroup>
      <BFormGroup v-if="user?.nivel == 1" label="Login do usuario">
        <BFormInput v-model="UsuarioWabaAdd" placeholder="Nome do Usuario"/>
      </BFormGroup>
      <BFormGroup label="Telefone">
        <BFormInput v-model="TelefoneAdd" placeholder="Telefone" required rows="1"/>
      </BFormGroup>
      <BFormGroup label="TelefoneId">
        <BFormInput v-model="TelefoneIdAdd" placeholder="TelefoneId" required rows="1"/>
      </BFormGroup>
      <BFormGroup label="Conta Identificação">
        <BFormInput v-model="WabaIdAdd" placeholder="Id" required rows="1"/>
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
    <BModal v-model="showModalQrCode" centered size="lg" title="Login" @ok="qrcodeEnviarScript">
      <BOverlay
          :show="loadingBuzy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
          class="d-inline-block"
      >

      <BImg :src="QrCodecontent" fluid alt="Fluid image" />
      </BOverlay>

    </BModal>

    <BModal v-model="showModalMensagemEmMassa" centered size="lg" title="Envio de mensagem em massa"
            @ok="sendMessageTemplate(roboNameTemplate, phoneNumber,  templateNameEnviar,  param1,  param2,  urlButtomTemplate)">
      <BForm>
        <BFormGroup label="Robo">
          <BFormSelect v-model="roboNameTemplate" :options="roboOptions" class="mb-3" required>
            <BFormSelectOption :onchange="carregarTemplate" :value="null" disabled>Selecione o Robo</BFormSelectOption>
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
<BModal v-model="showModalMensagemEmMassaScript" centered size="lg" title="Envio de mensagem em massa Script"
            @ok="sendMessageScript(roboNameTemplate,phoneNumber,param1)">
      <BForm>
        <BFormGroup label="Robo">
          <BFormSelect v-model="roboNameTemplate" :options="roboOptions" class="mb-3" required>
            <BFormSelectOption v-model="phoneNumberRobo" :value="null" disabled>Selecione o Robo</BFormSelectOption>
          </BFormSelect>
        </BFormGroup>
        <BFormGroup label="Telefone">
          <BFormInput v-model="phoneNumber" placeholder="Telefone" required rows="1" type="text"/>
        </BFormGroup>
        <BFormGroup label="Mensagem">
          <BFormInput v-model="param1" placeholder="Inicio da mensagem" required rows="1" type="text"/>
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
import WhatsAppService from "../Service/watsapiservice";
import {useAuth} from "../composables/useAuth";
import PhoneNumberService from "../Models/PhoneNumberData";
import type {Robo} from "../Models/Robo.ts";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import whatsappIcon from '../assets/icons8-whatsapp-240.svg';
import {useRouter} from "vue-router";
import type {User} from "../Models/User.ts";
import type {Message} from "../Models/Message.ts";
import type {Template} from "../Models/Template.ts";
import { BarChart } from "vue-chart-3";
import { PieChart } from 'vue-chart-3';
import { LineChart } from 'vue-chart-3';
import { DoughnutChart } from 'vue-chart-3';
import { ScatterChart } from 'vue-chart-3';
import { RadarChart } from 'vue-chart-3';

import { Chart, registerables } from "chart.js";

library.add(faPhone);
library.add(faGear);
Chart.register(...registerables);

const {user} = useAuth();

// Estados para os modais
const showModal1 = ref(false);
const showModal2 = ref(false);
const showModal3 = ref(false);
const showModalfinal = ref(false);
const showModalCadastroUsuario = ref(false);
const showModalAlterarSenha = ref(false);
const showModalAddTelefone = ref(false);
const showModalToken = ref(false);
const showModalMessages = ref(false);
const showModalQrCode = ref(false);
const Toastactive = ref(false);
const showModalMensagemEmMassa = ref(false);
const refreshQr = ref(false);
const showModalMensagemEmMassaScript = ref(false);
const robos = ref<Robo[]>([]);
const tabIndex = ref(0)

// Dados do robô
const phoneNumber = ref("");
const phoneNumberRobo = ref("");
const verificationCode = ref("");
const content = ref("");
const toastcontent = ref("");
const QrCodecontent = ref("");
let phoneNumberIdR = "";
const router = useRouter();


const usuarioC = ref("");
const emailC = ref("");
const senhaC = ref("");
const admsenhaC = ref("");
const nivelC = ref("");
const telefoneOS = ref("");
const roboOS = ref("");
const roboNameTemplate = ref("");
const templateNameEnviar = ref("");
const param1 = ref("");
const param2 = ref("");
const urlButtomTemplate = ref("");
const nivelLocal = ref(0);
const nivelUsuario = ref(0);
const roboOptions = ref<Array<{ value: string; text: string;id: string; }>>([]);
const templateOptions = ref<Array<{ value: string; text: string; }>>([]);
const messagesOptions = ref<Array<{ telefone: string; messages: string[];  phoneid: string; }>>([]);
const { saveUserToLocalStorage } = useAuth();
const { logout } = useAuth();
const loadingBuzy = ref(false)
const intervalIdQRcode = ref(0)

const usuarioAlterarSenha = ref("");
const senhaNovaAlterarSenha = ref("");
const TokenFacebook= ref("");
const TokenGemini= ref("");

const TelefoneAdd = ref("");
const TelefoneIdAdd = ref("");
const WabaIdAdd= ref("");
const UsuarioWabaAdd= ref("");

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
const showMessages = () => {
  showModalMessages.value = !showModalMessages.value;
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
    roboOptions.value = robos.value.map(robo => ({value: robo.telefone, text: robo.telefone, id: robo.telefoneId}));


    await iniciaMensagens(robos.value);
  }
}

const chartDataGetMensagensPorTelefone = ref({
  labels: [],
  datasets: [
    {
      label: "Quantidade de Mensagens",
      backgroundColor: generateRandomColors(200), // 5 é o número de fatias
      data: [],
    },
  ],
});
const chartDataGetMensagensPorHorario = ref({
  labels: [],
  datasets: [
    {
      label: "Mensagens Por Horario",
      backgroundColor: generateRandomColors(200), // 5 é o número de fatias
      data: [],
    },
  ],
});
const chartDataGetTempoMedioResposta = ref({
  labels: [],
  datasets: [
    {
      label: "Tempo Medio De Resposta",
      backgroundColor: generateRandomColors(200), // 5 é o número de fatias
      data: [],
    },
  ],
});
const chartDataGetTaxaRespostaContatos = ref({
  labels: [],
  datasets: [
    {
      label: "Taxa De Resposta",
      backgroundColor: generateRandomColors(200), // 5 é o número de fatias
      data: [],
    },
  ],
});
const chartDataGetContatosRecentes = ref({
  labels: [],
  datasets: [
    {
      label: "Contatos Recentes",
      backgroundColor: generateRandomColors(200), // 5 é o número de fatias
      data: [],
    },
  ],
});


function generateRandomColors(numColors: number): string[] {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colors;
}

const chartOptionsGetMensagensPorTelefone = {
  responsive: true,
  plugins: { legend: { display: true } },
};

const chartOptionsGetMensagensPorHorario = {
  responsive: true,
  plugins: { legend: { display: true } },
};

const chartOptionsGetTempoMedioResposta = {
  responsive: true,
  plugins: { legend: { display: true } },
};

const chartOptionsGetTaxaRespostaContatos = {
  responsive: true,
  plugins: { legend: { display: true } },
};

const chartOptionsGetContatosRecentes = {
  responsive: true,
  plugins: { legend: { display: true } },
};

const fetchDataGetMensagensPorTelefone = async () => {
  if(user.value != null) {
    try {
      const response = await WhatsAppService.GetMensagensPorTelefone(user.value?.nome);
      const data = JSON.stringify(response.data);
      if (Array.isArray(response.data)) {
        chartDataGetMensagensPorTelefone.value.labels = response.data.map((item: any) => item.telefone);
        chartDataGetMensagensPorTelefone.value.datasets[0].data = response.data.map((item: any) => item.quantidade);
      }
    }catch(err) {
      await logout();
      await router.push("/");
    }
  }
};

const fetchDataGetMensagensPorHorario = async () => {
  if(user.value != null) {

    const response = await WhatsAppService.GetMensagensPorHorario(user.value?.nome)
    const data = JSON.stringify(response.data);
    if (Array.isArray(response.data)) {
      chartDataGetMensagensPorHorario.value.labels = response.data.map((item: any) => item.hora);
      chartDataGetMensagensPorHorario.value.datasets[0].data = response.data.map((item: any) => item.quantidade);
    }
  }
};

const fetchDataGetTempoMedioResposta = async () => {
  if (user.value != null) {

    const response = await WhatsAppService.GetTempoMedioResposta(user.value?.nome)
    const data = JSON.stringify(response.data);
    if (Array.isArray(response.data)) {
      chartDataGetTempoMedioResposta.value.labels = response.data.map((item: any) => item.telefone);
      chartDataGetTempoMedioResposta.value.datasets[0].data = response.data.map((item: any) => item.tempoMedio);
    }
  }
  };

  const fetchDataGetTaxaRespostaContatos = async () => {
    if (user.value != null) {

      const response = await WhatsAppService.GetTaxaRespostaContatos(user.value?.nome)
      const data = JSON.stringify(response.data);
      if (Array.isArray(response.data)) {
        chartDataGetTaxaRespostaContatos.value.labels = response.data.map((item: any) => item.telefone);
        chartDataGetTaxaRespostaContatos.value.datasets[0].data = response.data.map((item: any) => item.taxaResposta);
      }
    }
  };

  const fetchDataGetContatosRecentes = async () => {
    if(user.value != null) {
      const response = await WhatsAppService.GetContatosRecentes(user.value?.nome)
      const data = JSON.stringify(response.data);
      if (Array.isArray(response.data)) {
        chartDataGetContatosRecentes.value.labels = response.data.map((item: any) => item.telefone);
        chartDataGetContatosRecentes.value.datasets[0].data = response.data.map((item: any) => item.quantidade);
      }
    }
  };

  const linkClass = computed(() =>
      Array.from(Array(2).keys()).map((idx) =>
          tabIndex.value === idx ? ['bg-primary', 'text-light'] : ['bg-dark', 'text-info']
      )
  )

  const sendMessage = async (index: number, telefone: string, phoneid: string) => {
    if (menssageSend.value[index] && menssageSend.value[index].trim() !== "") {
      const message = menssageSend.value[index].trim();
      // Aqui você pode adicionar a lógica para enviar a mensagem
      if (user.value != null) {
        Toastactive.value = false;
        Toastactive.value = true;
        toastcontent.value = "Iniciando o envio de mensagem para "+telefone;
        await WhatsAppService.enviarMensagem(user.value?.nome, user.value?.senha, phoneid, telefone, message);
        Toastactive.value = false;
        Toastactive.value = true;
        toastcontent.value = "Mensagem enviada com sucesso para "+telefone;
      }
      await iniciarRobosMensagens();
      // Limpar o campo de entrada após o envio
      menssageSend.value[index] = "";
    }
  };
  const sendMessageTemplate = async (phoneNumberId: string, destinatario: string, templateName: string, param1: string, param2: string, url: string) => {

    var arrayDestinatario = destinatario.split(",");
    for (const element of arrayDestinatario) {
      if (user.value != null) {
        Toastactive.value = false;
        Toastactive.value = true;
        toastcontent.value = "Iniciando o envio de mensagem para "+destinatario;
        await WhatsAppService.enviarMensagemTemplate(user.value?.nome, user.value?.senha, phoneNumberId, element, templateName, param1, param2, url);
        Toastactive.value = false;
        Toastactive.value = true;
        toastcontent.value = "Mensagem enviada com sucesso para "+destinatario;
      }
    }
    await iniciarRobosMensagens();
  };
async function buscarQrCode() {
  const response = await WhatsAppService.iniciarWatsapp(roboNameTemplate.value);
  if (response.status === 200) {
      const imageUrl = URL.createObjectURL(response.data);
      console.log('URL da imagem gerada:', imageUrl);
    loadingBuzy.value = false;

    QrCodecontent.value = imageUrl;
      showModalQrCode.value = false;
    showModalQrCode.value = true;
  }
}

  const sendMessageScript = async (roname: string,destinatario: string, param1: string) => {
    try {
      console.log("inicio222222");
      console.log("inicio222222");

      if (user.value != null) {

        const response = await WhatsAppService.iniciarWatsapp(roname);

        console.log("Resposta da API:", response); // Debug

        if (response.status == 200) {
          loadingBuzy.value = true
          showModalQrCode.value = true;
          intervalIdQRcode.value = window.setInterval(buscarQrCode, 30000);
          console.log("333333333333");

        } else {
          if (destinatario.includes(',')) {

            const numeros = destinatario.split(',');
            for (const element of numeros) {
              const numeroLimpo = element.trim();
              Toastactive.value = false;
              Toastactive.value = true;
              toastcontent.value = "Iniciando o envio de mensagem para "+numeroLimpo;
              await WhatsAppService.enviarmensagemwatsapp(numeroLimpo, roboNameTemplate.value, param1);
              Toastactive.value = false;
              Toastactive.value = true;
              toastcontent.value = "Mensagem enviada com sucesso para "+numeroLimpo;
            }
          }else{
            console.log("55555555555");
            Toastactive.value = false;
            Toastactive.value = true;
            toastcontent.value = "Iniciando o envio de mensagem para "+destinatario;
            await WhatsAppService.enviarmensagemwatsapp(destinatario, roboNameTemplate.value, param1);
            Toastactive.value = false;
            Toastactive.value = true;
            toastcontent.value = "Mensagem enviada com sucesso para "+destinatario;

          }
        }
      }
    } catch (e) {
      if (user.value != null) {
        if (destinatario.includes(',')) {
          const numeros = destinatario.split(',');
          for (const element of numeros) {
            const numeroLimpo = element.trim();
            Toastactive.value = false;
            Toastactive.value = true;
            toastcontent.value = "Iniciando o envio de mensagem para "+numeroLimpo;
            await WhatsAppService.enviarmensagemwatsapp(numeroLimpo, roboNameTemplate.value, param1);
            Toastactive.value = false;
            Toastactive.value = true;
            toastcontent.value = "Mensagem enviada com sucesso para "+numeroLimpo;
          }

        }else{
          console.log("55555555555");
          Toastactive.value = false;
          Toastactive.value = true;
          toastcontent.value = "Iniciando o envio de mensagem para "+destinatario;
          await WhatsAppService.enviarmensagemwatsapp(destinatario, roboNameTemplate.value, param1);
          Toastactive.value = false;
          Toastactive.value = true;
          toastcontent.value = "Mensagem enviada com sucesso para "+destinatario;

        }
      }
    }
  }
  const qrcodeEnviarScript = async () => {
    if (user.value != null) {
      window.clearInterval(intervalIdQRcode.value);
      Toastactive.value = false;
      Toastactive.value = true;
      toastcontent.value = "Iniciando o envio de mensagem para "+phoneNumber.value;
      await WhatsAppService.enviarmensagemwatsapp(phoneNumber.value, roboNameTemplate.value, param1.value);
      Toastactive.value = false;
      Toastactive.value = true;
      toastcontent.value = "Mensagem enviada com sucesso para "+phoneNumber.value;
    }
  };

  let iniciarVariaveis = async () => {
    if (user.value != null) {
      try {
        messageBodyRefs.value = messagesOptions.value.map(() => new HTMLElement());
        menssageSend.value = messagesOptions.value.map(() => ""); // Inicializa com strings vazias

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
      if (user.value != null) {
        const responseMessages = await WhatsAppService.allmessagesfromnumber(roboM.telefone, user.value.nome, user.value.senha);
        if (Array.isArray(responseMessages.data)) {
          responseMessages.data.forEach((messageItem: Message) => {
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
        } else {
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
  const telefoneScriptOficial = [
    {value: '1', text: 'Telefone Envio Script'},
    {value: '2', text: 'Telefone Envio Api Oficial'},
  ]
  const roboScriptOficial = [
    {value: '1', text: 'Robo Envio Script'},
    {value: '2', text: 'Robo Envio Api Oficial'},
  ]
  onMounted(async () => {
    await fetchDataGetMensagensPorTelefone()

    await fetchDataGetMensagensPorHorario();
    await fetchDataGetTempoMedioResposta();
    await fetchDataGetTaxaRespostaContatos();
    await fetchDataGetContatosRecentes();
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
  const CorRobos = (roboTele: string, roboId: string) => {
    /*primary" | "secondary" | "success" | "danger" | "warning" | "info"
  | "light" | "dark" | "primary-subtle"
  | "secondary-subtle" | "success-subtle" */
    if (roboTele == roboId) {
      return "warning";
    }
    return "primary-subtle";
  };

  const TipoRobos = (roboTele: string, roboId: string) => {

    if (roboTele == roboId) {
      return "Script";
    }
    return "Api Oficial";
  };

  const cadastrarUsuario = async () => {
    if (user.value != null) {
      admsenhaC.value = user.value?.senha;
      await WhatsAppService.addUsuario(usuarioC.value, emailC.value, senhaC.value, user.value.senha, user.value.nome, nivelC.value, TokenFacebook.value, TokenGemini.value);
    }
  };
  const carregarTemplate = async () => {
    if (user.value != null) {
      const responseTemplate = await WhatsAppService.GetThemplates(user.value?.nome, user.value?.senha, phoneNumber.value);

      if (Array.isArray(responseTemplate.data.data)) {
        responseTemplate.data.data.forEach((templl: Template) => {
          templateOptions.value.push({value: templl.name, text: templl.name});
        });
      } else {
        console.error("Erro: templa.data não é um array válido.");
      }
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
  const addTelefone = async () => {
    if (user.value != null) {
      if (user.value.nivel == 1) {
        if (telefoneOS.value == "1") {
          await WhatsAppService.ADDPhoneNumbersScript(TelefoneAdd.value, WabaIdAdd.value, UsuarioWabaAdd.value);
        } else {
          await WhatsAppService.addPhoneNumber(TelefoneAdd.value, TelefoneIdAdd.value, WabaIdAdd.value, UsuarioWabaAdd.value);
        }
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
  const openAddTelefoneModal = () => {
    showModalAddTelefone.value = true;

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

  const openMensagemMassaModal = async () => {
    if (user.value != null) {

      showModalMensagemEmMassa.value = true;
    }
  };
  const openMensagemMassaModalScript = async () => {
    if (user.value != null) {

      showModalMensagemEmMassaScript.value = true;
    }
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
          await WhatsAppService.requestCodePhoneNumber(user.value?.nome, user.value?.senha, phoneNumberIdR);
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
        var contentFinal = removerCaracteresEspeciais(content.value.toString());
        await WhatsAppService.criarRobo(contentFinal, user.value.nome, user.value?.senha, phoneNumber.value);
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
  }, {deep: true}); // Observa mudanças profundas no array

  const handleFourModal = async () => {
    try {
      if (user.value != null) {
        if (roboOS.value == "1") {
          await WhatsAppService.criarRoboScript(content.value.toString(), user.value.nome, user.value?.senha, phoneNumber.value);

        } else {
          await WhatsAppService.criarRobo(content.value.toString(), user.value.nome, user.value?.senha, phoneNumber.value);
        }
        alert("Robô criado com sucesso!");
        showModalfinal.value = false;
      }
    } catch (error) {
      alert("Erro ao criar robô: " + error);
    }
  }
</script>

<style scoped>
.container-fluid {
  width: 100%;
  left: 0;
  position: absolute;
  top: 0;
}
body, .container-fluid {
  background-color: white !important;
}
.container{
  max-height: 70%;
  position: absolute;
}

.robocard {
  max-width: 300px;
  float: right;
  position: relative;
  margin-right: 60px;
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
.watsbutton{
  width: 10%;
  height: 10%;
  z-index: 9999;
  position: fixed;
  top: 90%;
  left: 92%;
  background-color: transparent;
  border-radius: 100%;
}
.listaMensagens{
  left: 70%;
  position: fixed;
  width: 30%;
  max-height: 100%;
  height: 80%;
  background-color: black !important;
  border-style: solid;
  border-color: gray;
  top: 10%;
  border-radius: 15px;
}
.usuarioTitle {
  font-size: 12px;
}
</style>