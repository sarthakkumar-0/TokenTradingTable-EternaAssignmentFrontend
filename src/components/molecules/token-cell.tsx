import { Token } from "@/lib/types";
import { Badge } from "@/components/atoms/badge";
import Image from "next/image";

interface TokenCellProps {
    token: Token;
}

export function TokenCell({ token }: TokenCellProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border">
                <Image
                    src={token.avatar || "/placeholder.svg"}
                    alt={token.name}
                    width={32}
                    height={32}
                />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foreground">{token.symbol}</span>
                    {token.status !== 'new' && (
                        <Badge variant={token.status} className="h-4 px-1 text-[10px] uppercase">
                            {token.status}
                        </Badge>
                    )}
                </div>
                <span className="text-xs text-muted-foreground">{token.name}</span>
            </div>
        </div>
    );
}
