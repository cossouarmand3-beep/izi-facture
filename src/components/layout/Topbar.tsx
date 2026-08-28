"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";
import Link from "next/link";

interface TopbarProps {
  onMobileMenuToggle: () => void;
}

export function Topbar({ onMobileMenuToggle }: TopbarProps) {
  const { settings, invoices } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const initials = `${settings.firstName?.charAt(0) || ""}${settings.lastName?.charAt(0) || ""}`.toUpperCase() || "U";
  const overdueInvoices = invoices.filter(inv => inv.status === "overdue");
  const unreadCount = overdueInvoices.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 -ml-2 rounded-lg hover:bg-black/5"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold tracking-tight hidden md:block">Tableau de bord</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Rechercher une facture..." 
            className="h-10 w-64 rounded-full bg-black/5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 relative"
            >
              <Bell className="h-5 w-5 text-ink" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-danger border-2 border-surface flex items-center justify-center"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h3 className="font-semibold text-ink">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-danger/10 text-danger font-bold px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {overdueInvoices.length > 0 ? (
                    overdueInvoices.map((inv) => (
                      <Link 
                        key={inv.id} 
                        href={`/factures/${inv.id}`}
                        onClick={() => setShowNotifications(false)}
                        className="p-4 border-b border-border hover:bg-bg flex items-start gap-3 transition-colors last:border-0"
                      >
                        <AlertCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-ink leading-tight mb-1">
                            Facture {inv.number} en retard
                          </p>
                          <p className="text-xs text-muted">
                            Client : {inv.clientName}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">Aucune nouvelle notification</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <Link href="/parametres" className="h-10 w-10 rounded-full bg-gradient-to-tr from-accent to-success border-2 border-surface flex items-center justify-center overflow-hidden text-ink font-bold hover:opacity-90 transition-opacity">
            {settings.userAvatar ? (
              <img src={settings.userAvatar} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
