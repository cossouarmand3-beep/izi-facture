"use client";

import { useState } from "react";
import { User, Building2, CreditCard, Palette, Save, Upload, Bell, Shield, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";
import { useRef } from "react";

type Tab = "profil" | "entreprise" | "paiement" | "preferences";

export default function SettingsPage() {
  const { settings, updateSettings } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>("entreprise");
  const [isSaved, setIsSaved] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setLocalSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setLocalSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert("Le fichier est trop volumineux (max 2Mo).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setLocalSettings(prev => ({ ...prev, logo: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      alert("Le fichier est trop volumineux (max 2Mo).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setLocalSettings(prev => ({ ...prev, userAvatar: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: "profil", label: "Mon Profil", icon: User },
    { id: "entreprise", label: "Mon Entreprise", icon: Building2 },
    { id: "paiement", label: "Coordonnées Bancaires", icon: CreditCard },
    { id: "preferences", label: "Préférences & Affichage", icon: Palette },
  ] as const;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 pb-10 max-w-5xl mx-auto relative">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-ink">Paramètres</h2>
        <p className="text-muted mt-1">Gérez les informations de votre compte et vos préférences de facturation.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-ink text-surface shadow-sm" 
                    : "text-muted hover:bg-surface border border-transparent hover:border-border"
                )}
              >
                <tab.icon className="h-5 w-5 shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-surface border border-border rounded-card p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSave} className="flex flex-col gap-8 h-full">
            
            {activeTab === "entreprise" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-1">Informations de l'entreprise</h3>
                  <p className="text-sm text-muted">Ces informations apparaîtront sur vos factures.</p>
                </div>

                <div className="flex items-center gap-6">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="h-24 w-24 rounded-2xl bg-bg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted cursor-pointer hover:bg-surface hover:border-accent transition-all group overflow-hidden relative"
                  >
                    {localSettings.logo ? (
                      <img src={localSettings.logo} alt="Logo de l'entreprise" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-ink flex items-center justify-center text-surface font-bold text-3xl">
                        {localSettings.companyName.substring(0, 3).toUpperCase() || "IZI"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-medium gap-1">
                      <Upload className="h-4 w-4" /> Modifier
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-ink">Logo de l'entreprise</h4>
                    <p className="text-sm text-muted mt-1 mb-3">Format recommandé : Carré, PNG ou JPG (Max 2Mo).</p>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm font-semibold bg-bg hover:bg-border px-4 py-2 rounded-lg transition-colors"
                    >
                      Changer le logo
                    </button>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg" 
                      ref={fileInputRef} 
                      onChange={handleLogoChange}
                      className="hidden" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-ink">Nom de l'entreprise</label>
                    <input name="companyName" value={localSettings.companyName} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">NINEA / SIRET</label>
                    <input name="ninea" value={localSettings.ninea} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Numéro de Registre de Commerce</label>
                    <input name="rc" value={localSettings.rc} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-ink">Adresse postale</label>
                    <input name="address" value={localSettings.address} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Email de contact</label>
                    <input name="email" value={localSettings.email} onChange={handleChange} type="email" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Téléphone</label>
                    <input name="phone" value={localSettings.phone} onChange={handleChange} type="tel" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profil" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-1">Informations personnelles</h3>
                  <p className="text-sm text-muted">Gérez vos identifiants de connexion et votre sécurité.</p>
                </div>

                <div className="flex items-center gap-6">
                  <div 
                    onClick={() => avatarInputRef.current?.click()}
                    className="h-24 w-24 rounded-full bg-gradient-to-tr from-accent to-success border-4 border-surface shadow-sm flex flex-col items-center justify-center text-ink font-bold text-3xl cursor-pointer hover:opacity-90 transition-all group overflow-hidden relative"
                  >
                    {localSettings.userAvatar ? (
                      <img src={localSettings.userAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{`${localSettings.firstName?.charAt(0) || ""}${localSettings.lastName?.charAt(0) || ""}`.toUpperCase() || "U"}</span>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-medium gap-1">
                      <Upload className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-ink">Photo de profil</h4>
                    <p className="text-sm text-muted mt-1 mb-3">Format recommandé : Carré, PNG ou JPG (Max 2Mo).</p>
                    <button 
                      type="button" 
                      onClick={() => avatarInputRef.current?.click()}
                      className="text-sm font-semibold bg-bg hover:bg-border px-4 py-2 rounded-lg transition-colors"
                    >
                      Changer la photo
                    </button>
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg" 
                      ref={avatarInputRef} 
                      onChange={handleAvatarChange}
                      className="hidden" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Prénom</label>
                    <input name="firstName" value={localSettings.firstName} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Nom</label>
                    <input name="lastName" value={localSettings.lastName} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-ink">Email de connexion</label>
                    <input name="loginEmail" value={localSettings.loginEmail} onChange={handleChange} type="email" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-semibold text-ink mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" /> Sécurité
                  </h4>
                  <button type="button" className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium hover:bg-border transition-colors">Modifier le mot de passe</button>
                </div>
              </div>
            )}

            {activeTab === "paiement" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-1">Coordonnées bancaires</h3>
                  <p className="text-sm text-muted">Ces informations seront affichées en bas de vos factures pour faciliter les virements.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Nom de la banque</label>
                    <input name="bankName" value={localSettings.bankName} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Titulaire du compte</label>
                    <input name="accountHolder" value={localSettings.accountHolder} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">IBAN</label>
                    <input name="iban" value={localSettings.iban} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent font-mono" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Code SWIFT / BIC</label>
                    <input name="swift" value={localSettings.swift} onChange={handleChange} type="text" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent font-mono" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-1">Préférences & Affichage</h3>
                  <p className="text-sm text-muted">Personnalisez le comportement par défaut de l'application.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Devise par défaut</label>
                    <select name="currency" value={localSettings.currency} onChange={handleChange} className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="XOF">FCFA (XOF)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dollar ($)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">Taux de TVA par défaut (%)</label>
                    <input name="taxRate" value={localSettings.taxRate} onChange={handleChange} type="number" className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-ink">Notes par défaut (Bas de facture)</label>
                    <textarea name="notes" value={localSettings.notes} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 bg-bg border border-border rounded-field focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-semibold text-ink mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-accent" /> Notifications
                  </h4>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-bg rounded-xl border border-border cursor-pointer">
                      <div>
                        <p className="font-medium text-ink text-sm">Rappels de factures en retard</p>
                        <p className="text-xs text-muted mt-0.5">M'alerter lorsqu'une facture dépasse sa date d'échéance.</p>
                      </div>
                      <input name="notifications" checked={localSettings.notifications} onChange={handleChange} type="checkbox" className="h-5 w-5 rounded border-border text-accent focus:ring-accent" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex justify-end items-center gap-4">
              {isSaved && (
                <span className="text-emerald-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
                  <CheckCircle2 className="h-4 w-4" />
                  Enregistré !
                </span>
              )}
              <button 
                type="submit"
                className="bg-ink text-surface hover:bg-ink/90 transition-colors px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <Save className="h-5 w-5" />
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
