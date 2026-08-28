import { cn } from "@/lib/utils";

export type InvoiceStatus = "draft" | "sent" | "partial" | "paid" | "cancelled" | "overdue";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

const statusConfig: Record<InvoiceStatus, { label: string; dotClass: string; bgClass: string; textClass: string }> = {
  draft: { label: "Brouillon", dotClass: "bg-slate-400", bgClass: "bg-slate-100", textClass: "text-slate-700" },
  sent: { label: "Envoyée", dotClass: "bg-blue-500", bgClass: "bg-blue-50", textClass: "text-blue-700" },
  partial: { label: "Partielle", dotClass: "bg-warning", bgClass: "bg-amber-50", textClass: "text-amber-700" },
  paid: { label: "Payée", dotClass: "bg-success", bgClass: "bg-emerald-50", textClass: "text-emerald-700" },
  overdue: { label: "En retard", dotClass: "bg-danger", bgClass: "bg-red-50", textClass: "text-red-700" },
  cancelled: { label: "Annulée", dotClass: "bg-muted", bgClass: "bg-gray-100", textClass: "text-gray-600" },
};

export function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium", config.bgClass, config.textClass, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClass)} />
      {config.label}
    </div>
  );
}
