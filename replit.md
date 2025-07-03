# Tiruvannamalai Girivalam Helper - Replit Documentation

## Overview

This is a mobile-first spiritual journey companion web application designed for pilgrims visiting Tiruvannamalai for the sacred Girivalam (circumambulation). The app provides GPS navigation, hotel booking, food location services, emergency support, and spiritual audio guides in both Tamil and English.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state
- **UI Framework**: Shadcn/ui components with Tailwind CSS
- **Build Tool**: Vite with hot module replacement
- **Cultural Design**: Custom saffron/orange theme reflecting Indian spiritual aesthetics

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **Authentication**: Replit Auth (OpenID Connect)

### Database Architecture
- **Database**: PostgreSQL (Neon serverless)
- **Schema Location**: `shared/schema.ts` (shared between client/server)
- **Migration Tool**: Drizzle Kit
- **Connection**: Connection pooling with @neondatabase/serverless

## Key Components

### Authentication System
- **Provider**: Replit Auth with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Model**: Supports email, profile images, and basic user data
- **Protection**: Route-level authentication middleware

### Core Features
1. **Girivalam Navigation**: GPS-based route tracking with checkpoints
2. **Hotel Booking System**: Browse and book accommodations near the temple
3. **Food Services**: Locate Annadhanam (free food) and restaurants
4. **Emergency SOS**: Location-based emergency alerts
5. **Audio Guides**: Spiritual content in Tamil and English
6. **Donation Platform**: UPI-based temple and service donations

### Mobile-First Design
- **Responsive**: Optimized for mobile devices with touch interactions
- **Bottom Navigation**: Tab-based navigation pattern
- **Cultural Theming**: Saffron, gold, and red color scheme
- **Bilingual Support**: Tamil and English language toggle

## Data Flow

### Client-Server Communication
1. **API Requests**: Centralized through `lib/queryClient.ts`
2. **Error Handling**: Unified 401 handling with automatic redirects
3. **State Caching**: React Query manages server state with smart caching
4. **Real-time Updates**: Optimistic updates for booking operations

### Database Operations
1. **User Management**: CRUD operations for user profiles
2. **Hotel Bookings**: Transactional booking system with conflict prevention
3. **Location Services**: Geospatial queries for nearby services
4. **Emergency Alerts**: Real-time SOS alert creation and management

### Authentication Flow
1. **Login**: Redirect to Replit OAuth provider
2. **Callback**: JWT validation and session creation
3. **Session**: PostgreSQL-stored sessions with 7-day expiry
4. **Protection**: Middleware validates sessions on protected routes

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Query
- **UI Components**: Radix UI primitives, Lucide icons
- **Styling**: Tailwind CSS with CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Services
- **Database**: Neon PostgreSQL (serverless)
- **Authentication**: Replit Auth service
- **File Storage**: Public asset serving through Express static
- **Session Store**: PostgreSQL session management

### Development Tools
- **Build**: Vite with React plugin and runtime error overlay
- **TypeScript**: Strict configuration with path mapping
- **Linting**: ESBuild for server bundling
- **Hot Reload**: Vite HMR with server restart detection

## Deployment Strategy

### Production Build
- **Client**: Vite builds React app to `dist/public`
- **Server**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static file serving for images and public resources
- **Environment**: Production mode with optimized builds

### Replit Configuration
- **Modules**: Node.js 20, Web server, PostgreSQL 16
- **Ports**: Application runs on port 5000, external port 80
- **Database**: Auto-provisioned PostgreSQL with connection string
- **Deployment**: Autoscale deployment target with build commands

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (auto-provisioned)
- **SESSION_SECRET**: Session encryption key
- **REPLIT_DOMAINS**: Allowed domains for CORS
- **ISSUER_URL**: OpenID Connect issuer (defaults to Replit)

## Changelog

Changelog:
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.