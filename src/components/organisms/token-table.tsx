'use client';

import { useAppSelector } from "@/lib/hooks";
import { selectFilteredSortedTokens } from "@/lib/features/tokenSlice";
import { useTokenData } from "@/lib/hooks/useTokenData";
import { Token } from "@/lib/types";
import { TableHeader, GRID_LAYOUT } from "./table-header";
import { TokenCell } from "../molecules/token-cell";
import { PriceCell } from "../molecules/price-cell";
import { ChangeCell } from "../molecules/change-cell";
import { formatCompact, formatTimeAgo } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Skeleton } from "../atoms/skeleton";

import { memo } from 'react';

const TokenRow = memo(function TokenRow({ token }: { token: Token }) {
    // We map columns to values
    return (
        <div className={cn(GRID_LAYOUT, "border-b-0 hover:bg-muted/30 transition-colors group cursor-pointer text-sm font-medium")}>
            {/* Token */}
            <div className="overflow-hidden">
                <TokenCell token={token} />
            </div>

            {/* Price */}
            <div className="text-right">
                <PriceCell price={token.price} />
            </div>

            {/* Age */}
            <div className="text-right hidden sm:block text-muted-foreground">
                {formatTimeAgo(token.age)}
            </div>

            {/* Buys/Sells - Hidden Mobile */}
            <div className="text-right hidden xl:block text-green-500/80">{token.buys}</div>
            <div className="text-right hidden xl:block text-red-500/80">{token.sells}</div>

            {/* Vol */}
            <div className="text-right hidden lg:block font-normal text-muted-foreground">
                ${formatCompact(token.volume)}
            </div>

            {/* Makers */}
            <div className="text-right hidden 2xl:block text-muted-foreground">
                {token.makers}
            </div>

            {/* 5M */}
            <div className="text-right">
                <ChangeCell value={token.priceChange.m5} />
            </div>

            {/* 1H */}
            <div className="text-right hidden md:block">
                <ChangeCell value={token.priceChange.h1} />
            </div>

            {/* 6H */}
            <div className="text-right hidden lg:block">
                <ChangeCell value={token.priceChange.h6} />
            </div>

            {/* 24H */}
            <div className="text-right hidden xl:block">
                <ChangeCell value={token.priceChange.h24} />
            </div>

            {/* Liq */}
            <div className="text-right hidden lg:block">
                ${formatCompact(token.liquidity)}
            </div>

            {/* MCap */}
            <div className="text-right hidden md:block font-bold">
                ${formatCompact(token.mcap)}
            </div>
        </div>
    )
});

function LoadingSkeleton() {
    return (
        <div className="space-y-1 p-2">
            {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
    )
}

export function TokenTable() {
    const { isLoading } = useTokenData(); // Initializes data
    const tokens = useAppSelector(selectFilteredSortedTokens);

    if (isLoading && tokens.length === 0) {
        return <LoadingSkeleton />
    }

    return (
        <div className="w-full flex-col flex pb-20">
            <TableHeader />
            <div className="flex-1">
                {tokens.map((token: Token) => (
                    <TokenRow key={token.id} token={token} />
                ))}

                {tokens.length === 0 && (
                    <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
                        No tokens found.
                    </div>
                )}
            </div>
        </div>
    );
}
