# VisionFlow AI - Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ or Bun
- Git (optional)

### Installation Steps

1. **Navigate to project directory:**
```bash
cd /home/z/my-project
```

2. **Install dependencies (if not already installed):**
```bash
bun install
```

3. **Run development server:**
```bash
bun run dev
```

4. **Open your browser:**
Navigate to: `http://localhost:3000`

That's it! The application is now running.

---

## 📁 Project Structure Quick View

```
visionflow-ai/
├── src/
│   ├── app/              # Pages and API routes
│   ├── components/       # Reusable components
│   ├── contexts/         # React contexts (Language)
│   ├── config/           # App configuration
│   ├── translations/     # Language files
│   ├── hooks/            # Custom hooks
│   └── lib/              # Utilities
├── public/               # Static assets (logo, etc.)
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind config
├── README.md             # Full documentation
└── PROJECT_SUMMARY.md    # Project overview
```

---

## ⚙️ Quick Customization

### Change Social Links
Edit: `src/config/app.config.ts`

```typescript
socialLinks: {
  youtube: {
    url: 'https://youtube.com/yourchannel',
    icon: 'youtube',
    label: 'YouTube',
    enabled: true,
  },
  // ... edit other links
}
```

### Change App Name/Branding
Edit: `src/config/app.config.ts`

```typescript
name: 'Your App Name',
tagline: 'Your Tagline',
description: 'Your description',
```

### Change Theme Colors
Edit: `src/config/app.config.ts`

```typescript
theme: {
  primary: {
    from: '#your-color-1',
    to: '#your-color-2',
  },
}
```

---

## 🌍 Adding a New Language

### 1. Add to Config
Edit `src/config/app.config.ts`:
```typescript
languages: {
  fr: {
    name: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
  },
}
```

### 2. Create Translation File
Create `src/translations/fr.json`:
```json
{
  "app": {
    "name": "VisionFlow AI",
    "tagline": "Générateur de Vidéo IA"
  }
}
```

### 3. Update Context
Edit `src/contexts/LanguageContext.tsx`:
```typescript
import frTranslations from '@/translations/fr.json';

const translations = {
  ar: arTranslations,
  en: enTranslations,
  fr: frTranslations,
};
```

That's it! The new language will appear in the language switcher.

---

## 🧪 Run Linter

Check code quality:
```bash
bun run lint
```

---

## 📦 Build for Production

```bash
bun run build
```

---

## 🚢 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import from GitHub
5. Click "Deploy"

That's it! Your app is live.

---

## 🐛 Troubleshooting

### Page Not Loading
- Check if dev server is running
- Clear browser cache
- Check browser console for errors

### Language Not Switching
- Clear localStorage
- Refresh page
- Check console for errors

### Social Links Not Working
- Verify URLs in config file
- Check if links are enabled
- Ensure `target="_blank"` is working

### Build Errors
- Run `bun run lint` to check for errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && bun install`

---

## 📚 More Information

- Full documentation: `README.md`
- Project overview: `PROJECT_SUMMARY.md`
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
- Shadcn/UI docs: https://ui.shadcn.com

---

## 🎯 Quick Reference

### Pages
- Home: `/`
- Generate Video: `/generate`

### API Routes
- Generate Video: `POST /api/video/generate`

### Key Files
- Config: `src/config/app.config.ts`
- Translations: `src/translations/*.json`
- Styles: `src/app/globals.css`
- Layout: `src/app/layout.tsx`

---

## 💡 Tips

1. **Hot Reload:** The dev server automatically reloads when you save changes
2. **Environment Variables:** Create `.env.local` for sensitive data
3. **Images:** Place images in `public/` folder
4. **Components:** Use existing shadcn/ui components from `src/components/ui/`

---

## 🎉 You're Ready!

VisionFlow AI is now set up and running. Start customizing and building!

For detailed information, see `README.md` and `PROJECT_SUMMARY.md`.

---

*Happy Coding! 🚀*
