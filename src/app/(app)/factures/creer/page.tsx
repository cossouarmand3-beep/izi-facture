"use client";

import { useState } from "react";
import { InvoiceItem } from "@/lib/data/fixtures";
import { useApp } from "@/components/providers/AppProvider";
import { Plus, Trash2, Save, Send, ArrowLeft, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function CreateInvoicePage() {
  const router = useRouter();
  const { clients, settings, addInvoice } = useApp();
  const [clientId, setClientId] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [lines, setLines] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0 }
  ]);
  const [taxRate, setTaxRate] = useState<number>(parseInt(settings.taxRate) || 18);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleAddLine = () => {
    setLines([...lines, { id: Math.random().toString(), description: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveLine = (id: string) => {
    if (lines.length > 1) {
      setLines(lines.filter(l => l.id !== id));
    }
  };

  const updateLine = (id: string, field: keyof LineItem, value: string | number) => {
    setLines(lines.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const subtotal = lines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0);
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  const total = Math.round(subtotal + taxAmount);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(amount);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const newInvoice: InvoiceItem = {
      id: `inv_${Date.now()}`,
      number: `FAC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      clientId: client.id,
      clientName: client.name,
      clientCompany: client.company,
      clientAddress: client.address,
      clientEmail: client.email,
      issueDate: issueDate,
      dueDate: dueDate,
      status: "draft",
      subtotal: subtotal,
      taxAmount: taxAmount,
      total: total,
      lines: lines.map(l => ({ ...l, id: Math.random().toString() }))
    };

    addInvoice(newInvoice);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/factures" className="p-2 hover:bg-bg rounded-lg transition-colors text-muted hover:text-ink">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Nouvelle Facture</h2>
          <p className="text-muted mt-1">Créez une facture pour un client existant.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        <div className="bg-surface border border-border rounded-card p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Informations Générales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-ink">Client</label>
              <select 
                required
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
              >
                <option value="" disabled>Sélectionner un client...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name} {client.company ? `(${client.company})` : ""}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-ink">Date d'émission</label>
                <input 
                  type="date" 
                  required
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-ink">Date d'échéance</label>
                <input 
                  type="date" 
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-card p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Lignes de Facturation</h3>
          
          <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-muted mb-4 px-2">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-right">Qté</div>
            <div className="col-span-3 text-right">Prix Unitaire (FCFA)</div>
            <div className="col-span-1"></div>
          </div>

          <div className="flex flex-col gap-4">
            {lines.map((line, index) => (
              <div key={line.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-bg/50 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none">
                <div className="md:col-span-6 flex flex-col gap-1">
                  <span className="md:hidden text-xs text-muted font-medium">Description</span>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: Refonte site web"
                    value={line.description}
                    onChange={(e) => updateLine(line.id, "description", e.target.value)}
                    className="w-full px-4 py-2 bg-surface border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1">
                  <span className="md:hidden text-xs text-muted font-medium">Quantité</span>
                  <input 
                    type="number"
                    min="1"
                    required
                    value={line.quantity || ""}
                    onChange={(e) => updateLine(line.id, "quantity", parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-surface border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-right"
                  />
                </div>
                <div className="md:col-span-3 flex flex-col gap-1">
                  <span className="md:hidden text-xs text-muted font-medium">Prix Unitaire</span>
                  <input 
                    type="number"
                    min="0"
                    required
                    value={line.unitPrice || ""}
                    onChange={(e) => updateLine(line.id, "unitPrice", parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-surface border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-right"
                  />
                </div>
                <div className="md:col-span-1 flex items-center justify-end md:justify-center md:h-10 md:pt-0 pt-2">
                  <button 
                    type="button"
                    onClick={() => handleRemoveLine(line.id)}
                    disabled={lines.length === 1}
                    className="text-muted hover:text-danger hover:bg-danger/10 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button"
            onClick={handleAddLine}
            className="mt-6 text-sm font-medium text-ink bg-bg hover:bg-border px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter une ligne
          </button>
        </div>

        <div className="bg-surface border border-border rounded-card p-6 md:p-8 shadow-sm flex flex-col items-end">
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="flex justify-between items-center text-muted">
              <span>Sous-total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-muted">
              <div className="flex items-center gap-2">
                <span>TVA</span>
                <div className="flex items-center bg-bg border border-border rounded-lg overflow-hidden w-20">
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-transparent focus:outline-none text-right text-sm text-ink"
                  />
                  <span className="pr-2 text-sm">%</span>
                </div>
              </div>
              <span>{formatCurrency(taxAmount)}</span>
            </div>
            <div className="h-px bg-border w-full my-1"></div>
            <div className="flex justify-between items-center text-xl font-bold text-ink">
              <span>Total TTC</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button 
            type="button"
            onClick={() => router.push("/factures")}
            className="px-6 py-3 rounded-xl font-medium text-muted hover:bg-bg transition-colors"
          >
            Annuler
          </button>
          <button 
            type="submit"
            className="px-6 py-3 rounded-xl font-medium bg-ink text-surface hover:bg-ink/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Save className="h-5 w-5" />
            Enregistrer
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
          <div className="bg-surface rounded-card w-full max-w-sm shadow-soft overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-accent/20 text-accent-ink flex items-center justify-center mb-2">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-ink">Facture enregistrée !</h3>
              <p className="text-muted text-sm">
                Votre facture a été générée avec succès. Que souhaitez-vous faire maintenant ?
              </p>
              
              <div className="flex flex-col gap-3 w-full mt-4">
                <button 
                  onClick={() => {
                    alert("Téléchargement du PDF en cours...");
                    router.push("/factures");
                  }}
                  className="w-full px-4 py-3 rounded-xl font-bold bg-ink text-surface hover:bg-ink/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="h-5 w-5" />
                  Télécharger en PDF
                </button>
                <button 
                  onClick={() => router.push("/factures")}
                  className="w-full px-4 py-3 rounded-xl font-medium bg-bg text-ink hover:bg-border transition-colors flex items-center justify-center gap-2"
                >
                  Retour aux factures
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
