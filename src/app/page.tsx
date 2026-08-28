"use client";

import React, { useEffect } from 'react';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import './landing.css';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });
    
    // Magnetic button effect is already handled via CSS active/hover states 
    // and framer-motion/tailwind classes in components, but we can add the 
    // original script logic if needed. The CSS solution in components is more React-friendly.
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
      observer.disconnect();
      magneticButtons.forEach(btn => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-landing-background font-landing-body-md text-landing-on-background selection:bg-landing-primary-container selection:text-landing-on-primary">
      <LandingHeader />
      <main>
        <HeroSection />
        <PricingSection />
      </main>
      <LandingFooter />
    </div>
  );
}
