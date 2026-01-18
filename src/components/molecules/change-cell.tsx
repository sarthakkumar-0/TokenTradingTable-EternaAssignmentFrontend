import { formatPercent } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface ChangeCellProps {
    value: number;
}

export function ChangeCell({ value }: ChangeCellProps) {
    return (
        <span className={cn(
            "text-sm font-medium",
            value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-muted-foreground"
        )}>
            {formatPercent(value)}
        </span>
    );
}
