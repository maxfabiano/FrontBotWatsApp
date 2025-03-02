export {};

declare global {
    interface Window {
        config: {
            API_BASE_URL: string;
        };
    }
}
