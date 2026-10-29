# Intent

Product intent for the URL shortener. Read this before adding a feature, a type, or a name. Pair it with [cursor.md](./cursor.md) for how the code is written.

## Outcome

A person pastes a long destination URL and receives a short, shareable link. Opening that short link sends the visitor to the destination and records the click.

## Who it is for

- **Owner.** Creates a short link, copies it, and later checks how many times it was opened.
- **Visitor.** Opens a short link and lands on the destination with no extra step.

## Jobs

1. Accept a destination URL and reject anything that is not a safe `http` or `https` URL.
2. Issue a unique slug and show the full short URL.
3. Resolve `/{slug}` to the destination with a redirect.
4. Count each successful redirect as one click.
5. Show the owner the short URL, destination, click count, and creation time.

## Domain language

Use these names in code, routes, copy, and database fields. Do not invent a second word for the same idea.

| Concept | Name | Use it for | Do not use |
| --- | --- | --- | --- |
| The saved record | `shortLink` | Types, functions, UI copy | `link`, `url`, `item` |
| Public path token | `slug` | `/{slug}`, lookup key | `code`, `id`, `hash`, `shortCode` |
| Address the visitor should reach | `destinationUrl` | Stored target | `originalUrl`, `longUrl`, `target`, `url` |
| Address the owner shares | `shortUrl` | Display and copy action | `tinyUrl`, `alias` |
| One successful redirect | `click` | Count and analytics | `hit`, `visit`, `view` |
| When the record was created | `createdAt` | Timestamps | `date`, `timestamp` |
| When the record was last updated | `updatedAt` | Timestamps | `modified` |

A slug is the path segment only (`abc123`). A short URL is the absolute URL (`https://example.com/abc123`).

## In scope

- Create a short link from a destination URL.
- Optional custom slug when the owner supplies one and it is free.
- Redirect on `GET /{slug}`.
- Click count for each short link.
- A home screen to create a link and see the result.
- Clear errors for an invalid URL, a taken slug, and an unknown slug.

## Out of scope

Leave these out until the intent above is solid:

- Accounts, teams, and billing
- Link editing, deletion, and expiration
- Password-protected or private links
- QR codes, custom domains, and bulk import
- A public directory of every short link

## Constraints

- Redirect only to `http` and `https` URLs. Reject other schemes, including `javascript:`, `data:`, and `file:`.
- Generate slugs that are URL-safe, lowercase, and unambiguous. Omit characters that are easy to misread (`0`, `o`, `1`, `l`, `i`).
- Treat an unknown slug as not found. Do not guess a nearby slug.
- Count a click only after the short link is found and the redirect is issued.
- Keep destination URLs out of logs when they may contain query secrets.
- The owner-facing page must work without an account.

## Done when

- Creating a valid destination URL returns a unique short URL.
- Opening that short URL redirects to the same destination.
- An invalid destination URL and an unknown slug each fail with a specific message.
- The click count increases by one for each successful redirect.
- Names in the UI and the code match the table above.
