"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { InvoiceStatusBadge, InvoiceStatus } from "@/components/ui/InvoiceStatusBadge";
import { Money } from "@/components/ui/Money";
import { Search, Plus, Filter, MoreHorizontal, FileText } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/format";

export default function FacturesPage() {
  const { invoices } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">("all");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Factures</h2>
          <p className="text-muted mt-1">Gérez vos factures et suivez les paiements.</p>
        </div>
        <Link 
          href="/factures/creer"
          className="bg-accent text-accent-ink hover:bg-[#c9ef3d] transition-colors px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Créer une facture
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-card shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 md:p-6 border-b border-border flex flex-col md:flex-row md:items-center gap-4 justify-between bg-surface">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
            <input 
              type="text" 
              placeholder="Rechercher par client ou n°..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-1.5 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === "all" ? "bg-ink text-surface" : "bg-bg text-muted hover:bg-border"}`}
            >
              Toutes
            </button>
            <button 
              onClick={() => setStatusFilter("draft")}
              className={`px-4 py-1.5 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === "draft" ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Brouillons
            </button>
            <button 
              onClick={() => setStatusFilter("sent")}
              className={`px-4 py-1.5 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === "sent" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
            >
              Envoyées
            </button>
            <button 
              onClick={() => setStatusFilter("paid")}
              className={`px-4 py-1.5 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === "paid" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}
            >
              Payées
            </button>
            <button 
              onClick={() => setStatusFilter("overdue")}
              className={`px-4 py-1.5 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === "overdue" ? "bg-red-600 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
            >
              En retard
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-bg/50 text-muted text-sm uppercase tracking-wider">
                <th className="font-medium py-4 px-6">N° Facture</th>
                <th className="font-medium py-4 px-6">Client</th>
                <th className="font-medium py-4 px-6">Date</th>
                <th className="font-medium py-4 px-6">Échéance</th>
                <th className="font-medium py-4 px-6">Montant</th>
                <th className="font-medium py-4 px-6">Statut</th>
                <th className="font-medium py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-bg/50 transition-colors group">
                    <td className="py-4 px-6">
                      <Link href={`/factures/${inv.id}`} className="font-medium text-ink hover:underline flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted" />
                        {inv.number}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium">{inv.clientName}</div>
                      {inv.clientCompany && <div className="text-xs text-muted mt-0.5">{inv.clientCompany}</div>}
                    </td>
                    <td className="py-4 px-6 text-muted">{formatDate(inv.issueDate)}</td>
                    <td className="py-4 px-6 text-muted">{formatDate(inv.dueDate)}</td>
                    <td className="py-4 px-6 font-medium">
                      <Money value={inv.total} currency="XOF" />
                    </td>
                    <td className="py-4 px-6">
                      <InvoiceStatusBadge status={inv.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link 
                        href={`/factures/${inv.id}`}
                        className="p-2 text-muted hover:text-ink hover:bg-border rounded-lg inline-flex transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        <span className="sr-only">Voir</span>
                        <MoreHorizontal className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-border mb-3" />
                      <p>Aucune facture ne correspond à votre recherche.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
