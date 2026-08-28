import React from 'react';

export function LandingFooter() {
  return (
    <footer className="bg-landing-surface-container-lowest dark:bg-landing-inverse-surface border-t border-landing-outline-variant/50 flex flex-col md:flex-row justify-between items-center w-full px-4 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4 md:mb-0 transition-transform duration-300 hover:scale-105">
        <span className="font-landing-headline-sm text-lg font-bold text-landing-on-surface dark:text-landing-inverse-on-surface">iziFacture</span>
      </div>
      
      <div className="flex gap-6 mb-4 md:mb-0">
        <a className="font-landing-label-md text-sm text-landing-secondary dark:text-landing-secondary-fixed-dim hover:text-landing-primary dark:hover:text-landing-primary-fixed-dim transition-colors focus:outline-none focus:ring-2 focus:ring-landing-primary" href="#">Conditions d'utilisation</a>
        <a className="font-landing-label-md text-sm text-landing-secondary dark:text-landing-secondary-fixed-dim hover:text-landing-primary dark:hover:text-landing-primary-fixed-dim transition-colors focus:outline-none focus:ring-2 focus:ring-landing-primary" href="#">Politique de confidentialité</a>
        <a className="font-landing-label-md text-sm text-landing-secondary dark:text-landing-secondary-fixed-dim hover:text-landing-primary dark:hover:text-landing-primary-fixed-dim transition-colors focus:outline-none focus:ring-2 focus:ring-landing-primary" href="#">Contact</a>
      </div>
      
      <div className="font-landing-body-sm text-sm text-landing-secondary dark:text-landing-secondary-fixed-dim text-center">
        © 2024 iziFacture. Fait avec fierté en Afrique.
      </div>
    </footer>
  );
}
