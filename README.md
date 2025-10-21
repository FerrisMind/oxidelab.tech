# 🚀 Modern Landing Page

A modern landing page built with Next.js 15 using cutting-edge technologies to create an impressive user experience.

## ✨ Features

- **⚡ Next.js 15** with Turbopack for lightning-fast development
- **🎨 Modern UI** with Tailwind CSS and Radix UI components
- **🌙 Dark/Light theme** with smooth transitions
- **🌍 Internationalization** with localization support
- **🎭 Animations** powered by Framer Motion for a lively interface
- **📱 Responsive design** for all devices
- **🔒 TypeScript** for code reliability
- **🎯 SEO optimization** out of the box

## 🛠 Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Typed JavaScript

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible components
- **Framer Motion** - Animations and transitions
- **Phosphor Icons** - Modern icons
- **React Three Fiber** - 3D graphics

### Additional Features
- **Better Auth** - Authentication
- **Drizzle ORM** - Database
- **React Hook Form** - Forms
- **Zod** - Schema validation
- **Stripe** - Payments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Bun (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd app

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                 # App Router pages
├── components/          # Reusable components
│   └── ui/             # UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utilities and configuration
├── locales/            # Localization files
├── styles/             # Global styles
└── visual-edits/       # Visual editing
```

## 🎨 Customization

### Themes
The project supports dark and light themes. Settings are located in:
- `src/components/ThemeToggle.tsx`
- `tailwind.config.js`

### Localization
Add new languages in:
- `src/locales/` - translation files
- `src/components/ui/language-selector.tsx` - language selector

### Components
UI components are located in `src/components/ui/` and built with Radix UI and Tailwind CSS.

## 📦 Scripts

```bash
# Development with Turbopack
bun dev

# Build for production
bun build

# Start production server
bun start

# Linting
bun lint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically

### Other Platforms
The project is compatible with any Node.js hosting platform:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Configuration

### Environment Variables
Create `.env.local`:

```env
# Database
DATABASE_URL=

# Authentication
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# Stripe (optional)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Database Setup
```bash
# Generate migrations
bun db:generate

# Apply migrations
bun db:migrate
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🆘 Support

If you have questions or issues:
- Create an Issue in the repository
- Check the Next.js documentation
- Reach out to the community

---

Made with ❤️ and modern technologies