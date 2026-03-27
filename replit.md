# FASHLINK — Direction Créative IA

A Next.js 16 application for AI-powered creative direction, moodboards, and certification for stylists.

## Architecture

- **Framework**: Next.js 16.2.0 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Auth**: NextAuth v4 with JWT sessions and credentials provider
- **Database**: PostgreSQL via Prisma ORM
- **AI**: Anthropic Claude SDK + OpenAI (DALL-E image generation)
- **PDF**: jsPDF (client-side)
- **Animations**: Framer Motion

## Project Structure

```
src/
  app/           # Next.js App Router pages and API routes
    api/         # API routes (auth, projects, adn, partage)
    auth/        # Sign-in page
    dashboard/   # Main dashboard
    partage/     # Shared project view
  components/    # Shared React components
  lib/           # Utilities: prisma, auth, openai, anthropic, pdf
  types/         # TypeScript type definitions
prisma/
  schema.prisma  # Database schema (User, Project, AiGeneration, Illustration, Material)
```

## Required Environment Variables

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Secret for NextAuth JWT signing
- `NEXTAUTH_URL` — Full public URL of the app (e.g. https://xxx.replit.app)
- `ANTHROPIC_API_KEY` — Anthropic Claude API key
- `OPENAI_API_KEY` — OpenAI API key (DALL-E image generation)

## Running the App

```bash
npm run dev    # Dev server on port 5000
npm run build  # Production build
npm run start  # Production server on port 5000
```

## Workflow

The app runs via the "Start application" workflow: `npm run dev` on port 5000.

## Database

Run migrations after setting DATABASE_URL:
```bash
npx prisma migrate deploy
npx prisma generate
```
