'use client';

import { createContext, useEffect, useState } from 'react';
import {
    signIn as signInRequest,
    signUp as signUpRequest,
    signOut as signOutRequest,
    SignInRequestData,
    SignUpRequestData,
    recoverAuthenticatedUserInfo
} from '@/services/auth';
import { usePathname, redirect } from 'next/navigation';
import useJwt from '@/services/jwt';
import toast from 'react-hot-toast';
import Loading from '@/components/Loading';
import { handleErrorWithToast } from '@/services/api';

type User = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
}

type AuthContextData = {
    isAuthenticated: false,
    user: User,
    signIn: (data: SignInRequestData) => Promise<void>,
    signUp: (data: SignUpRequestData) => Promise<void>,
    setUser: (user: User) => void,
}

const PUBLIC_ROUTES = [
    '/',
    '/register',
];

const isPathPublic = (pathname: string) => PUBLIC_ROUTES.includes(pathname);

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const pathname = usePathname();

    const { getJwt, setJwt, forgetJwt } = useJwt();

    const isAuthenticated = !!user;

    useEffect(function() {
        const token = getJwt();

        if (!token) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        recoverAuthenticatedUserInfo()
            .then((user)=> {
                setUser({
                    id: user.id,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                });
            }).catch((err) => {
                handleErrorWithToast(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    async function signIn({ email, password }: SignInRequestData) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { token, user } = await signInRequest({ email, password });

        setJwt(
            token,
            60 * 60 // 1 hour
        );

        setUser({
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
        });
        redirect('/dashboard');
    }

    async function signUp({ username, firstName, lastName, email, password }: SignUpRequestData) {
        await signUpRequest({
            username,
            firstName,
            lastName,
            email,
            password
        });

        toast.success('Account created successfully, please login');
        redirect('/');
    }

    async function signOut() {
        await signOutRequest();
        forgetJwt();
        redirect('/');
    }

    const page = (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, setUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );

    if (isLoading) return <Loading/>;

    if (isPathPublic(pathname)) {
        return isAuthenticated ? redirect('/dashboard') : page;
    }

    if (!isAuthenticated) return redirect('/');

    return page;
}