# Meetsy

Meetsy is an AI-powered learning platform that connects learners with matched partners and communities based on shared goals and interests.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animation**: Motion (Framer Motion) v12
- **Auth**: Clerk (sign-in, sign-up, user management, billing plans)
- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Drizzle ORM + Drizzle Kit
- **Data Fetching**: TanStack React Query v5
- **Icons**: Lucide React
- **Fonts**: Outfit (display), Inter (sans)
- **Package Manager**: Bun

## Features

- Full landing page with animated sections (Hero, Features, How It Works, Pricing, CTA)
- Scroll-triggered animations via reusable `MotionDiv` component
- Clerk authentication with sign-in and sign-up pages
- Header with navigation links (Dashboard, Community, Chat)
- Pro/Free plan badge shown in the header based on Clerk subscription plan
- User avatar and account button when signed in
- Clerk `PricingTable` embedded in the Pricing section
- Footer with copyright
- Background gradient effects per section
- Dashboard page with React Query data fetching

## Project Structure

```
app/
  layout.tsx                    # Root layout with ClerkProvider, QueryProvider, fonts, HeaderWrapper, Footer
  page.tsx                      # Home page — assembles all landing sections with MotionDiv wrappers
  (main)/
    Layout.tsx                  # Shared layout for authenticated app pages
    dashboard/page.tsx          # Dashboard page with community data fetching
  sign-in/[[...sign]]/          # Clerk sign-in page
  sign-up/[[...sign-up]]/       # Clerk sign-up page
components/
  common/
    header.tsx                  # Client header with nav, auth buttons, plan badge
    header-wrapper.tsx          # Server component that checks Clerk plan and renders Header
    footer.tsx                  # Footer with copyright
    section-heading.tsx         # Reusable heading + description block for each section
  landing/
    hero-section.tsx            # Hero with headline, CTA buttons, animated badge
    feature-section.tsx         # 6-feature grid using Card components
    how-it-works.tsx            # 4-step numbered card grid
    pricing-section.tsx         # Clerk PricingTable wrapped in a section
    cta-section.tsx             # Bottom call-to-action with sign-up link
    background-gradient.tsx     # Gradient overlays (page-wide + hero-specific)
  providers/
    query-provider.tsx          # React Query client provider with default options
  ui/
    motion-div.tsx              # Reusable scroll-triggered animation wrapper (Framer Motion)
    button.tsx                  # shadcn/ui Button
    badge.tsx                   # shadcn/ui Badge
    card.tsx                    # shadcn/ui Card
    input.tsx                   # shadcn/ui Input
    avatar.tsx                  # shadcn/ui Avatar
    skeleton.tsx                # shadcn/ui Skeleton
    textarea.tsx                # shadcn/ui Textarea
db/
  index.ts                      # Drizzle ORM instance with PostgreSQL connection pool
  schema.ts                     # Database schema (users, communities, matches, messages, etc.)
  seed.ts                       # Database seed script
lib/
  utils.ts                      # Utility helpers (cn)
drizzle.config.ts               # Drizzle Kit config
```

## Database Schema

| Table | Description |
|---|---|
| `users` | App users synced from Clerk, with subscription tier |
| `communities` | Learning communities created by users |
| `community_members` | Join table for community membership |
| `learning_goals` | Goals posted by users within a community |
| `matches` | AI-matched learning partner pairs (pending/accepted/declined) |
| `conversations` | Chat threads created from accepted matches |
| `messages` | Individual messages within a conversation |
| `conversation_summaries` | AI-generated summaries with key points and next steps |

## Getting Started

Install dependencies:

```bash
bun install
```

Set up environment variables — create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL=...
```

Push the database schema:

```bash
bun db:push
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Roadmap

### Done
- [x] Landing page — Hero, Features, How It Works, Pricing, CTA sections
- [x] Clerk authentication — Sign In / Sign Up / UserButton
- [x] Header with Free / PRO badge based on Clerk subscription plan
- [x] Scroll-triggered animations via reusable `MotionDiv` (Framer Motion v12)
- [x] Clerk `PricingTable` for subscription management
- [x] shadcn/ui component library setup
- [x] Footer
- [x] Database schema — Drizzle ORM + Neon PostgreSQL (users, communities, matches, messages, summaries)
- [x] React Query provider setup
- [x] Dashboard page scaffold with React Query data fetching

### In Progress
- [ ] `/dashboard` — match overview, joined communities, and learning progress
- [ ] `/community` — browse, search, and join learning communities
- [ ] Clerk webhook → sync users to database on sign-up

### Planned
- [ ] `/chat` — real-time messaging with matched learning partners
- [ ] User profile setup — learning goals, skill level, and topics of interest
- [ ] AI-powered learning partner matching engine
- [ ] Learning goal tracking and progress updates
- [ ] AI-generated session summaries after each chat
- [ ] Mobile navigation — hamburger menu for small screens
- [ ] Notification system — new matches, messages, and session reminders
