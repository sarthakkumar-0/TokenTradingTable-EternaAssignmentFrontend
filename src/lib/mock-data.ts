import { Token } from './types';

const TOKENS_COUNT = 50;

const NAMES = ['Pepe', 'Doge', 'Shiba', 'Floki', 'Bonk', 'Wif', 'Trump', 'Biden', 'Cat', 'Moon', 'Safe', 'Elon', 'Mars', 'Rocket', 'Gem'];
const SYMBOLS = ['PEPE', 'DOGE', 'SHIB', 'FLOKI', 'BONK', 'WIF', 'TRUMP', 'BIDEN', 'CAT', 'MOON', 'SAFE', 'ELON', 'MARS', 'ROCKET', 'GEM'];

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number) {
    return Math.floor(random(min, max));
}

export function generateMockTokens(): Token[] {
    return Array.from({ length: TOKENS_COUNT }).map((_, i) => {
        const nameIndex = randomInt(0, NAMES.length);
        const suffix = randomInt(100, 999);

        const price = random(0.00000001, 0.1);

        return {
            id: `token-${i}`,
            name: `${NAMES[nameIndex]} ${suffix}`,
            symbol: SYMBOLS[nameIndex],
            avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${i}`,
            price,
            priceChange: {
                m5: random(-10, 20),
                h1: random(-30, 50),
                h6: random(-50, 100),
                h24: random(-80, 200),
            },
            volume: random(1000, 1000000),
            liquidity: random(5000, 500000),
            mcap: random(10000, 10000000),
            buys: randomInt(10, 1000),
            sells: randomInt(5, 800),
            makers: randomInt(20, 5000),
            age: randomInt(1, 14400), // up to 10 days in minutes
            status: Math.random() > 0.6 ? 'migrated' : (Math.random() > 0.3 ? 'final' : 'new'),
            pairAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
        };
    });
}
