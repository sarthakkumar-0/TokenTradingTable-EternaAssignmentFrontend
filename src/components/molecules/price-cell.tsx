import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface PriceCellProps {
    price: number;
}

export function PriceCell({ price }: PriceCellProps) {
    const prevPriceRef = useRef(price);
    const [color, setColor] = useState<'green' | 'red' | null>(null);

    useEffect(() => {
        if (price > prevPriceRef.current) {
            setColor('green');
        } else if (price < prevPriceRef.current) {
            setColor('red');
        }

        prevPriceRef.current = price;

        const timer = setTimeout(() => {
            setColor(null);
        }, 1000); // 1s flash

        return () => clearTimeout(timer);
    }, [price]);

    return (
        <span className={cn(
            "transition-colors duration-300 font-medium",
            color === 'green' && "text-green-500",
            color === 'red' && "text-red-500"
        )}>
            {formatCurrency(price)}
        </span>
    );
}
