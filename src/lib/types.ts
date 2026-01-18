export type TokenStatus = 'new' | 'final' | 'migrated';

export interface Token {
    id: string;
    name: string;
    symbol: string;
    avatar: string;
    price: number;
    priceChange: {
        m5: number;
        h1: number;
        h6: number;
        h24: number;
    };
    volume: number;
    liquidity: number;
    mcap: number;
    buys: number;
    sells: number;
    makers: number;
    age: number; // in minutes
    status: TokenStatus;
    pairAddress: string;
}

export interface Trade {
    type: 'buy' | 'sell';
    price: number;
    amount: number;
    timestamp: number;
}

export interface SortConfig {
    key: keyof Token | 'priceChange.m5' | 'priceChange.h1' | 'priceChange.h6' | 'priceChange.h24';
    direction: 'asc' | 'desc';
}
