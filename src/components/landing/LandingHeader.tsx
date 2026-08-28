"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-landing-surface/80 dark:bg-landing-on-surface/80 backdrop-blur-md top-0 sticky border-b border-landing-outline-variant/30 dark:border-landing-outline/20 shadow-sm dark:shadow-none z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <img 
            className="h-8 w-auto" 
            alt="iziFacture Logo" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQB4jx1H1KnUAVbp2ZuCKHjVCYffi491eeNY55gXg_ohSx-Y39ERmG7cWIjZgk7xFNfxiH6R-VX4Pwh8ihS93ArUbBELSwhPBkDIZJW2zyTwjVzL8_uzP-IPSkxsEvyXQXHla38OC503W5YunWO1sUUQ6vjb1t1_A_Qtgf0ahMqO5WospP0LadpEsiiBb85dEV5lGCdWA72zbxl4b2a42sFUbsh7FEdYoXqR41KcWD8qe_y71LpHmY"
          />
          <span className="font-landing-headline-lg text-2xl font-bold text-landing-primary dark:text-landing-primary-fixed-dim">iziFacture</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <a className="font-landing-label-md text-sm text-landing-secondary dark:text-landing-secondary-fixed-dim font-medium hover:text-landing-primary dark:hover:text-landing-primary-fixed-dim transition-all duration-300 hover:-translate-y-1" href="#features">Fonctionnalités</a>
          <a className="font-landing-label-md text-sm text-landing-secondary dark:text-landing-secondary-fixed-dim font-medium hover:text-landing-primary dark:hover:text-landing-primary-fixed-dim transition-all duration-300 hover:-translate-y-1" href="#pricing">Tarifs</a>
          <a className="font-landing-label-md text-sm text-landing-secondary dark:text-landing-secondary-fixed-dim font-medium hover:text-landing-primary dark:hover:text-landing-primary-fixed-dim transition-all duration-300 hover:-translate-y-1" href="#testimonials">Témoignages</a>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/connexion" 
            className="font-landing-label-md text-sm text-landing-on-surface hover:text-landing-primary transition-colors"
          >
            Se connecter
          </Link>
          <Link 
            href="/inscription" 
            className="magnetic-btn bg-landing-primary-container text-landing-on-primary font-landing-label-md text-sm px-6 py-3 rounded-lg hover:bg-landing-surface-tint transition-colors items-center gap-2"
          >
            Commencer gratuitement
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center p-2 text-landing-secondary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-landing-surface dark:bg-landing-inverse-surface border-b border-landing-outline-variant/30 px-4 py-4 flex flex-col gap-4 shadow-lg absolute w-full animate-accordion-down">
          <a className="font-landing-label-md text-base text-landing-on-surface dark:text-landing-inverse-on-surface" href="#features" onClick={() => setIsMobileMenuOpen(false)}>Fonctionnalités</a>
          <a className="font-landing-label-md text-base text-landing-on-surface dark:text-landing-inverse-on-surface" href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Tarifs</a>
          <a className="font-landing-label-md text-base text-landing-on-surface dark:text-landing-inverse-on-surface" href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Témoignages</a>
          
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-landing-outline-variant/30">
            <Link 
              href="/connexion" 
              className="text-landing-on-surface font-landing-label-md text-base px-6 py-3 rounded-lg text-center border border-landing-outline-variant/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Se connecter
            </Link>
            <Link 
              href="/inscription" 
              className="bg-landing-primary-container text-landing-on-primary font-landing-label-md text-base px-6 py-3 rounded-lg text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
