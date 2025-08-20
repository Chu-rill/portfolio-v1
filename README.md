# Dark-First React Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a dark-first design with theme toggle, smooth animations, and excellent SEO.

## ✨ Features

- **Dark-First Design**: Defaults to dark mode with persistent theme switching
- **Fully Responsive**: Mobile-first design that looks great on all devices  
- **Smooth Animations**: Powered by Framer Motion with reduced motion support
- **SEO Optimized**: Complete meta tags, structured data, and Open Graph support
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Fast Performance**: Built with Vite for lightning-fast development and optimized builds
- **TypeScript**: Fully typed for better development experience
- **Modern Stack**: React 19, Tailwind CSS, and latest web technologies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── common/          # Reusable components
│   ├── nav/             # Navigation components
│   ├── hero/            # Hero section
│   ├── about/           # About section
│   ├── projects/        # Projects showcase
│   ├── tech/            # Skills & technologies
│   ├── experience/      # Work experience
│   ├── contact/         # Contact form
│   └── footer/          # Footer
├── data/                # JSON data files
├── pages/               # Page components
├── theme/               # Theme provider
├── types/               # TypeScript types
└── assets/              # Static assets
```

## 🎨 Customization

### Personal Information
Edit the JSON files in `src/data/` to customize your portfolio:

- `profile.json` - Personal info, contact details, social links
- `projects.json` - Your projects and portfolio pieces  
- `experience.json` - Work experience and achievements
- `skills.json` - Technologies and skill levels

### Styling
The design system is built with Tailwind CSS:

- Colors defined in `tailwind.config.js`
- Custom components in `src/index.css`
- Dark/light theme toggle in `src/theme/ThemeProvider.tsx`

## 🛠️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 SEO Features

- Dynamic meta tags with React Helmet
- Structured data for search engines
- Open Graph and Twitter Card support
- Sitemap friendly routing
- Performance optimized

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast colors
- Reduced motion preferences
- Screen reader friendly

## 🤝 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **SEO**: React Helmet Async

---

**Built with ❤️ and lots of coffee ☕**
