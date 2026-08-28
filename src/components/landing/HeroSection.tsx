import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-8 md:pt-32 md:pb-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 text-center md:text-left fade-in-up">
        <h1 className="font-landing-display-lg text-4xl md:text-5xl lg:text-6xl text-landing-on-surface mb-6 leading-tight">
          Dites adieu aux factures sur Word et Excel.
        </h1>
        <p className="font-landing-body-lg text-lg text-landing-on-surface-variant mb-8 max-w-2xl mx-auto md:mx-0">
          La solution de facturation simple et moderne conçue pour les entrepreneurs africains.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link 
            href="/inscription" 
            className="magnetic-btn bg-landing-primary-container text-landing-on-primary font-landing-label-md text-base px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            Commencer gratuitement
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
          </Link>
          <a 
            href="#demo" 
            className="bg-landing-surface-container hover:bg-landing-surface-container-high text-landing-on-surface font-landing-label-md text-base px-8 py-4 rounded-lg transition-colors flex items-center justify-center border border-landing-outline-variant"
          >
            Voir la démo
          </a>
        </div>
      </div>
      <div className="flex-1 w-full max-w-2xl fade-in-up" style={{ transitionDelay: '0.2s' }}>
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-landing-outline-variant/50 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(46,204,113,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-landing-primary-container/10 to-transparent pointer-events-none z-10"></div>
          <img 
            className="w-full h-auto object-cover block" 
            alt="Dashboard Preview" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTCnZwWxid2MIimvGjBiDf_-Usr7RBRdbxIHHC0o0T3aMfQlLpc8NhAXsxdVcboBxxJFXaSCfMvPfqn5ul8iecpPzo-aCuRaSx7ubgdkA5QwSB-P_hvZi2HC5nf6_Ur5_VYF37Oq2XIZ7Gdk33uirfb7GTvqKknAIb_-HHACsvYoxGQPmGNgjg_CLkEMqDaF57URnrcjbEkmGDYmsgplQoFirUvXncsalOqRKuLVrt23bOm-oFsaTs"
          />
        </div>
      </div>
    </section>
  );
}
