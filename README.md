# Casket Diaries

A modern web application built with React, Express, and TypeScript, featuring a robust full-stack architecture with real-time capabilities.

## 🚀 Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **TailwindCSS** for styling
- **Shadcn UI** components (via Radix UI)
- **React Query** for data fetching
- **Wouter** for routing
- **React Hook Form** for form handling
- **Zod** for validation
- **Framer Motion** for animations

### Backend

- **Express.js** server with TypeScript
- **WebSocket** support for real-time features
- **Passport.js** for authentication
- **PostgreSQL** with Drizzle ORM
- **Session management** with express-session

## 📁 Project Structure

├── client/ # Frontend application
│ ├── src/ # Source code
│ └── index.html # Entry HTML file
│
├── server/ # Backend application
│ ├── index.ts # Server entry point
│ ├── routes.ts # API routes
│ ├── storage.ts # Database operations
│ └── vite.ts # Vite configuration for production
│
├── shared/ # Shared code between client and server
│
└── configuration files # Various config files for the project

## 🛠️ Setup and Installation

1. **Prerequisites**
   - Node.js (Latest LTS version recommended)
   - PostgreSQL database

2. **Installation**

   ```bash
   # Install dependencies
   npm install
   ```

3. **Database Setup**

   ```bash
   # Push database schema
   npm run db:push
   ```

4. **Development**

   ```bash
   # Start development server
   npm run dev
   ```

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type-check TypeScript
- `npm run db:push` - Update database schema

## 🔧 Configuration

The project uses various configuration files:

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - TailwindCSS configuration
- `drizzle.config.ts` - Database configuration
- `tsconfig.json` - TypeScript configuration
- `theme.json` - UI theme configuration

## 🏗️ Architecture

### Frontend

- Built with React and TypeScript
- Utilizes modern React patterns and hooks
- Component library built on Radix UI primitives
- Responsive design with TailwindCSS
- State management with React Query
- Form handling with React Hook Form and Zod validation

### Backend

- Express.js server with TypeScript
- RESTful API architecture
- WebSocket support for real-time features
- Session-based authentication with Passport.js
- Database operations using Drizzle ORM
- Production-ready configuration with proper error handling

## 🔐 Security Features

- Session-based authentication
- PostgreSQL session store
- CSRF protection
- Secure password handling
- Input validation with Zod

## 🚀 Deployment

The application is built for production using:

```bash
npm run build
```

This creates:

- Optimized client bundle using Vite
- Bundled server code using esbuild
- Production-ready assets in the `dist` directory

---
