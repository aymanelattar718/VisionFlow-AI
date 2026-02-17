import type { Metadata, Viewport } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { appConfig } from "@/config/app.config";

// Latin font for English
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Arabic font for RTL support
const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${appConfig.name} - ${appConfig.tagline}`,
  description: appConfig.description,
  keywords: [
    "AI Video Generator",
    "VisionFlow AI",
    "Artificial Intelligence",
    "Video Creation",
    "Text to Video",
    "AI Video",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "VisionFlow AI Team" }],
  icons: {
    icon: appConfig.logo.url,
    shortcut: appConfig.logo.url,
    apple: appConfig.logo.url,
  },
  openGraph: {
    title: `${appConfig.name} - ${appConfig.tagline}`,
    description: appConfig.description,
    type: "website",
    siteName: appConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${appConfig.name} - ${appConfig.tagline}`,
    description: appConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a8a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${tajawal.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}

