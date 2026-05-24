# Meetsy

Meetsy is an AI learning platform to connect with other learners in the community.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Auth**: Clerk (sign-in, sign-up, user management, billing plans)
- **Icons**: Lucide React
- **Package Manager**: Bun

## Features

- Clerk authentication with sign-in and sign-up pages
- Header with navigation links (Dashboard, Community, Chat)
- Pro/Free plan badge shown in the header based on Clerk subscription plan
- User avatar and account button when signed in
- Pricing table on the home page

## Project Structure

```
app/
  layout.tsx            # Root layout with ClerkProvider and HeaderWrapper
  page.tsx              # Home page with Clerk PricingTable
  sign-in/[[...sign]]/  # Clerk sign-in page
  sign-up/[[...sign-up]]/ # Clerk sign-up page
components/
  common/
    header.tsx          # Client header with nav, auth buttons, plan badge
    header-wrapper.tsx  # Server component that checks Clerk plan and renders Header
  ui/                   # shadcn/ui components (button, badge, card, input, etc.)
lib/
  utils.ts              # Utility helpers (cn)
```

## Getting Started

Install dependencies:

```bash
bun install
```

Set up environment variables — create a `.env.local` file with your Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
