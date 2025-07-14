# Armenian Accelerationism Website (arm/acc)

A modern, responsive website for the Armenian Accelerationism movement - a decentralized initiative accelerating Armenia's transformation into a global technology hub.

## 🌟 Overview

The Armenian Accelerationism movement (arm/acc) is radically optimistic about Armenia's future as a technological powerhouse. This website serves as the digital home for the movement, featuring our manifesto, goals, and community engagement platform.

## 🚀 Features

- **Modern Design**: Built with Next.js 15 and Tailwind CSS for a sleek, performant experience
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive UI**: Powered by shadcn/ui components and Radix UI primitives
- **Accessibility**: Built with accessibility best practices using ARIA-compliant components
- **Theme Support**: Dark theme with Armenian flag-inspired color scheme (red, blue, orange)
- **Performance**: Optimized for speed with Next.js App Router and modern React patterns

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS variables for theming
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) component library
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript for type safety
- **Package Manager**: pnpm for efficient dependency management

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── theme-provider.tsx # Theme configuration
├── hooks/                 # Custom React hooks
├── lib/
│   └── utils.ts          # Utility functions (includes cn helper)
├── public/               # Static assets
│   └── armenian-flag.png # Movement branding
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🏁 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:0xpaperhead/armacc-website.git
   cd armacc-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linter for code quality

### Adding New Components

The project uses shadcn/ui components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Components are automatically configured with the project's theme and styling.

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Leverage CSS variables defined in `app/globals.css` for consistent theming
- Follow the Armenian flag color scheme: red (`red-400`), blue (`blue-400`), orange (`orange-400`)
- Use gradient text effects for branding elements

## 🎨 Design System

### Color Palette

- **Primary**: Red (#f87171) - Represents strength and heritage
- **Secondary**: Blue (#60a5fa) - Represents innovation and technology  
- **Accent**: Orange (#fb923c) - Represents optimism and acceleration
- **Background**: Black/Gray tones for modern tech aesthetic

### Typography

- **Headings**: Bold, gradient text effects using Armenian flag colors
- **Body**: Clean, readable text with proper contrast ratios
- **Code**: Monospace font with syntax highlighting

## 🌍 Content Structure

### Main Sections

1. **Hero Section**: Movement introduction and call-to-action
2. **Stats Section**: Key movement metrics and symbols
3. **Manifesto**: Core principles and values
4. **Goals**: Specific objectives and initiatives
5. **Community**: Engagement and participation guidelines
6. **Footer**: Movement branding and contact information

### Key Principles

- **Radical Optimism**: Delusionally optimistic about Armenia's tech future
- **Inclusive Community**: Being Armenian is a choice, not just ancestry
- **Global Impact**: Supporting Armenians worldwide
- **Meritocracy**: Preferring merit over bureaucracy

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables

No environment variables are required for basic functionality.

### Platform Deployment

The application is optimized for deployment on:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- [AWS](https://aws.amazon.com)
- Any Node.js hosting platform

## 🤝 Contributing

We welcome contributions from the community! Please feel free to:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Submit a pull request**

### Development Guidelines

- Follow existing code style and patterns
- Use TypeScript for type safety
- Test changes across different devices and browsers
- Ensure accessibility compliance
- Follow the established design system

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [Live Site](https://armacc-website.vercel.app) (when deployed)
- **Repository**: [GitHub](https://github.com/0xpaperhead/armacc-website)
- **Movement**: Learn more about Armenian Accelerationism

## 🎯 Mission

> "We are radically – even delusionally – optimistic about Armenia's future. We see Armenia emerging as a major technological hub and believe in accelerating this transformation."

Join the movement. Add `arm/acc` or `🇦🇲/acc` to your bio. Build the future.

---

**Built with ❤️ for Armenia's tech future**

*Decentralized. Open. Building the future.*