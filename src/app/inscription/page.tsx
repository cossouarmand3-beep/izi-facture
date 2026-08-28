"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function InscriptionPage() {
  useEffect(() => {
    // Magnetic effect for the button
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const btn = mouseEvent.currentTarget as HTMLElement;
      const rect = btn.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;
      btn.style.transform = `scale(1.02) translate(${x * 0.1}px, ${y * 0.1}px)`;
    };
    
    const handleMouseLeave = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      btn.style.transform = '';
    };

    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      magneticButtons.forEach(btn => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-landing-background font-landing-body-md text-landing-on-background flex flex-col items-center justify-center p-4">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tl from-landing-primary-container/10 to-transparent pointer-events-none z-0"></div>

      <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            <img 
              className="h-10 w-auto" 
              alt="iziFacture Logo" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQB4jx1H1KnUAVbp2ZuCKHjVCYffi491eeNY55gXg_ohSx-Y39ERmG7cWIjZgk7xFNfxiH6R-VX4Pwh8ihS93ArUbBELSwhPBkDIZJW2zyTwjVzL8_uzP-IPSkxsEvyXQXHla38OC503W5YunWO1sUUQ6vjb1t1_A_Qtgf0ahMqO5WospP0LadpEsiiBb85dEV5lGCdWA72zbxl4b2a42sFUbsh7FEdYoXqR41KcWD8qe_y71LpHmY"
            />
            <span className="font-landing-headline-lg text-3xl font-bold text-landing-primary dark:text-landing-primary-fixed-dim">iziFacture</span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-landing-outline-variant/50 relative overflow-hidden">
          
          <div className="text-center mb-8">
            <h1 className="font-landing-headline-md text-2xl font-bold text-landing-on-surface mb-2">Rejoignez-nous</h1>
            <p className="font-landing-body-sm text-landing-on-surface-variant">Créez votre compte en quelques secondes.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/tableau-de-bord'; }}>
            
            <div className="space-y-1">
              <label className="font-landing-label-md text-sm text-landing-on-surface">Nom de l'entreprise</label>
              <input 
                type="text" 
                placeholder="Ex: Ma Société SAS"
                className="w-full px-4 py-3 rounded-lg border border-landing-outline-variant/60 bg-landing-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-landing-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-landing-label-md text-sm text-landing-on-surface">Adresse email</label>
              <input 
                type="email" 
                placeholder="vous@entreprise.com"
                className="w-full px-4 py-3 rounded-lg border border-landing-outline-variant/60 bg-landing-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-landing-primary focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="font-landing-label-md text-sm text-landing-on-surface">Mot de passe</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-landing-outline-variant/60 bg-landing-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-landing-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              className="magnetic-btn w-full bg-landing-primary-container text-landing-on-primary font-landing-label-md text-base px-6 py-4 rounded-lg mt-4 shadow-sm hover:bg-landing-surface-tint transition-colors active:scale-95"
            >
              Créer mon compte
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="font-landing-body-sm text-landing-on-surface-variant">
              Déjà un compte ?{' '}
              <Link href="/connexion" className="text-landing-primary font-landing-label-md hover:underline">
                Se connecter
              </Link>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
