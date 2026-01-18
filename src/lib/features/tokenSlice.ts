import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Token, TokenStatus, SortConfig } from '../types';
import { RootState } from '../store';

interface TokenState {
    data: Record<string, Token>;
    ids: string[];
    filter: TokenStatus | 'all';
    sort: SortConfig;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TokenState = {
    data: {},
    ids: [],
    filter: 'new',
    sort: { key: 'age', direction: 'asc' }, // Default sort by age (newest?)
    status: 'idle',
};

export const tokenSlice = createSlice({
    name: 'tokens',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<Token[]>) => {
            state.ids = action.payload.map(t => t.id);
            state.data = action.payload.reduce((acc, t) => {
                acc[t.id] = t;
                return acc;
            }, {} as Record<string, Token>);
            state.status = 'idle';
        },
        updateTokens: (state, action: PayloadAction<{ id: string; priceChangeMultiplier: number; volumeAdd: number }[]>) => {
            action.payload.forEach(update => {
                const token = state.data[update.id];
                if (token) {
                    // Apply update logic
                    token.price = token.price * update.priceChangeMultiplier;
                    token.volume += update.volumeAdd;
                    // You could also update priceChange percentages here roughly
                    if (update.priceChangeMultiplier > 1) {
                        token.priceChange.m5 += 0.1;
                    } else {
                        token.priceChange.m5 -= 0.1;
                    }
                }
            });
        },
        setFilter: (state, action: PayloadAction<TokenStatus | 'all'>) => {
            state.filter = action.payload;
        },
        setSort: (state, action: PayloadAction<keyof Token | 'priceChange.m5' | 'priceChange.h1' | 'priceChange.h6' | 'priceChange.h24'>) => {
            // Toggle direction if same key
            if (state.sort.key === action.payload) {
                state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                state.sort.key = action.payload;
                state.sort.direction = 'desc'; // Default to desc for new metrics usually (highest price first)
            }
        },
    },
});

export const { setTokens, updateTokens, setFilter, setSort } = tokenSlice.actions;

// Selectors
const selectTokensData = (state: RootState) => state.tokens.data;
const selectTokensIds = (state: RootState) => state.tokens.ids;
export const selectFilter = (state: RootState) => state.tokens.filter;
export const selectSort = (state: RootState) => state.tokens.sort;

export const selectFilteredSortedTokens = createSelector(
    [selectTokensData, selectTokensIds, selectFilter, selectSort],
    (data, ids, filter, sort) => {
        let result = ids.map(id => data[id]);

        // Filter
        if (filter !== 'all') {
            result = result.filter(t => t.status === filter);
        }

        // Sort
        return result.sort((a, b) => {
            let aValue: number | string;
            let bValue: number | string;

            // Handle nested keys
            if (sort.key.startsWith('priceChange.')) {
                const key = sort.key.split('.')[1] as keyof typeof a.priceChange;
                aValue = a.priceChange[key];
                bValue = b.priceChange[key];
            } else {
                aValue = a[sort.key as keyof Token] as number | string;
                bValue = b[sort.key as keyof Token] as number | string;
            }

            if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }
);

export default tokenSlice.reducer;
