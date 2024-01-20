import { parseCookies, setCookie, destroyCookie } from 'nookies';

type UseJwt = {
    setJwt: (value: string, maxAge: number) => void;
    getJwt: () => string|undefined;
    forgetJwt: () => void;
}

export default function useJwt(): UseJwt {
    function setJwt(value: string, maxAge: number) {
        setCookie(
            undefined,
            process.env.JWT_TOKEN_NAME,
            value,
            { maxAge }
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
