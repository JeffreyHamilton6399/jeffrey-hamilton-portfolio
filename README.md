# Portfolio

My personal site — projects, work history, certificates, and a contact form.
Built with Next.js and deployed on Vercel.

## Running locally

```bash
bun install
bun run dev
```

The site runs at http://localhost:3000.

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS v4 with shadcn/ui components
- Framer Motion for section transitions
- TypeScript throughout

## Layout

```
src/
  app/
    page.tsx              single-page layout, composes the sections below
    api/contact/route.ts  validates and handles contact form submissions
  components/portfolio/   one component per section (hero, about, projects, ...)
  lib/portfolio-data.ts   all site content — projects, jobs, education, links
public/                   images, certificates, animation demos
```

Content lives in `src/lib/portfolio-data.ts` rather than in the components, so
adding a project or a job is a single edit to one file.

## Contact form

`POST /api/contact` takes `{ name, email, message }` and validates all three
server-side before doing anything with them. There is no database — submissions
are handled in the route.

## License

MIT — see [LICENSE](LICENSE).
