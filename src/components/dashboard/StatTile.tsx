import { Money } from "@/components/ui/Money";
import { cn } from "@/lib/utils";

interface StatTileProps {
  title: string;
  amount: number | bigint;
  subtitle?: string;
  className?: string;
  isAccent?: boolean;
}

export function StatTile({ title, amount, subtitle, className, isAccent }: StatTileProps) {
  return (
    <div className={cn(
      "p-6 rounded-card shadow-soft flex flex-col justify-between h-[160px]",
      isAccent ? "bg-accent text-accent-ink" : "bg-surface",
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className={cn("text-sm font-medium", isAccent ? "text-accent-ink/80" : "text-muted")}>{title}</h3>
      </div>
      <div>
        <Money value={amount} size="lg" className={cn(isAccent ? "text-accent-ink" : "text-ink")} />
        {subtitle && (
          <p className={cn("text-xs mt-1", isAccent ? "text-accent-ink/70" : "text-muted")}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
