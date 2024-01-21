import { parseCookies, setCookie, destroyCookie } from 'nookies';

// todo: this can be replaced using template literal types https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
const maxAgeOptionsToSecondsMap = {
    '30 minutes': 1800,
    '1 hour': 3600,
    '2 hour': 7200,
};

type MaxAgeOptions = keyof typeof maxAgeOptionsToSecondsMap;

type UseJwt = {
    setJwt: (value: string, maxAge: MaxAgeOptions) => void;
    getJwt: () => string|undefined;
    forgetJwt: () => void;
}

export default function useJwt(): UseJwt {
    function setJwt(value: string, maxAge: MaxAgeOptions) {
        const maxAgeInSeconds = maxAgeOptionsToSecondsMap[maxAge];

        setCookie(
            undefined,
            process.env.JWT_TOKEN_NAME,
            value,
            { maxAge: maxAgeInSeconds }
        );
    }
    
    function getJwt(): string|undefined {
        const cookieName = process.env.JWT_TOKEN_NAME;

        const cookies = parseCookies();
        return cookies[cookieName];
    }

    function forgetJwt(): void {
        destroyCookie(undefined, process.env.JWT_TOKEN_NAME);
    }
    
    return { getJwt, setJwt, forgetJwt };
}
