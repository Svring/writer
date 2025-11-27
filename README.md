# Better Auth + Payload CMS Template

A production-ready template combining [Payload CMS](https://payloadcms.com) and [Better Auth](https://www.better-auth.com) for building modern web applications with a powerful headless CMS and robust authentication system.

## Features

- 🔐 **Better Auth Integration** - Modern authentication with email/password support
- 📦 **Payload CMS 3.65** - Headless CMS with admin dashboard
- 🎯 **Admin Access Control** - Role-based access control (RBAC) with admin/user permissions via Better Auth admin plugin
- 🗄️ **PostgreSQL Database** - Using Drizzle ORM for type-safe database operations
- 🐰 **Bun Runtime** - Fast JavaScript runtime for development and production
- 🎨 **Modern UI** - Tailwind CSS v4 with shadcn/ui components
- 🔍 **Developer Tools** - Ultracite for linting and Drizzle Studio for database management

## Enhancements Over Original

This repository is a fork of [ElysMaldov/payload-better_auth-example](https://github.com/ElysMaldov/payload-better_auth-example) with the following additions:

- **Better Auth Admin Plugin** - Integrated admin plugin for role-based access control with admin/user permissions
- **Ultracite** - Modern linting and code formatting (`lint:check`, `lint:fix`)
- **Drizzle Studio** - Visual database GUI for PostgreSQL management (`drizzle:studio`)
- **Docker Support** - Optimized Dockerfile using Bun runtime
- **Updated Dependencies** - Next.js 16 and Payload 3.65 (latest versions)

## Technical Notes

### Build Configuration

- **Next.js Standalone Output**: Configured with `output: "standalone"` in `next.config.ts` for optimized Docker image builds
- **Webpack Build**: The `build` script uses `--webpack` flag because Payload CMS 3.65 does not support Turbopack (Next.js 16's default bundler)

### Versions

- **Next.js 16** - Latest version with App Router
- **Payload CMS 3.65** - Latest version (Turbopack support coming in future releases)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- PostgreSQL database

### Installation

```bash
# Clone and install
git clone https://github.com/your-username/better-auth-payload.git
cd better-auth-payload
bun install

# Configure environment
cp .env.example .env
# Edit .env with DATABASE_URI and PAYLOAD_SECRET

# Generate Payload schema
bun run payload:schema

# Start development server
bun run dev
```

### Available Scripts

- `dev` - Start development server
- `build` - Build for production (uses Webpack)
- `start` - Start production server
- `lint:check` / `lint:fix` - Code linting with Ultracite
- `payload:schema` - Generate Payload database schema
- `drizzle:studio` - Open Drizzle Studio GUI
- `build:mac` / `build:linux` - Build Docker images

## Admin Access Control

The admin plugin (`src/auth/auth.ts`) provides role-based access:

- **Admin Role**: Full access (`adminDashboard: ["read"]`)
- **User Role**: No admin access (`adminDashboard: []`)

Payload collections check for admin permissions before allowing access. Grant admin access by ensuring users have `adminDashboard: ["read"]` permission in Better Auth.

## Docker Deployment

Next.js is configured with `output: "standalone"` for optimized Docker builds:

```bash
# Build Docker image
bun run build:mac      # macOS
bun run build:linux    # Linux/AMD64

# Run container
docker run -p 3000:3000 better-auth-payload:latest
```

The Dockerfile uses multi-stage builds with Bun runtime for optimal performance.

## Environment Variables

```env
# Payload & Drizzle
DATABASE_URI=postgresql://user:password@localhost:5432/dbname
PAYLOAD_SECRET=random-secret-for-payload

# Better Auth
BETTER_AUTH_SECRET=random-secret-for-better-auth
BETTER_AUTH_URL=http://localhost:3000
```

## Credits

Based on [ElysMaldov/payload-better_auth-example](https://github.com/ElysMaldov/payload-better_auth-example).

## License

MIT
