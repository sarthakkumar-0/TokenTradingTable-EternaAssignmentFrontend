import { FilterBar } from "@/components/organisms/filter-bar";
import { TokenTable } from "@/components/organisms/token-table";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] border-x border-border/50 min-h-screen">
        {/* Branding / Header */}
        <div className="p-6 border-b border-border bg-gradient-to-b from-background to-muted/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                Token Pulse
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Real-time market discovery engine
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <FilterBar />

        <div className="bg-background">
          <TokenTable />
        </div>
      </div>
    </main>
  );
}
