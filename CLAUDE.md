# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with React, TypeScript, and Tailwind CSS v4. Single-page application (SPA) showcasing professional profile, skills, and contact information. Deployed to GitHub Pages at https://dias-oblivion.github.io/portfolio.

## Build & Development Commands

```bash
# Start development server with HMR
npm run dev

# Production build (TypeScript compilation + Vite build)
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Single Component Structure

The entire application is contained in a single React component (`src/App.tsx`). This is a portfolio site with:
- No routing library (uses smooth scroll to sections)
- No state management library (uses React hooks)
- All UI components defined inline as functions within the main Portfolio component
- Dynamic CSS animations injected via `useEffect` hook

### Key Components (within App.tsx)

- `Portfolio` - Main component containing all sections
- `AnimatedBackground` - Background animations with dots, orbs, and beams
- `GhibliCard` - Reusable card component with gradient effects
- Navigation - Fixed navbar with smooth scroll functionality via `scrollToSection()`

### Sections

Page sections are identified by IDs: `home`, `skills`, `projects`, `contact`. Navigation uses `element.scrollIntoView()` for smooth scrolling rather than URL hash changes.

## Styling

Uses **Tailwind CSS v4** (note: v4 syntax differs from v3). The Tailwind plugin is integrated via Vite config, not PostCSS. Custom animations are defined inline within components using JavaScript-injected `<style>` tags rather than in CSS files.

## GitHub Pages Configuration

- Base path is `/portfolio/` (configured in vite.config.ts)
- Build output goes to `dist/` directory
- Deployment uses `gh-pages` package
- Always run `npm run build` before deploying to ensure latest changes

## TypeScript Configuration

Uses TypeScript project references with separate configs:
- `tsconfig.json` - Root config with references
- `tsconfig.app.json` - Application code (src/)
- `tsconfig.node.json` - Vite config files

Strict mode is enabled with additional linting rules (`noUnusedLocals`, `noUnusedParameters`).

## Content Notes

- Portuguese language content (Brazilian Portuguese)
- Profile uses GitHub avatar from dias-oblivion account
- Workspace preview uses animated GIF from GitHub profile
- Projects section currently shows "under construction" placeholder
