'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSort, selectSort } from "@/lib/features/tokenSlice";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export const GRID_LAYOUT = "grid grid-cols-[1fr_100px_60px_60px_70px_80px_60px_60px_60px_60px_60px_70px_80px] gap-4 px-4 py-3 items-center border-b border-border text-xs text-muted-foreground font-medium uppercase tracking-wider hover:bg-muted/50 transition-colors";

type SortKey = Parameters<typeof setSort>[0];

interface Column {
    key: SortKey | 'token'; // 'token' is not sortable directly/special
    label: string;
    align?: 'left' | 'right' | 'center';
    className?: string; // for hiding on mobile
    sortable?: boolean;
}

export const COLUMNS: Column[] = [
    { key: 'token', label: 'Token', align: 'left' },
    { key: 'price', label: 'Price', align: 'right' },
    { key: 'age', label: 'Age', align: 'right', className: "hidden sm:block" },
    { key: 'buys', label: 'Buys', align: 'right', className: "hidden xl:block" },
    { key: 'sells', label: 'Sells', align: 'right', className: "hidden xl:block" },
    { key: 'volume', label: 'Vol', align: 'right', className: "hidden lg:block" },
    { key: 'makers', label: 'Makers', align: 'right', className: "hidden 2xl:block" },
    { key: 'priceChange.m5', label: '5M', align: 'right' },
    { key: 'priceChange.h1', label: '1H', align: 'right', className: "hidden md:block" },
    { key: 'priceChange.h6', label: '6H', align: 'right', className: "hidden lg:block" },
    { key: 'priceChange.h24', label: '24H', align: 'right', className: "hidden xl:block" },
    { key: 'liquidity', label: 'Liq', align: 'right', className: "hidden lg:block" },
    { key: 'mcap', label: 'MCap', align: 'right', className: "hidden md:block" },
];

export function TableHeader() {
    const dispatch = useAppDispatch();
    const sort = useAppSelector(selectSort);

    const handleSort = (key: string) => {
        dispatch(setSort(key as SortKey));
    };

    return (
        <div className={cn(GRID_LAYOUT, "sticky top-[53px] z-10 bg-background border-y box-border")}>
            {COLUMNS.map((col, idx) => {
                const isSorted = sort.key === col.key;
                const isSortable = col.sortable !== false && col.key !== 'token';

                return (
                    <div
                        key={idx}
                        className={cn(
                            "flex items-center gap-1 cursor-pointer select-none group",
                            col.align === 'right' && "justify-end",
                            col.align === 'center' && "justify-center",
                            col.className,
                            !isSortable && "cursor-default"
                        )}
                        onClick={() => isSortable && handleSort(col.key as string)}
                    >
                        {col.label}
                        {isSortable && (
                            <span className="text-muted-foreground/50 group-hover:text-foreground transition-colors">
                                {isSorted ? (
                                    sort.direction === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                ) : (
                                    <ChevronsUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                )}
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
    );
}
