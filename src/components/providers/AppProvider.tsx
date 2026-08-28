"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockInvoices, mockClients, InvoiceItem, Client } from "@/lib/data/fixtures";
import { supabase } from "@/lib/supabase";

export type Settings = {
  companyName: string;
  ninea: string;
  rc: string;
  address: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  loginEmail: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  swift: string;
  currency: string;
  taxRate: string;
  notes: string;
  notifications: boolean;
  logo?: string;
  userAvatar?: string;
};

export const defaultSettings: Settings = {
  companyName: "Izi Facture SARL",
  ninea: "123456789",
  rc: "SN DKR 2023 B 1234",
  address: "123 Avenue Leopold Sedar Senghor, Dakar",
  email: "contact@izi-facture.sn",
  phone: "+221 77 123 45 67",
  firstName: "Izi",
  lastName: "Admin",
  loginEmail: "admin@izi-facture.sn",
  bankName: "Ecobank Sénégal",
  accountHolder: "IZI FACTURE SARL",
  iban: "SN12 3456 7890 1234 5678 9012",
  swift: "ECOCSNDA",
  currency: "XOF",
  taxRate: "18",
  notes: "Merci pour votre confiance. Paiement attendu sous 30 jours à réception de cette facture.",
  notifications: true
};

type AppContextType = {
  invoices: InvoiceItem[];
  clients: Client[];
  settings: Settings;
  isLoading: boolean;
  addInvoice: (invoice: InvoiceItem) => Promise<void>;
  updateInvoiceStatus: (id: string, status: InvoiceItem["status"]) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  addClient: (client: Client) => Promise<void>;
  updateSettings: (newSettings: Settings) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Charger depuis Supabase au démarrage
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Load Settings
        const { data: dbSettings } = await supabase.from('settings').select('*').limit(1).single();
        if (dbSettings) {
          setSettings({
            companyName: dbSettings.company_name || "",
            ninea: dbSettings.ninea || "",
            rc: dbSettings.rc || "",
            address: dbSettings.address || "",
            email: dbSettings.email || "",
            phone: dbSettings.phone || "",
            firstName: dbSettings.first_name || "",
            lastName: dbSettings.last_name || "",
            loginEmail: dbSettings.login_email || "",
            bankName: dbSettings.bank_name || "",
            accountHolder: dbSettings.account_holder || "",
            iban: dbSettings.iban || "",
            swift: dbSettings.swift || "",
            currency: dbSettings.currency || "XOF",
            taxRate: dbSettings.tax_rate || "18",
            notes: dbSettings.notes || "",
            notifications: dbSettings.notifications ?? true,
            logo: dbSettings.logo || undefined,
            userAvatar: dbSettings.user_avatar || undefined,
          });
        }

        // Load Clients
        const { data: dbClients } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
        if (dbClients) {
          setClients(dbClients.map(c => ({
            id: c.id,
            name: c.name,
            company: c.company,
            email: c.email,
            phone: c.phone || "",
            address: c.address || "",
            avatar: c.avatar || undefined,
          })));
        }

        // Load Invoices
        const { data: dbInvoices } = await supabase.from('invoices').select(`
          *,
          lines:invoice_lines(*)
        `).order('created_at', { ascending: false });
        
        if (dbInvoices) {
          setInvoices(dbInvoices.map((inv: any) => ({
            id: inv.id,
            number: inv.number,
            clientId: inv.client_id,
            clientName: inv.client_name,
            clientCompany: inv.client_company,
            clientEmail: inv.client_email,
            clientAddress: inv.client_address,
            clientAvatar: inv.client_avatar,
            issueDate: inv.issue_date,
            dueDate: inv.due_date,
            status: inv.status,
            subtotal: inv.subtotal,
            taxAmount: inv.tax_amount,
            total: inv.total,
            lines: inv.lines.map((l: any) => ({
              id: l.id,
              description: l.description,
              quantity: l.quantity,
              unitPrice: l.unit_price,
            })),
          })));
        }
      } catch (error) {
        console.error("Error loading data from Supabase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const addInvoice = async (invoice: InvoiceItem) => {
    // Insert invoice
    const { data: invData, error: invError } = await supabase.from('invoices').insert({
      id: invoice.id,
      number: invoice.number,
      client_id: invoice.clientId,
      client_name: invoice.clientName,
      client_company: invoice.clientCompany,
      client_email: invoice.clientEmail,
      client_address: invoice.clientAddress,
      client_avatar: invoice.clientAvatar,
      issue_date: invoice.issueDate,
      due_date: invoice.dueDate,
      status: invoice.status,
      subtotal: invoice.subtotal,
      tax_amount: invoice.taxAmount,
      total: invoice.total,
    }).select().single();

    if (invError) {
      console.error("Error adding invoice:", invError);
      return;
    }

    // Insert lines
    if (invoice.lines.length > 0) {
      const { error: linesError } = await supabase.from('invoice_lines').insert(
        invoice.lines.map(line => ({
          id: line.id,
          invoice_id: invoice.id,
          description: line.description,
          quantity: line.quantity,
          unit_price: line.unitPrice,
        }))
      );
      if (linesError) console.error("Error adding invoice lines:", linesError);
    }

    setInvoices((prev) => [invoice, ...prev]);
  };

  const updateInvoiceStatus = async (id: string, status: InvoiceItem["status"]) => {
    const { error } = await supabase.from('invoices').update({ status }).eq('id', id);
    if (!error) {
      setInvoices((prev) => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
    } else {
      console.error("Error updating invoice status:", error);
    }
  };

  const deleteInvoice = async (id: string) => {
    const { error } = await supabase.from('invoices').delete().eq('id', id);
    if (!error) {
      setInvoices((prev) => prev.filter(inv => inv.id !== id));
    } else {
      console.error("Error deleting invoice:", error);
    }
  };

  const addClient = async (client: Client) => {
    const { error } = await supabase.from('clients').insert({
      id: client.id,
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      address: client.address,
      avatar: client.avatar,
    });
    if (!error) {
      setClients((prev) => [client, ...prev]);
    } else {
      console.error("Error adding client:", error);
    }
  };

  const updateSettings = async (newSettings: Settings) => {
    // Try to get first
    const { data } = await supabase.from('settings').select('id').limit(1).single();
    const payload = {
      company_name: newSettings.companyName,
      ninea: newSettings.ninea,
      rc: newSettings.rc,
      address: newSettings.address,
      email: newSettings.email,
      phone: newSettings.phone,
      first_name: newSettings.firstName,
      last_name: newSettings.lastName,
      login_email: newSettings.loginEmail,
      bank_name: newSettings.bankName,
      account_holder: newSettings.accountHolder,
      iban: newSettings.iban,
      swift: newSettings.swift,
      currency: newSettings.currency,
      tax_rate: newSettings.taxRate,
      notes: newSettings.notes,
      notifications: newSettings.notifications,
      logo: newSettings.logo,
      user_avatar: newSettings.userAvatar,
    };

    if (data) {
      await supabase.from('settings').update(payload).eq('id', data.id);
    } else {
      await supabase.from('settings').insert(payload);
    }
    setSettings(newSettings);
  };

  return (
    <AppContext.Provider value={{
      invoices,
      clients,
      settings,
      isLoading,
      addInvoice,
      updateInvoiceStatus,
      deleteInvoice,
      addClient,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
