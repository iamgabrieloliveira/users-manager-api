import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';
import { ReactNode } from 'react';
import { NextUIProvider } from '../lib/NextUiProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CFP Users Energy',
    description: 'Users management dashboard',
};

export default function RootLayout({
    children,
}: Readonly<{
  children: ReactNode;
}>) {
    return (
        <html className={'h-full bg-white'} lang="en">
            <body className={inter.className + ' h-full'}>
                <Toaster/>
                <AuthProvider>
                    <NextUIProvider className={'h-full'}>
                        {children}
                    </NextUIProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
