'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { appConfig } from '@/config/app.config';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Home, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and App Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center logo-glow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight group-hover:text-cyan-300 transition-colors">
                {appConfig.name}
              </span>
              <span className="text-white/70 text-xs leading-tight hidden sm:block">
                {t('app.tagline')}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {/* Home Link */}
            <Link href="/">
              <Button
                variant={pathname === '/' ? 'default' : 'ghost'}
                className={`
                  ${pathname === '/'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                  transition-all
                `}
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>

            {/* AI Hub Link */}
            <Link href="/ai-hub">
              <Button
                variant={pathname === '/ai-hub' ? 'default' : 'ghost'}
                className={`
                  ${pathname === '/ai-hub'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                  }
                  transition-all
                `}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">AI Hub</span>
              </Button>
            </Link>

            {/* Separator */}
            <div className="w-px h-6 bg-white/20 mx-2 hidden sm:block" />

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-white/70 hidden sm:block" />
              <Select
                value={language}
                onValueChange={(value) => setLanguage(value as 'ar' | 'en')}
              >
                <SelectTrigger className="w-[100px] sm:w-[140px] bg-white/10 border-white/20 text-white focus:ring-blue-500 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20">
                  {Object.entries(appConfig.languages).map(([lang, config]) => (
                    <SelectItem
                      key={lang}
                      value={lang}
                      className="text-white focus:bg-blue-600"
                    >
                      {config.flag} {config.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
