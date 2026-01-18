import { Token } from './types';

type Listener = (data: Partial<Token>[]) => void;

export class MockWebSocket {
    private listeners: Listener[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private isConnected = false;

    connect() {
        if (this.isConnected) return;
        this.isConnected = true;
        console.log('Mock WS Connected');

        // Simulate real-time updates
        this.intervalId = setInterval(() => {
            this.emitUpdates();
        }, 2000); // 2 second interval
    }

    disconnect() {
        if (this.intervalId) clearInterval(this.intervalId);
        this.isConnected = false;
        this.listeners = [];
    }

    subscribe(callback: Listener) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    private emitUpdates() {
        if (!this.isConnected) return;

        // Pick 5 random tokens to update
        const updates: Partial<Token>[] = [];
        const count = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < count; i++) {
            const id = `token-${Math.floor(Math.random() * 50)}`; // Matches TOKENS_COUNT in mock-data
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const priceMultiplier = 1 + (Math.random() * 0.1 - 0.05); // +/- 5%

            updates.push({
                id,
                price: 0, // Will be calculated by reducer based on current or we send multiplier? 
                // Better to send just delta or new value?
                // Since this is mock, let's assume we don't know the current state here easily without reading it.
                // But usually WS sends the NEW price.
                // I will simplify: The mock data generator is stateless, but the STORE holds state.
                // So I should probably send a "tick" valid for a specific token ID.
                // Let's send a `priceChange` delta.
            });
        }

        // Actually, to make it easier, let's just emit raw random updates that the slice handles.
        // Or better, let the slice handle the logic of "applying" the update.
        // But real WS sends data.

        // Let's generate a full random new price for the ID? No, that might jump too much if we don't know previous.
        // I'll send `{ id, priceMultiplier: number }`?
        // Let's change the type signature in `types.ts`? No, let's keep it simple.

        const randomUpdate = Array.from({ length: 3 }).map(() => ({
            id: `token-${Math.floor(Math.random() * 50)}`,
            priceChangeMultiplier: 1 + (Math.random() * 0.02 - 0.01), // Small change
            volumeAdd: Math.floor(Math.random() * 1000)
        }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.listeners.forEach(l => l(randomUpdate as any));
    }
}

export const mockSocket = new MockWebSocket();
