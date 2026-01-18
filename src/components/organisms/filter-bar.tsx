'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks"; // Need typed hooks
import { setFilter, selectFilter } from "@/lib/features/tokenSlice";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

export function FilterBar() {
    const dispatch = useAppDispatch();
    const currentFilter = useAppSelector(selectFilter);

    const filters = [
        { key: 'new', label: 'New Pairs' },
        { key: 'final', label: 'Final Stretch' },
        { key: 'migrated', label: 'Migrated' },
    ] as const;

    return (
        <div className="flex items-center space-x-1 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 sticky top-0 z-10 w-full overflow-x-auto no-scrollbar">
            {filters.map((filter) => (
                <Button
                    key={filter.key}
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(setFilter(filter.key))}
                    className={cn(
                        "relative px-4 font-semibold transition-all hover:bg-muted",
                        currentFilter === filter.key && "text-primary bg-muted"
                    )}
                >
                    {filter.label}
                    {currentFilter === filter.key && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in fade-in zoom-in duration-300" />
                    )}
                </Button>
            ))}
        </div>
    );
}
