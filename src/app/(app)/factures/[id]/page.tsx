"use client";

import { useApp } from "@/components/providers/AppProvider";
import { InvoiceStatusBadge } from "@/components/ui/InvoiceStatusBadge";
import { ArrowLeft, Edit, Trash2, Mail, Send, Download, Printer } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { formatDate } from "@/lib/format";

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { invoices, settings } = useApp();
  const invoice = invoices.find(i => i.id === params.id);

  if (!invoice) {
    notFound();
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(amount);
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      alert("Facture supprimée. (Simulation)");
      router.push("/factures");
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-5xl mx-auto">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/factures" className="p-2 hover:bg-surface border border-transparent hover:border-border rounded-lg transition-colors text-muted hover:text-ink">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-semibold tracking-tight text-ink">{invoice.number}</h2>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
            <p className="text-muted mt-1">Créée le {formatDate(invoice.issueDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert("Changement de statut... (Simulation)")}
            className="px-4 py-2 bg-surface border border-border text-ink hover:bg-bg rounded-xl text-sm font-medium transition-colors"
          >
            Changer Statut
          </button>
          <button 
            className="p-2 bg-surface border border-border text-muted hover:text-ink hover:bg-bg rounded-xl transition-colors"
            title="Modifier"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 bg-surface border border-border text-danger hover:bg-danger/10 rounded-xl transition-colors"
            title="Supprimer"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Invoice Document Preview */}
      <div className="bg-surface rounded-card shadow-soft overflow-hidden border border-border">
        {/* Actions Bar (Document level) */}
        <div className="bg-bg border-b border-border p-4 flex justify-end gap-2">
           <button className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink px-3 py-1.5 hover:bg-border rounded-lg transition-colors">
            <Download className="h-4 w-4" /> PDF
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink px-3 py-1.5 hover:bg-border rounded-lg transition-colors">
            <Printer className="h-4 w-4" /> Imprimer
          </button>
          <button className="flex items-center gap-2 text-sm font-medium bg-ink text-surface px-4 py-1.5 rounded-lg transition-colors hover:bg-ink/90">
            <Send className="h-4 w-4" /> Envoyer par email
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-border pb-8 mb-8">
            <div>
              <div className="h-12 w-32 bg-ink rounded-lg mb-4 flex items-center justify-center text-surface font-bold text-xl tracking-widest">
                IZI<span className="text-accent">.</span>
              </div>
              <div className="text-sm text-muted">
                <p className="font-bold text-ink mb-1">{settings.companyName}</p>
                <p>{settings.address}</p>
                <p>{settings.email}</p>
                <p>{settings.phone}</p>
                <p>NINEA: {settings.ninea} | RC: {settings.rc}</p>
              </div>
            </div>
            
            <div className="md:text-right">
              <h1 className="text-4xl font-bold text-ink mb-2">FACTURE</h1>
              <p className="text-muted text-lg">{invoice.number}</p>
              <div className="mt-4 text-sm">
                <p><span className="text-muted mr-2">Date d'émission:</span> <span className="font-medium text-ink">{formatDate(invoice.issueDate)}</span></p>
                <p><span className="text-muted mr-2">Date d'échéance:</span> <span className="font-medium text-ink">{formatDate(invoice.dueDate)}</span></p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Facturé à</h3>
            <div className="text-ink">
              <p className="font-bold text-lg">{invoice.clientName}</p>
              {invoice.clientCompany && <p className="font-medium">{invoice.clientCompany}</p>}
              {invoice.clientAddress && <p className="text-muted mt-1 max-w-xs">{invoice.clientAddress}</p>}
              {invoice.clientEmail && <p className="text-muted">{invoice.clientEmail}</p>}
            </div>
          </div>

          <table className="w-full text-left mb-8 border-collapse">
            <thead>
              <tr className="border-y border-border text-muted text-sm font-medium">
                <th className="py-3 px-2">Description</th>
                <th className="py-3 px-2 text-right">Qté</th>
                <th className="py-3 px-2 text-right">Prix Unitaire</th>
                <th className="py-3 px-2 text-right text-ink">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {invoice.lines.map((line) => (
                <tr key={line.id}>
                  <td className="py-4 px-2 font-medium">{line.description}</td>
                  <td className="py-4 px-2 text-right text-muted">{line.quantity}</td>
                  <td className="py-4 px-2 text-right text-muted">{formatCurrency(line.unitPrice)}</td>
                  <td className="py-4 px-2 text-right font-medium text-ink">{formatCurrency(line.quantity * line.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-full max-w-sm flex flex-col gap-3">
              <div className="flex justify-between text-muted">
                <span>Sous-total</span>
                <span>{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>TVA (18%)</span>
                <span>{formatCurrency(invoice.taxAmount)}</span>
              </div>
              <div className="h-px bg-border w-full my-2"></div>
              <div className="flex justify-between text-2xl font-bold text-ink">
                <span>Total TTC</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between text-sm text-muted gap-8">
            <div className="flex-1">
              <h4 className="font-semibold text-ink mb-2">Coordonnées bancaires</h4>
              <p>Banque : {settings.bankName}</p>
              <p>Titulaire : {settings.accountHolder}</p>
              <p>IBAN : {settings.iban}</p>
              <p>SWIFT : {settings.swift}</p>
            </div>
            <div className="flex-1 md:text-right">
              <h4 className="font-semibold text-ink mb-2">Notes</h4>
              <p className="whitespace-pre-line">{settings.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
