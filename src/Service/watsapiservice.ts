import api from "./axiosInstance";

class WhatsAppService {
    private readonly url = 'https://localhost:5001/WhatsApp';

    async enviarMensagem(usuario: string, senha: string, phoneNumberId: string, destinatario: string, mensagem: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/enviar`, null, {
                params: {usuario, senha, PhoneNumberID: phoneNumberId, destinatario, mensagem}
            });
            return response;
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }

    async waabid(): Promise<any> {
        try {
            const response = await api.get(`${this.url}/waabid`);
            return response;
        } catch (error) {
            console.error('Erro ao obter waabid:', error);
            throw error;
        }
    }

    async loginUsuario(usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/loginusuario`, null, {
                params: {usuario, senha}
            });
            return response;
        } catch (error) {
            console.error('Erro ao fazer login do usuário:', error);
            throw error;
        }
    }

    async addUsuario(usuario: string, email: string, senha: string, admsenha: string, admUsuario: string, nivel: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/addusuario`, null, {
                params: {usuario, email, senha, admsenha, admUsuario, Nivel: nivel}
            });
            return response;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw error;
        }
    }

    async deletarUsuario(email: string, usuario: string, admsenha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/deletarusuario`, null, {
                params: {email, usuario, admsenha}
            });
            return response;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    async alterarSenhaComum(usuario: string, antigaSenha: string, novaSenha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/alterarSenhaComum`, null, {
                params: {usuario, antigaSenha, novaSenha}
            });
            return response;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    async AlterarToken(usuario: string, antigaSenha: string, TokenFacebook: string, TokenGemini: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/AlterarToken`, null, {
                params: {usuario, antigaSenha, TokenFacebook, TokenGemini}
            });
            return response;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    async alterarSenhaAdm(usuario: string, novaSenha: string, usuarioAdm: string, admsenha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/alterarSenhaAdm`, null, {
                params: {usuario, novaSenha, usuarioAdm, admsenha}
            });
            return response;
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw error;
        }
    }

    async addPhoneNumber(usuario: string, senha: string, phoneNumberId: string, phone_number: string, verified_name: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/ADDPhoneNumber`, null, {
                params: {usuario, senha, phoneNumberId, phone_number, verified_name}
            });
            return response;
        } catch (error) {
            console.error('Erro ao adicionar número de telefone:', error);
            throw error;
        }
    }

    async registerPhoneNumber(usuario: string, senha: string, phoneNumberId: string, pin: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/RegisterPhoneNumbers`, null, {
                params: {usuario, senha, phoneNumberId, pin}
            });
            return response;
        } catch (error) {
            console.error('Erro ao adicionar número de telefone:', error);
            throw error;
        }
    }

    async requestCodePhoneNumber(usuario: string, senha: string, phoneNumberId: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/RequestCodePhoneNumber`, null, {
                params: {usuario, senha, phoneNumberId}
            });
            return response;
        } catch (error) {
            console.error('Erro ao solicitar código para número de telefone:', error);
            throw error;
        }
    }

    async getPhoneNumbers(usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/phonenumbers`, {
                params: {usuario, senha}
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter números de telefone:', error);
            throw error;
        }
    }

    async allmessagesfromnumber(telefone: string, usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/allmessagesfromnumber`, {
                params: {telefone, usuario, senha}
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter números de telefone:', error);
            throw error;
        }
    }

    async GetTemplateName(usuario: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/GetTemplateName`, {
                params: {usuario}
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter números de telefone:', error);
            throw error;
        }
    }

    async GetThemplates(usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/GetThemplates`, {
                params: {usuario, senha}
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter números de telefone:', error);
            throw error;
        }
    }

    async verifyCode(phoneNumberId: string, code: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/VerifyCode`, null, {
                params: {PhoneNumberID: phoneNumberId, code}
            });
            return response;
        } catch (error) {
            console.error('Erro ao verificar código:', error);
            throw error;
        }
    }

    async receberMensagem(): Promise<any> {
        try {
            const response = await api.get(`${this.url}/receber`);
            return response;
        } catch (error) {
            console.error('Erro ao receber mensagem:', error);
            throw error;
        }
    }

    async dividirStringEmPartes(content: string, tamanhoMaximo: number = 1000): Promise<string[]> {
        let partes: string[] = [];

        for (let i = 0; i < content.length; i += tamanhoMaximo) {
            partes.push(content.substring(i, i + tamanhoMaximo));
        }

        return partes;
    }

    async criarRobo(phoneNumberId: string, content: string, usuario: string, senha: string, telefone: string): Promise<any> {
        try {
            // Aguarda a divisão do conteúdo em partes
            const contentPartes = content.length > 1000 ? await this.dividirStringEmPartes(content) : [content];

            // Cria o robô com a primeira parte do conteúdo
            const response = await api.post(`${this.url}/criarRobo`, null, {
                params: { phoneNumberId, content: contentPartes[0], usuario, senha, telefone }
            });

            // Atualiza o conteúdo com as partes restantes (se houver)
            for (let i = 1; i < contentPartes.length; i++) {
                await api.post(`${this.url}/UpdateRoboContent`, null, {
                    params: { phoneNumberId, content: contentPartes[i], usuario, senha, telefone }
                });
            }

            return response;
        } catch (error) {
            console.error('Erro ao criar robô:', error);
            throw error;
        }
    }

    async messagetemplate(usuario: string,senha: string,templateName: string,headerText: string,
                          bodyText: string,footerText: string,pageId: string): Promise<any> {
        try {
            pageId = "1";
            const response = await api.post(`${this.url}/messagethemplate`, null, {
                params: {usuario,senha, templateName,headerText,bodyText,pageId,footerText}
            });
            return response;
        } catch (error) {
            console.error('Erro ao criar messagetemplate:', error);
            throw error;
        }
    }

    async deletarRobo(phoneNumberId: string, usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.post(`${this.url}/deletarRobo`, null, {
                params: { phoneNumberId, usuario, senha }
            });
            return response;
        } catch (error) {
            console.error('Erro ao deletar robô:', error);
            throw error;
        }
    }

    async getRoboNomesUsuario(usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/GetRoboNomestUsuario`, {
                params: { usuario, senha }
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter nomes de robôs do usuário:', error);
            throw error;
        }
    }

    async getRoboContentUsuario(phoneNumberId: string, usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/GetRoboContentUsuario`, {
                params: { phoneNumberId, usuario, senha }
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter conteúdo do robô do usuário:', error);
            throw error;
        }
    }

    async getRoboNamesAll(usuario: string, senha: string): Promise<any> {
        try {
            const response = await api.get(`${this.url}/GetRoboNamesAll`, {
                params: { usuario, Senha: senha }
            });
            return response;
        } catch (error) {
            console.error('Erro ao obter nomes de todos os robôs:', error);
            throw error;
        }
    }
}

export default new WhatsAppService();
