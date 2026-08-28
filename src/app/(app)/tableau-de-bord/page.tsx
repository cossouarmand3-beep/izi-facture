"use client";

import { StatTile } from "@/components/dashboard/StatTile";
import { UnpaidPanel } from "@/components/dashboard/UnpaidPanel";
import { useApp } from "@/components/providers/AppProvider";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { invoices } = useApp();
  
  const overdueInvoices = invoices.filter(inv => inv.status === "overdue");
  const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.total, 0);
  
  // Calculate mock available amount based on paid invoices
  const availableAmount = invoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold tracking-tight text-ink hidden md:block">Factures</h2>
        <div className="flex items-center gap-4 ml-auto">
          <button className="bg-surface border border-border hover:bg-black/5 text-ink px-4 py-2 rounded-xl transition-colors font-medium">
            Filtres
          </button>
          <Link href="/factures/creer" className="bg-accent text-accent-ink hover:bg-[#c9ef3d] transition-colors px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Créer une facture
          </Link>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatTile 
          title="En retard" 
          amount={overdueAmount} 
          subtitle={`Sur ${overdueInvoices.length} factures`}
        />
        <StatTile 
          title="Échéance mois pro." 
          amount={450000} 
          subtitle="Prochainement"
        />
        <StatTile 
          title="Délai moy. paiement" 
          amount={21} 
          subtitle="Jours"
          className="col-span-1"
        />
        <StatTile 
          title="Disponible" 
          amount={availableAmount} 
          subtitle="Payées"
          isAccent={true}
        />
      </div>

      {/* Unpaid Panel (Hero section) */}
      <UnpaidPanel />

    </div>
  );
}
