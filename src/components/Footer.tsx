'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { appConfig } from '@/config/app.config';
import {
  Youtube,
  Music2,
  Instagram,
  Facebook,
  Send,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  youtube: Youtube,
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  telegram: Send,
};

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 glass mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Social Links */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <h3 className="text-white font-semibold text-lg">
            {t('footer.followUs')}
          </h3>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {Object.entries(appConfig.socialLinks).map(([key, social]) => {
              if (!social.enabled) return null;

              const Icon = iconMap[social.icon] || Send;
              return (
                <Link
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center smooth-transition btn-glow"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-white" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* App Branding */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/" className="text-white font-bold text-xl hover:text-cyan-300 smooth-transition">
            {appConfig.name}
          </Link>
          <p className="text-white/60 text-sm">
            {t('footer.rightsReserved')} © {new Date().getFullYear()}
          </p>
          <p className="text-white/40 text-xs mt-2">
            {t('app.description')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
