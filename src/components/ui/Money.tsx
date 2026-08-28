import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/format";

interface MoneyProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | bigint;
  currency?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Money({ value, currency = "FCFA", size = "md", className, ...props }: MoneyProps) {
  const formatted = formatMoney(value);
  
  return (
    <div className={cn("flex items-baseline gap-1 font-semibold", className)} {...props}>
      <span className={cn(
        "tracking-tight",
        size === "sm" && "text-sm",
        size === "md" && "text-lg",
        size === "lg" && "text-2xl",
        size === "xl" && "text-4xl lg:text-5xl"
      )}>
        {formatted}
      </span>
      <span className={cn(
        "text-muted font-normal",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        size === "lg" && "text-base",
        size === "xl" && "text-xl"
      )}>
        {currency}
      </span>
    </div>
  );
}
