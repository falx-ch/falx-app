# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro web application built with React, Tailwind CSS, and TypeScript. The project uses a modern web development stack with hot reloading and component-based architecture.

## Development Commands

- `pnpm dev` - Start the development server with hot reloading
- `pnpm build` - Build the project for production
- `pnpm preview` - Preview the production build locally
- `pnpm astro` - Run Astro CLI commands

## Architecture

### Framework Stack
- **Astro 5** - Static site generator with component islands
- **React 19** - UI components with JSX
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety with strict configuration

### Project Structure
- `src/components/` - Reusable Astro and React components
- `src/layouts/` - Page layout templates
- `src/pages/` - File-based routing (Astro pages and markdown)
- `src/lib/` - Utility functions and shared logic
- `src/styles/` - Global CSS and Tailwind configuration

### Key Configurations
- **Astro Config**: React integration enabled, Tailwind CSS via Vite plugin
- **TypeScript**: Strict mode with path aliases (`@/*` maps to `./src/*`)
- **Component System**: Supports shadcn/ui components via `components.json`

### Styling Approach
- Tailwind CSS 4 with CSS variables for theming
- `cn()` utility function for conditional classes (clsx + tailwind-merge)
- Global styles in `src/styles/global.css`

### Component Patterns
- Mix of Astro components (`.astro`) and React components
- Use of canvas-confetti for interactive effects
- Lucide React icons for consistent iconography