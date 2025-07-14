# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js website for the Armenian Accelerationism movement (arm/acc), built with modern web technologies and a focus on performance and developer experience.

## Development Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linter

## Tech Stack & Architecture
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (configured in components.json)
- **Icons**: Lucide React
- **Package Manager**: pnpm (lockfile present)

## Key Files & Structure
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui components with Tailwind styling
- `lib/utils.ts` - Utility functions (likely includes cn helper)
- `public/` - Static assets including Armenian flag imagery
- `components.json` - shadcn/ui configuration with path aliases

## Component System
The project uses shadcn/ui components extensively. All UI components are in `components/ui/` and use:
- Tailwind CSS with CSS variables for consistent theming
- Radix UI primitives for accessibility
- Class variance authority (CVA) for component variants
- Path aliases: `@/components`, `@/lib`, `@/hooks`

## Styling Approach
- Uses Tailwind CSS with a custom theme extending the default palette
- CSS variables defined for consistent color system
- Dark theme support configured
- Custom animations for accordion components
- Gradient text effects for branding elements

## Content Structure
The main page (app/page.tsx) is a single-page application with:
- Navigation with Armenian flag branding
- Hero section with movement messaging
- Manifesto section with core principles
- Goals section outlining objectives
- Community section with social engagement
- Footer with movement branding

## Development Notes
- TypeScript configuration present
- No README.md file in root
- No test framework currently configured
- No existing CLAUDE.md file was found
- Uses modern React patterns with hooks and functional components