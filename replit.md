# FASHLINK — Direction Créative IA

A complete Next.js SaaS application for AI-powered creative direction for fashion stylists. All UI text in French.

## Tech Stack

- **Next.js 16.2.0** (App Router, TypeScript)
- **Tailwind CSS v4** (no component library)
- **Framer Motion** — page animations, hover effects
- **NextAuth.js v4** (credentials provider, JWT sessions)
- **Prisma v5 + PostgreSQL** (Replit built-in DB)
- **Anthropic Claude** (`claude-sonnet-4-20250514`) — direction, storytelling, ADN, materials
- **OpenAI** (GPT-4 Vision + DALL·E 3) — sketch-to-illustration
- **jsPDF** — client-side PDF export (materials + certificate)
- **next/font** (Unbounded + Montserrat 600)

## Design System

- Background: `#FFFFFF`, Text: `#000000`
- Zero border-radius everywhere
- Zero box-shadows, zero gradients
- Heading: Unbounded (`--font-heading`)
- Body: Montserrat 600 (`--font-body`)
- Buttons: black bg / white text, sharp corners, uppercase
- Cards: white bg, 1px solid black border
- Cursor: crosshair

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Global fonts + SessionProvider
│   ├── page.tsx                      # Landing page
│   ├── globals.css
│   ├── auth/signin/page.tsx          # Sign in
│   ├── auth/signup/page.tsx          # Sign up
│   ├── dashboard/
│   │   ├── layout.tsx                # Protected, sidebar
│   │   ├── page.tsx                  # Dashboard home
│   │   ├── profil/page.tsx           # ADN form (3-step)
│   │   ├── projets/page.tsx          # Projects grid
│   │   ├── projets/nouveau/page.tsx  # Create project
│   │   └── projets/[id]/page.tsx     # Project detail (6 tabs)
│   ├── partage/[token]/page.tsx      # Public share page
│   └── api/
│       ├── auth/[...nextauth]/       # NextAuth handler
│       ├── auth/signup/              # User registration
│       ├── adn/generate/             # Claude ADN synthesis
│       ├── adn/me/                   # Current user ADN
│       └── projects/
│           ├── route.ts              # GET/POST projects
│           └── [id]/
│               ├── route.ts          # GET/DELETE project
│               ├── generate-direction/
│               ├── generate-storytelling/
│               ├── generate-illustration/
│               ├── generate-materials/
│               ├── generations/
│               ├── share/
│               └── illustration/[illustrationId]/
├── components/
│   ├── SessionProvider.tsx
│   ├── ui/                           # Button, Input, Card, Badge, Tabs, Modal, Spinner, Toast, StepIndicator
│   ├── layout/                       # Logo, Sidebar, TopBar
│   └── features/                     # AdnForm, DirectionCard, StorytellingCard, SketchUploader, IllustrationResult, MaterialInventory, CertificatePreview, ColorPalette, GenerationsTimeline
└── lib/
    ├── prisma.ts
    ├── auth.ts
    ├── anthropic.ts
    ├── openai.ts
    └── pdf.ts
prisma/schema.prisma                  # User, Project, AiGeneration, Illustration, Material
```

## Required Secrets

- `NEXTAUTH_SECRET` — random string for JWT signing
- `ANTHROPIC_API_KEY` — for Claude API calls
- `OPENAI_API_KEY` — for DALL·E 3 + GPT-4 Vision

## Dev Server

Runs on port 5000 via `npm run dev`.
