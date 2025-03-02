export interface Config {
    API_BASE_URL: string;
}

export async function loadConfig(): Promise<Config> {
    const response = await fetch('/config.json');

    if (!response.ok) {
        throw new Error(`Erro ao carregar configuração: ${response.statusText}`);
    }

    const config: Config = await response.json();
    return config;
}
