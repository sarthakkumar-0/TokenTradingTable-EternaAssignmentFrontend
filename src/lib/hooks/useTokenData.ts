'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '../hooks';
import { generateMockTokens } from '../mock-data';
import { setTokens, updateTokens } from '../features/tokenSlice';
import { mockSocket } from '../websocket';

export function useTokenData() {
    const dispatch = useAppDispatch();

    const { data, isLoading } = useQuery({
        queryKey: ['tokens'],
        queryFn: async () => {
            // Simulate API delay
            await new Promise(r => setTimeout(r, 1000));
            return generateMockTokens();
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            dispatch(setTokens(data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        mockSocket.connect();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsubscribe = mockSocket.subscribe((updates: any) => {
            dispatch(updateTokens(updates));
        });

        return () => {
            unsubscribe();
            mockSocket.disconnect();
        };
    }, [dispatch]);

    return { isLoading };
}
