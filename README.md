# ToolBay

The fastest online toolkit — free tools for everyone. Built with Next.js, React, and TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js (App Router), React 19, TypeScript
- **UI:** Tailwind CSS, shadcn/ui, Lucide, Framer Motion
- **State:** Zustand (favorites, history, command palette)
- **Forms:** React Hook Form + Zod
- **Database:** Prisma + PostgreSQL (future)
- **Auth:** NextAuth/Auth.js (future)

## Project Structure

```
app/           → Next.js App Router pages
components/    → React components (layout, home, tools, shared, ui)
lib/           → Utilities, SEO helpers, tool registry
hooks/         → Reusable React hooks
types/         → TypeScript interfaces
utils/         → Domain helpers (URLs, formatting)
services/      → Tool & category data registries
stores/        → Zustand state management
prisma/        → Database schema
public/        → Static assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check |

## Adding a New Tool

1. Define the tool in `services/tools.ts`
2. Create the component in `components/tools/<category>/`
3. Register it in `components/tools/tool-renderer.tsx`
4. Add an icon key in `lib/icons.ts` if needed

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | Open command palette |
| `⌘D` | Toggle dark mode |

## Deploy

Deploy to Vercel (recommended for Next.js):

```bash
npx vercel login
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL=https://toolbay.in` in the Vercel project environment for Production, Preview, and Development as needed.

## License

MIT
