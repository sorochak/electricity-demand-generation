# React + TypeScript Frontend

This directory contains the frontend for the Electricity Demand & Generation application. It is a React + TypeScript app powered by Vite, with support for Leaflet maps, data visualization, and a modern MUI-based UI.

## Features

- Type-safe React components using TypeScript
- Leaflet map integration
- MUI (Material UI) components
- Fast Vite-based development with hot reload
- ESLint for linting and best practices

## Development Setup

From the `frontend/` directory:

```bash
npm install
npm run dev
```

The app will be available at http://localhost:5173.

## TypeScript Notes

- Type definitions are included for React, Leaflet, and other dependencies.
- Components are written using `React.FC` with typed props and hooks.
- `tsconfig.json` is configured for strict typing and bundler-compatible module resolution.

## Project Structure

```text
src/
├── components/       # React components (e.g. Map.tsx)
├── App.tsx           # Main app entry
└── main.tsx          # Mount point and Leaflet CSS
```
