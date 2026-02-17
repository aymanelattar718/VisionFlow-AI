'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { appConfig } from '@/config/app.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Video,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full flex flex-col items-center gap-8 animate-fade-in">
          {/* Logo */}
          <div className="relative">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 flex items-center justify-center logo-glow animate-pulse-slow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-24 h-24 sm:w-28 sm:h-28 text-white"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                <path d="M8 12h.01M16 12h.01M12 16h.01" />
              </svg>
            </div>
            {/* Sparkle effects */}
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-cyan-300 animate-pulse" />
            <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-blue-300 animate-pulse delay-300" />
          </div>

          {/* App Name */}
          <div className="text-center space-y-3">
            <h1 className="text-responsive-3xl font-bold text-white text-gradient">
              {appConfig.name}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Create Video Button - Opens AI Hub */}
          <Link href="/ai-hub" className="mt-4">
            <Button
              size="lg"
              className={`
                bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600
                text-white font-bold text-lg px-10 py-7 rounded-full
                shadow-2xl shadow-blue-500/30 btn-glow
                flex items-center gap-3
              `}
            >
              <Video className="w-6 h-6" />
              {t('home.createVideo')}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

