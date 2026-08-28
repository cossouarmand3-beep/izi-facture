"use client";

import { useApp } from "@/components/providers/AppProvider";
import { Money } from "@/components/ui/Money";
import { InvoiceStatusBadge } from "@/components/ui/InvoiceStatusBadge";
import { formatDate } from "@/lib/format";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function UnpaidPanel() {
  const { invoices } = useApp();
  const unpaidInvoices = invoices.filter(inv => inv.status === "overdue" || inv.status === "sent" || inv.status === "partial");
  const draftInvoices = invoices.filter(inv => inv.status === "draft");
  const totalUnpaid = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="bg-surface-ink text-surface rounded-card p-8 shadow-soft flex flex-col lg:flex-row gap-8">
      
      {/* Left Column: Master List */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Factures Impayées</h2>
          <div className="flex gap-2 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-pill">Brouillons <span className="text-white/50 ml-1">{draftInvoices.length}</span></span>
            <span className="bg-accent text-accent-ink font-semibold px-3 py-1 rounded-pill">Impayées <span className="opacity-70 ml-1">{unpaidInvoices.length}</span></span>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          {unpaidInvoices.map((invoice, idx) => (
            <div 
              key={invoice.id} 
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${idx === 2 ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shrink-0">
                  <span className="font-bold text-white text-sm">{invoice.clientName.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-white">{invoice.number}</p>
                  <p className="text-xs text-white/50">{invoice.status === 'overdue' ? 'En retard' : 'Dans 5 jours'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <InvoiceStatusBadge status={invoice.status} />
                <Money value={invoice.total} size="sm" className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Detail View */}
      <div className="w-full lg:w-2/3 bg-white/5 rounded-card p-6 flex flex-col border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-accent blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-white/50 text-sm mb-1">Détails de la facture</p>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-light tracking-tight">{unpaidInvoices[0]?.number || "N/A"}</h3>
                {unpaidInvoices[0] && <InvoiceStatusBadge status={unpaidInvoices[0].status} />}
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-sm mb-1">Client</p>
              <p className="font-semibold">{unpaidInvoices[0]?.clientName || "-"}</p>
              <p className="text-white/50 text-sm">{unpaidInvoices[0]?.clientCompany || "-"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <Money value={10630800} size="md" className="text-white mb-2" />
              <p className="text-xs text-white/50">Développement Concept</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <Money value={21169200} size="md" className="text-white mb-2" />
              <p className="text-xs text-white/50">Développement CRM</p>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-6">
            <div className="flex gap-12">
              <div>
                <p className="text-white/50 text-sm mb-1">Sous-total</p>
                <Money value={31800000} size="md" className="text-white" />
              </div>
              <div>
                <p className="text-white/50 text-sm mb-1">Total</p>
                <Money value={31800000} size="md" className="text-white" />
              </div>
              <div>
                <p className="text-white/50 text-sm mb-1">Reste à payer</p>
                <Money value={31800000} size="md" className="text-white font-bold" />
              </div>
            </div>
            
            <Link href={unpaidInvoices[0] ? `/factures/${unpaidInvoices[0].id}` : "#"} className="bg-accent text-accent-ink hover:bg-[#c9ef3d] transition-colors font-bold px-6 py-3 rounded-xl flex items-center gap-2">
              Encaisser
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
