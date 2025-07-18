import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReduxProvider } from '@/redux/features/provider'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthContextProvider } from '@/context/AuthContext'
import { ModalContextProvider } from "@/context/ModalContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ReduxProvider>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <ModalContextProvider>
                        <Component {...pageProps} />
                        <Toaster position="top-right" />
                    </ModalContextProvider>
                </AuthContextProvider>
            </QueryClientProvider>
        </ReduxProvider>
    )
}