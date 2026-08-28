"use client";

import { useState } from "react";
import { Client } from "@/lib/data/fixtures";
import { useApp } from "@/components/providers/AppProvider";
import { Search, UserPlus, Mail, Phone, MapPin, MoreVertical, X } from "lucide-react";

export default function ClientsPage() {
  const { clients, addClient } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", company: "", email: "", phone: "", address: "" });

  const filteredClients = clients.filter((client) => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const client: Client = {
      id: `c_${Date.now()}`,
      name: newClient.name,
      company: newClient.company || null,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address
    };
    addClient(client);
    setIsModalOpen(false);
    setNewClient({ name: "", company: "", email: "", phone: "", address: "" });
    alert("Client ajouté avec succès ! (Simulation locale)");
  };

  return (
    <div className="flex flex-col gap-8 pb-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Clients</h2>
          <p className="text-muted mt-1">Gérez votre répertoire de clients et entreprises.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-ink text-surface hover:bg-ink/90 transition-colors px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm"
        >
          <UserPlus className="h-5 w-5" />
          Ajouter un client
        </button>
      </div>

      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
        <input 
          type="text" 
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-surface border border-border rounded-card p-6 shadow-sm hover:shadow-soft transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-bg flex items-center justify-center text-ink font-bold text-lg">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-ink text-lg">{client.name}</h3>
                  {client.company && <p className="text-sm text-muted">{client.company}</p>}
                </div>
              </div>
              <button className="text-muted hover:bg-bg p-1.5 rounded-lg transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-auto space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{client.address}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredClients.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted bg-surface border border-dashed border-border rounded-card">
            <div className="flex flex-col items-center justify-center">
              <UserPlus className="h-12 w-12 text-border mb-3" />
              <p>Aucun client trouvé.</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal d'ajout de client */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/20 backdrop-blur-sm">
          <div className="bg-surface rounded-card w-full max-w-lg shadow-soft overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-semibold text-ink">Nouveau client</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-muted hover:bg-bg rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddClient} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Nom complet *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Cheikh Fall"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full px-4 py-2 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Entreprise (Optionnel)</label>
                <input 
                  type="text" 
                  placeholder="Ex: Senegal Digital"
                  value={newClient.company}
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                  className="w-full px-4 py-2 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink">Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="contact@exemple.sn"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="w-full px-4 py-2 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-ink">Téléphone *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+221..."
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-ink">Adresse *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Almadies, Dakar"
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className="w-full px-4 py-2 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium text-muted hover:bg-bg transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-ink text-surface hover:bg-ink/90 transition-colors shadow-sm"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
