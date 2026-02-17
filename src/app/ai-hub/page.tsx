'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Video,
  Sparkles,
  ExternalLink,
  Wand2,
  Zap,
  Rocket,
  Bot,
} from 'lucide-react';

interface AIService {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
  color: string;
}

export default function AIHubPage() {
  const { t } = useLanguage();

  const aiServices: AIService[] = [
    {
      id: 'lumalabs',
      name: 'Luma Labs Dream Machine',
      description: 'High-quality AI video generation from text and images',
      url: 'https://lumalabs.ai/dream-machine',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'runway',
      name: 'Runway ML',
      description: 'Professional AI video editing and generation platform',
      url: 'https://runwayml.com',
      icon: Wand2,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'pika',
      name: 'Pika Labs',
      description: 'Creative AI video generation for everyone',
      url: 'https://pika.art',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'xai',
      name: 'x.ai Grok',
      description: 'Advanced AI assistant with video capabilities',
      url: 'https://x.ai',
      icon: Bot,
      color: 'from-gray-700 to-gray-900',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Video className="w-6 h-6 text-cyan-300" />
              <h1 className="text-responsive-2xl font-bold text-white">
                AI Video Hub
              </h1>
              <Sparkles className="w-6 h-6 text-cyan-300" />
            </div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Access the best AI video generation services in one place
            </p>
          </div>

          {/* AI Services Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {aiServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="glass border-white/20 hover:border-white/30 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white">{service.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-white/60">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        w-full bg-gradient-to-r ${service.color}
                        hover:opacity-90 transition-opacity
                        text-white font-semibold py-3 rounded-xl
                        shadow-lg hover:shadow-xl
                        flex items-center justify-center gap-2
                      `}
                    >
                      <span>Visit {service.name}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Info Card */}
          <Card className="glass border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Rocket className="w-5 h-5 text-cyan-300 mt-0.5 shrink-0" />
                <div className="text-white/80">
                  <p className="font-semibold mb-2">About AI Video Hub</p>
                  <p className="text-sm text-white/60">
                    This hub provides quick access to the leading AI video generation platforms.
                    Each service offers unique capabilities for creating professional AI-generated videos.
                    Click on any service above to start creating amazing content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
