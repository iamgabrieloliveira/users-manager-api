declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_TOKEN_NAME: string;
        }
    }
}

export {};
