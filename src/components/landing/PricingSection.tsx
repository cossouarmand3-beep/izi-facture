import React from 'react';

export function PricingSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-landing-surface" id="pricing">
      <div className="max-w-7xl mx-auto text-center fade-in-up">
        <h2 className="font-landing-headline-lg text-3xl md:text-4xl text-landing-on-surface mb-4">Des tarifs simples et transparents</h2>
        <p className="font-landing-body-lg text-lg text-landing-on-surface-variant mb-12">Choisis le plan qui correspond à ton activité.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Plan Gratuit */}
          <div className="glass-card rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-landing-surface-container-highest flex flex-col h-full fade-in-up transition-transform duration-300 hover:-translate-y-2">
            <h3 className="font-landing-headline-md text-2xl text-landing-on-surface mb-2">Plan Gratuit</h3>
            <div className="mb-6">
              <span className="font-landing-display-lg text-4xl text-landing-on-surface">0 FCFA</span>
              <span className="font-landing-body-sm text-sm text-landing-secondary">/mois</span>
            </div>
            <ul className="mb-8 space-y-4 flex-1">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-landing-primary-container">check_circle</span>
                <span className="font-landing-body-md text-base text-landing-on-surface-variant">5 factures/mois</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-landing-primary-container">check_circle</span>
                <span className="font-landing-body-md text-base text-landing-on-surface-variant">1 utilisateur</span>
              </li>
            </ul>
            <button className="w-full bg-landing-surface-container hover:bg-landing-surface-container-high text-landing-on-surface font-landing-label-md text-sm py-3 rounded-lg transition-colors border border-landing-outline-variant">
              Choisir ce plan
            </button>
          </div>

          {/* Plan Pro */}
          <div className="bg-landing-surface-container-lowest rounded-xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border-2 border-landing-primary-container relative flex flex-col h-full fade-in-up transform md:-translate-y-4 transition-transform duration-300 hover:-translate-y-6">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-landing-primary-container text-landing-on-primary font-landing-label-md text-xs px-4 py-1 rounded-full uppercase tracking-wider">Le plus populaire</div>
            <h3 className="font-landing-headline-md text-2xl text-landing-on-surface mb-2">Plan Pro</h3>
            <div className="mb-6">
              <span className="font-landing-display-lg text-4xl text-landing-on-surface">5 000 FCFA</span>
              <span className="font-landing-body-sm text-sm text-landing-secondary">/mois</span>
            </div>
            <ul className="mb-8 space-y-4 flex-1">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-landing-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-landing-body-md text-base text-landing-on-surface-variant">Factures illimitées</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-landing-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-landing-body-md text-base text-landing-on-surface-variant">Support prioritaire</span>
              </li>
            </ul>
            <button className="magnetic-btn w-full bg-landing-primary-container text-landing-on-primary font-landing-label-md text-sm py-3 rounded-lg transition-colors active:scale-95">
              Choisir ce plan
            </button>
          </div>

          {/* Plan Business */}
          <div className="glass-card rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-landing-surface-container-highest flex flex-col h-full fade-in-up transition-transform duration-300 hover:-translate-y-2" style={{ transitionDelay: '0.2s' }}>
            <h3 className="font-landing-headline-md text-2xl text-landing-on-surface mb-2">Plan Business</h3>
            <div className="mb-6">
              <span className="font-landing-display-lg text-4xl text-landing-on-surface">15 000 FCFA</span>
              <span className="font-landing-body-sm text-sm text-landing-secondary">/mois</span>
            </div>
            <ul className="mb-8 space-y-4 flex-1">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-landing-primary-container">check_circle</span>
                <span className="font-landing-body-md text-base text-landing-on-surface-variant">Multi-utilisateurs</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-landing-primary-container">check_circle</span>
                <span className="font-landing-body-md text-base text-landing-on-surface-variant">Rapports avancés</span>
              </li>
            </ul>
            <button className="w-full bg-landing-surface-container hover:bg-landing-surface-container-high text-landing-on-surface font-landing-label-md text-sm py-3 rounded-lg transition-colors border border-landing-outline-variant">
              Choisir ce plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
