import Link from "next/link";
import { LayoutDashboard, FileText, Users, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/tableau-de-bord", active: true },
    { icon: FileText, label: "Factures", href: "/factures" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Settings, label: "Paramètres", href: "/parametres" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-ink/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      <aside 
        className={cn(
          "flex-col bg-surface-ink text-surface transition-all duration-300 relative",
          "md:flex md:rounded-r-3xl md:my-2 md:ml-2",
          isMobileOpen ? "fixed inset-y-0 left-0 z-50 flex w-[260px] m-0 shadow-2xl" : "hidden md:flex",
          isCollapsed && !isMobileOpen ? "w-[88px]" : "w-[260px]"
        )}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center shrink-0">
              <span className="text-accent-ink font-bold text-xl leading-none">I</span>
            </div>
            {(!isCollapsed || isMobileOpen) && <span className="font-bold text-xl tracking-tight">Izi Facture</span>}
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => { if (isMobileOpen && onMobileClose) onMobileClose(); }}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group",
                item.active 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted hover:bg-white/5 hover:text-white"
              )}
              title={isCollapsed && !isMobileOpen ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            className="flex items-center gap-4 px-3 py-3 rounded-xl text-muted hover:bg-white/5 hover:text-white transition-colors w-full"
            title={isCollapsed && !isMobileOpen ? "Déconnexion" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {(!isCollapsed || isMobileOpen) && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>

        <button 
          onClick={onToggle}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-surface-ink border-2 border-surface text-white items-center justify-center hover:bg-ink transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>
    </>
  );
}
