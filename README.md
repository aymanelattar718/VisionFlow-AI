# VisionFlow AI - AI Video Generator

A modern, production-ready AI video generator web application built with Next.js 16, TypeScript, and Tailwind CSS. Features multilingual support (Arabic & English), RTL/LTR layouts, and a beautiful blue gradient design.

![VisionFlow AI](https://img.shields.io/badge/VisionFlow-AI-blue) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)

## 🌟 Features

### Core Features
- ✨ **AI Video Generation** - Create stunning videos from text prompts
- 🌍 **Multilingual Support** - Arabic & English with automatic RTL/LTR switching
- 🎨 **Premium UI Design** - Modern blue gradient theme with glassmorphism effects
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🔗 **Dynamic Social Links** - Easily configurable social media integration
- ⚡ **Performance Optimized** - Fast loading and smooth animations
- 🎭 **Multiple Styles** - Realistic, Cinematic, Artistic, and Animated scenes
- 💡 **Lighting Options** - Natural, Dramatic, Soft, and Neon lighting
- 📐 **Aspect Ratios** - 9:16 (Portrait), 16:9 (Landscape), 1:1 (Square)

### Technical Features
- 🏗️ **Clean Architecture** - Well-organized code structure
- 🔄 **Language Context** - Stable translation system without runtime errors
- ⚙️ **Centralized Config** - Easy configuration management
- 🎯 **Type Safe** - Full TypeScript implementation
- 🎨 **Shadcn/UI Components** - Pre-built accessible components
- 🌙 **Dark Mode Ready** - Theme support for light/dark modes
- ♿ **Accessible** - ARIA labels and keyboard navigation support

## 📁 Project Structure

```
visionflow-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── video/
│   │   │       └── generate/
│   │   │           └── route.ts          # Video generation API
│   │   ├── generate/
│   │   │   └── page.tsx                  # Generate video page
│   │   ├── globals.css                   # Global styles
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Home page
│   ├── components/
│   │   ├── Header.tsx                    # Header with language switcher
│   │   ├── Footer.tsx                    # Footer with social links
│   │   └── ui/                           # Shadcn/UI components
│   ├── contexts/
│   │   └── LanguageContext.tsx           # Language provider
│   ├── hooks/
│   │   └── use-toast.ts                  # Toast hook
│   └── lib/
│       ├── db.ts                         # Database utilities
│       └── utils.ts                      # Utility functions
├── config/
│   └── app.config.ts                     # App configuration
├── translations/
│   ├── ar.json                           # Arabic translations
│   └── en.json                           # English translations
├── prisma/
│   └── schema.prisma                     # Database schema
├── public/
│   └── logo.svg                          # App logo
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/visionflow-ai.git
cd visionflow-ai
```

2. **Install dependencies**
```bash
bun install
# or
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
bun run dev
# or
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Social Links

Edit social media links in `config/app.config.ts`:

```typescript
socialLinks: {
  youtube: {
    url: 'https://youtube.com/@visionflowai',
    icon: 'youtube',
    label: 'YouTube',
    enabled: true,
  },
  // Add more social links...
}
```

### App Branding

Update app branding in `config/app.config.ts`:

```typescript
name: 'VisionFlow AI',
tagline: 'AI Video Generator',
description: 'Create stunning AI-generated videos from text prompts',
```

### Theme Colors

Customize the theme in `config/app.config.ts`:

```typescript
theme: {
  primary: {
    from: '#1e40af',
    to: '#3b82f6',
  },
  secondary: {
    from: '#0ea5e9',
    to: '#22d3ee',
  },
  accent: '#06b6d4',
}
```

## 🌍 Adding Languages

### 1. Add Language to Config

Edit `config/app.config.ts`:

```typescript
languages: {
  ar: {
    name: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
  },
  en: {
    name: 'English',
    dir: 'ltr',
    flag: '🇺🇸',
  },
  // Add new language here
  fr: {
    name: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
  },
}
```

### 2. Create Translation File

Create `translations/fr.json`:

```json
{
  "app": {
    "name": "VisionFlow AI",
    "tagline": "Générateur de Vidéo IA",
    "description": "Créez des vidéos IA étonnantes à partir de descriptions textuelles"
  },
  // ... add all translations
}
```

### 3. Update LanguageContext

Edit `contexts/LanguageContext.tsx`:

```typescript
import frTranslations from '@/translations/fr.json';

const translations: Record<string, any> = {
  ar: arTranslations,
  en: enTranslations,
  fr: frTranslations, // Add new language
};
```

## 📱 Pages

### Home Page (`/`)
- Centered circular logo with glow effects
- App name and tagline
- Large "Create Video" button
- Social media icons (YouTube, TikTok, Instagram, Facebook, Telegram)
- Footer with app branding

### Generate Page (`/generate`)
- Large prompt textarea with placeholder
- Scene style selector (Realistic/Cinematic/Artistic/Animated)
- Lighting selector (Natural/Dramatic/Soft/Neon)
- Aspect ratio selector (9:16/16:9/1:1)
- Generate button with loading animation
- Video preview player
- Download and fullscreen buttons

## 🎨 UI Components

The app uses Shadcn/UI components for consistency and accessibility:

- Button
- Card
- Input
- Textarea
- Select
- Toast
- And many more...

All components are fully responsive and support RTL layouts.

## 🔧 API Routes

### Video Generation API

**Endpoint:** `POST /api/video/generate`

**Request Body:**
```json
{
  "prompt": "Sunrise over the ocean with birds flying",
  "style": "cinematic",
  "lighting": "dramatic",
  "aspectRatio": "16:9"
}
```

**Response:**
```json
{
  "success": true,
  "videoUrl": "https://example.com/video.mp4",
  "metadata": {
    "prompt": "...",
    "style": "cinematic",
    "lighting": "dramatic",
    "aspectRatio": "16:9",
    "generatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Render

## 📝 Environment Variables

```env
# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# AI Services (if using external API)
AI_API_KEY=your_api_key_here
AI_API_ENDPOINT=https://api.example.com

# Database (if needed)
DATABASE_URL=your_database_url_here
```

## 🧪 Testing

Run linter to check code quality:

```bash
bun run lint
# or
npm run lint
```

## 🐛 Troubleshooting

### Language Not Switching
- Clear localStorage
- Check browser console for errors
- Ensure LanguageProvider wraps the app

### Social Links Not Working
- Verify URLs in `config/app.config.ts`
- Check if links are enabled
- Ensure target="_blank" is working

### Video Generation Failing
- Check API route is running
- Verify prompt is at least 10 characters
- Check browser console for errors

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **VisionFlow AI Team** - Development & Design

## 📞 Support

For support, email support@visionflow.ai or join our Telegram channel.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Shadcn for the beautiful UI components
- Tailwind CSS for the utility-first CSS framework
- All open source contributors

## 🔮 Future Features

- [ ] User authentication
- [ ] Video history
- [ ] Advanced video editing
- [ ] AI voiceover
- [ ] Background music integration
- [ ] Admin dashboard
- [ ] API for developers
- [ ] Mobile app (React Native)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
