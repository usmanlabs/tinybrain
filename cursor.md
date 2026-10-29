# Cursor

How to change this app. Read [intent.md](./intent.md) first, then follow the names and practices below. This file applies to every change in this project.

## Stack

- Next.js 16 App Router, React 19, TypeScript (`strict`), Tailwind CSS 4
- Path alias: `@/*` maps to the project root
- Scripts: `npm run dev`, `npm run lint`, `npm run build`

This Next.js version can differ from older training data. Before using a Next.js API, read the matching guide in `node_modules/next/dist/docs/` and follow deprecation notices. `AGENTS.md` points at the same docs.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`. Leave both on unless a task explicitly changes caching.

## Layout

Keep the App Router files at the project root. Do not introduce a `src/` directory.

```text
app/
  layout.tsx
  page.tsx
  globals.css
  not-found.tsx
  [slug]/
    route.ts
components/
  short-link-form.tsx
  short-link-result.tsx
lib/
  short-links.ts
  slug.ts
types/
  short-link.ts
```

- `app/` holds routes only. Special files keep Next.js names: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`.
- `components/` holds UI. One component per file.
- `lib/` holds framework-free logic: validation, slug generation, storage.
- `types/` holds shared types. Colocate a type in its module when only that module uses it.
- Route groups, when needed, use a purpose name: `(marketing)`, `(short-links)`.
- Dynamic segments use the domain name: `app/[slug]/route.ts`. In this Next.js version, `params` is a `Promise`. Await it.

```ts
export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
}
```

## Naming

Names come from the domain table in [intent.md](./intent.md). Use `shortLink`, `slug`, `destinationUrl`, `shortUrl`, `click`, `createdAt`, and `updatedAt`.

| Kind | Pattern | Example |
| --- | --- | --- |
| Folders and non-component files | kebab-case | `lib/short-links.ts` |
| React component files | kebab-case, matching the component | `components/short-link-form.tsx` |
| React components | PascalCase | `ShortLinkForm` |
| Functions | camelCase, verb first | `createShortLink`, `getShortLinkBySlug` |
| Hooks | `use` + PascalCase remainder | `useShortLink` |
| Types | PascalCase, no `I` or `T` prefix | `ShortLink`, `CreateShortLinkInput` |
| Booleans | `is`, `has`, `can`, or `should` | `isSlugTaken` |
| Component handlers | `handle` + event | `handleSubmit` |
| Callback props | `on` + event | `onCreate` |
| Module constants | SCREAMING_SNAKE_CASE | `SLUG_LENGTH` |
| Environment variables | SCREAMING_SNAKE_CASE | `DATABASE_URL` |

```ts
// Preferred
export async function createShortLink(input: CreateShortLinkInput): Promise<ShortLink> {}

// Avoid
export async function add(data: any): Promise<ILink> {}
```

- Pluralize collections and modules that own many records: `short-links.ts`, `getShortLinks`.
- Singularize a single record and its component: `ShortLink`, `ShortLinkResult`.
- Prefix a private helper with a verb, not an underscore.
- Name server actions after the mutation: `createShortLink`. Keep them in `lib/` or a colocated `actions.ts`, and mark the file with `"use server"` only when it exports actions.

## TypeScript

- Prefer `type` for object shapes. Use `interface` when a type is meant to be extended.
- Type exported functions with explicit parameters and return types.
- Import types with `import type`.
- Use `unknown` in catch clauses and narrow it. Do not use `any`.
- Use a discriminated union for results that can fail:

```ts
type CreateShortLinkResult =
  | { ok: true; shortLink: ShortLink }
  | { ok: false; error: "invalid_destination_url" | "slug_taken" };
```

- Error codes are snake_case string unions, not free-form messages. Map a code to UI copy in the component.

## React and Next.js

- Server Components are the default. Add `"use client"` only for state, effects, or browser events, and keep that file small.
- Fetch and mutate on the server. Validate `destinationUrl` in `lib/` before writing it.
- Redirect with the platform `Response` (`status` 307 for a temporary redirect). Do not bounce through a client page.
- An unknown slug returns 404. Use `not-found.tsx` for the page case.
- Give every interactive control an accessible name. Pair each input with a `<label>`.
- Use `next/image` for images and `next/font` for fonts already set in `app/layout.tsx`.
- Do not add a new UI library, data library, or global state library for a single screen.

## Tailwind

- Style with utilities in the component. Keep `app/globals.css` for tokens and the base layer.
- Reuse the existing tokens: `background`, `foreground`, `--font-geist-sans`, `--font-geist-mono`.
- Support light and dark through the existing `prefers-color-scheme` setup.
- Extract a component when a class string is copied, rather than adding a one-off `@apply` rule.

## Data and safety

- Validate the destination with the URL parser. Allow only `http:` and `https:`.
- Normalize the slug to lowercase before lookup so `AbC` and `abc` cannot diverge.
- Generate slugs with a URL-safe alphabet that omits `0`, `o`, `1`, `l`, and `i`.
- Make create idempotent on a caller-supplied slug: the same free slug returns the existing row or a `slug_taken` error, never a duplicate.
- Do not log full destination URLs.

## Change bar

- Match the surrounding file. This project uses semicolons, double quotes, and 2-space indent.
- One concern per change. Leave unrelated files untouched.
- Run `npm run lint` after a code change. Run `npm run build` when a change touches routing, config, or types.
- A new dependency needs a reason tied to [intent.md](./intent.md).
