'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { appConfig } from '@/config/app.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  Video,
  Download,
  Maximize2,
  Wand2,
  Loader2,
  Sparkles,
  Sun,
  MonitorPlay,
} from 'lucide-react';

type SceneStyle = 'realistic' | 'cinematic' | 'artistic' | 'animated';
type Lighting = 'natural' | 'dramatic' | 'soft' | 'neon';
type AspectRatio = '9:16' | '16:9' | '1:1';

interface VideoState {
  isGenerating: boolean;
  videoUrl: string | null;
  error: string | null;
}

export default function GeneratePage() {
  const { t, dir } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [sceneStyle, setSceneStyle] = useState<SceneStyle>('realistic');
  const [lighting, setLighting] = useState<Lighting>('natural');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [videoState, setVideoState] = useState<VideoState>({
    isGenerating: false,
    videoUrl: null,
    error: null,
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        variant: 'destructive',
        title: t('errors.invalidPrompt'),
      });
      return;
    }

    setVideoState({ isGenerating: true, videoUrl: null, error: null });

    try {
      // API call to generate video
      const response = await fetch('/api/video/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: sceneStyle,
          lighting,
          aspectRatio,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      const data = await response.json();

      if (data.success && data.videoUrl) {
        setVideoState({
          isGenerating: false,
          videoUrl: data.videoUrl,
          error: null,
        });
        toast({
          title: t('common.success'),
          description: t('generate.videoPreview'),
        });
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error) {
      console.error('Video generation error:', error);
      setVideoState({
        isGenerating: false,
        videoUrl: null,
        error: t('errors.generationFailed'),
      });
      toast({
        variant: 'destructive',
        title: t('errors.somethingWentWrong'),
        description: t('errors.generationFailed'),
      });
    }
  };

  const handleDownload = async () => {
    if (!videoState.videoUrl) return;

    try {
      const response = await fetch(videoState.videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `visionflow-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({
        title: t('common.success'),
        description: 'Video downloaded successfully',
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        variant: 'destructive',
        title: t('errors.fileDownloadFailed'),
      });
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          {/* Page Title */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Wand2 className="w-6 h-6 text-cyan-300" />
              <h1 className="text-responsive-2xl font-bold text-white">
                {t('generate.title')}
              </h1>
              <Sparkles className="w-6 h-6 text-cyan-300" />
            </div>
            <p className="text-white/70 text-lg">
              {t('home.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input Controls */}
            <div className="space-y-6">
              {/* Prompt Input */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    {t('generate.promptLabel')}
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {t('app.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder={t('generate.promptPlaceholder')}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-blue-500 resize-none"
                    dir={dir}
                  />
                </CardContent>
              </Card>

              {/* Style Options */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {t('generate.sceneStyle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={sceneStyle} onValueChange={(value) => setSceneStyle(value as SceneStyle)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20">
                      {appConfig.videoOptions.sceneStyles.map((style) => (
                        <SelectItem key={style} value={style} className="text-white focus:bg-blue-600">
                          {t(`generate.sceneStyles.${style}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={lighting} onValueChange={(value) => setLighting(value as Lighting)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20">
                      {appConfig.videoOptions.lightingOptions.map((light) => (
                        <SelectItem key={light} value={light} className="text-white focus:bg-blue-600">
                          {t(`generate.lightingOptions.${light}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={aspectRatio} onValueChange={(value) => setAspectRatio(value as AspectRatio)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-white/20">
                      {appConfig.videoOptions.aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value} className="text-white focus:bg-blue-600">
                          {t(`generate.aspectRatios.${ratio.value}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={videoState.isGenerating || !prompt.trim()}
                className={`
                  w-full bg-gradient-to-r from-blue-500 to-cyan-500
                  hover:from-blue-600 hover:to-cyan-600
                  text-white font-bold text-lg py-6 rounded-xl
                  shadow-2xl shadow-blue-500/30 btn-glow
                  flex items-center justify-center gap-3
                `}
              >
                {videoState.isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t('generate.generating')}
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6" />
                    {t('generate.generateButton')}
                  </>
                )}
              </Button>
            </div>

            {/* Right Column - Video Preview */}
            <div className="space-y-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MonitorPlay className="w-5 h-5" />
                    {t('generate.videoPreview')}
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {videoState.videoUrl ? 'Your generated video' : t('generate.noVideo')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Video Player */}
                  <div className={`
                    relative rounded-xl overflow-hidden bg-slate-900/50
                    flex items-center justify-center min-h-[400px]
                    border border-white/10
                  `}>
                    {videoState.isGenerating ? (
                      <div className="flex flex-col items-center gap-4 p-8">
                        <Loader2 className="w-16 h-16 animate-spin text-blue-400" />
                        <p className="text-white text-lg">{t('generate.generating')}</p>
                        <p className="text-white/60 text-sm">
                          This may take a few moments...
                        </p>
                      </div>
                    ) : videoState.videoUrl ? (
                      <video
                        ref={videoRef}
                        src={videoState.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                        playsInline
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4 p-8 text-center">
                        <Video className="w-20 h-20 text-white/30" />
                        <p className="text-white/50 text-lg">{t('generate.noVideo')}</p>
                        <p className="text-white/30 text-sm max-w-xs">
                          Enter a prompt and click generate to create your video
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {videoState.videoUrl && (
                    <div className="flex gap-3">
                      <Button
                        onClick={handleDownload}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 btn-glow"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t('generate.downloadButton')}
                      </Button>
                      <Button
                        onClick={handleFullscreen}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 btn-glow"
                      >
                        <Maximize2 className="w-4 h-4 mr-2" />
                        {t('generate.fullscreenButton')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
