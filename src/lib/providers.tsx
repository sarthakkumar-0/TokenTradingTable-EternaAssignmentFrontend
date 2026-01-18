'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    const queryClientRef = useRef<QueryClient>()
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient()
    }

    return (
        <Provider store={storeRef.current}>
            <QueryClientProvider client={queryClientRef.current}>
                {children}
            </QueryClientProvider>
        </Provider>
    )
}
