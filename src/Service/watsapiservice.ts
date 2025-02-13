import api from "./axiosInstance";

class WhatsAppService {
    url = 'https://localhost:5001';
    async enviarMensagem(phoneNumberId: string, destinatario: string, mensagem: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/enviar`, null, {
                params: {
                    PhoneNumberID: phoneNumberId,
                    destinatario: destinatario,
                    mensagem: mensagem
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }

    async waabid(): Promise<any> {
        try {
            const response = await api.get(`${this.url}/WhatsApp/waabid`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter waabid:', error);
            throw error;
        }
    }

    async loginUsuario(usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/loginusuario`, null, {
                params: {
                    usuario: usuario,
                    senha: senha
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao fazer login do usuário:', error);
            throw error;
        }
    }

    async addUsuario(usuario: string, email: string, senha: string, admsenha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/addusuario`, null, {
                params: {
                    usuario: usuario,
                    email: email,
                    senha: senha,
                    admsenha: admsenha
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw error;
        }
    }

    async deletarUsuario(email: string, admsenha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/deletarusuario`, null, {
                params: {
                    email: email,
                    admsenha: admsenha
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    async addPhoneNumber(phoneNumberId: string, phone_number: string, verified_name: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/ADDPhoneNumber`, null, {
                params: {
                    phoneNumberId: phoneNumberId,
                    phone_number: phone_number,
                    verified_name: verified_name
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar número de telefone:', error);
            throw error;
        }
    }

    async requestCodePhoneNumber(phoneNumberId: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/RequestCodePhoneNumber`, null, {
                params: {
                    phoneNumberId: phoneNumberId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao solicitar código para número de telefone:', error);
            throw error;
        }
    }

    async getPhoneNumbers(wabaIdAsync: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/WhatsApp/phonenumbers`, {
                params: {
                    WabaIdAsync: wabaIdAsync
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao obter números de telefone:', error);
            throw error;
        }
    }

    async verifyCode(phoneNumberId: string, code: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/VerifyCode`, null, {
                params: {
                    PhoneNumberID: phoneNumberId,
                    code: code
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao verificar código:', error);
            throw error;
        }
    }

    async receberMensagem(): Promise<any> {
        try {
            const response = await api.get(`${this.url}/WhatsApp/receber`);
            return response.data;
        } catch (error) {
            console.error('Erro ao receber mensagem:', error);
            throw error;
        }
    }

    async criarRobo(phoneNumberId: string, content: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/criarRobo`, null, {
                params: {
                    phoneNumberId: phoneNumberId,
                    content: content
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao criar robô:', error);
            throw error;
        }
    }

    async deletarRobo(phoneNumberId: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/WhatsApp/deletarRobo`, null, {
                params: {
                    phoneNumberId: phoneNumberId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar robô:', error);
            throw error;
        }
    }
}

export default new WhatsAppService();