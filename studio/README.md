# Milestones Clinic — Blog Studio

Sanity Studio for the blog on [milestoneschildclinic.com](https://milestoneschildclinic.com).

This is the editing interface only. The website reads content directly from Sanity's
hosted API — the Express backend in `../server` is not involved in the blog at all.

**Requires Node.js 22.12 or newer** (Sanity v6). Dependencies are already installed.

> This package runs React 19, while `../frontend` runs React 18. That is intentional
> and safe — they are separate packages with separate `node_modules`. Do not try to
> align them.

## Setup

Steps 1–2 need a browser and a Sanity account, so they have to be done by hand.

1. **Log in and create the project:**

   ```bash
   cd studio
   npx sanity login          # opens a browser
   npx sanity init --env
   ```

   When `init` asks, choose **Create new project**, name it `Milestones Child Clinic`,
   use the default dataset `production`, and answer **No** to adding sample schema —
   the schema in `schemaTypes/` is already written and must not be overwritten.

   The `--env` flag writes the project ID into a `.env` file for you. If you ever need
   it again it is also shown at [manage.sanity.io](https://www.sanity.io/manage).

2. **Allow the website to read the content.** At
   [manage.sanity.io](https://www.sanity.io/manage) → your project → **API** →
   **CORS origins**, add these three, all with credentials **disabled**:

   - `http://localhost:3000`
   - `https://<your-project>.vercel.app`
   - `https://milestoneschildclinic.com`

3. **Point the frontend at the project** — put the same project ID in
   `../frontend/.env.local` (the keys are already there, just fill in the first):

   ```env
   VITE_SANITY_PROJECT_ID=your_project_id
   VITE_SANITY_DATASET=production
   ```

   Add both to the Vercel dashboard too, or the blog will be empty in production.

4. **Run it:**

   ```bash
   npm run dev          # http://localhost:3333
   ```

## Publishing the Studio

```bash
npm run deploy
```

Hosts the Studio at `https://<name-you-pick>.sanity.studio` — free, Google login,
nothing to maintain. Share that URL with whoever writes the posts; they never need
this repo or a local setup.

To give someone access: [manage.sanity.io](https://www.sanity.io/manage) → **Members**
→ **Invite**. Check your plan's seat limit before inviting.

## Content model

| Type | Purpose |
|---|---|
| **Blog Post** (`post`) | Title, slug, excerpt, cover image, category, author, publish date, read time, body |
| **Category** (`category`) | Drives the filter pills on `/blog`. Only categories with at least one published post appear. |
| **Body** (`blockContent`) | Rich text: headings, lists, bold/italic, links, and inline images with alt text |

Notes for editors:

- The **slug** becomes the article URL (`/blog/<slug>`). Changing it on a published
  post breaks existing links to that article.
- A **publish date in the future** keeps the post hidden until that moment, so posts
  can be queued up in advance.
- **Excerpt** does double duty — the card summary and the search-engine description.
  Keep it under 200 characters.
- **Alt text is required** on the cover image and on every image inside the body.

## Caching

The frontend reads through Sanity's CDN (`useCdn: true`), so a newly published post
can take up to a minute to appear on the live site. This is expected. To make edits
appear instantly, set `useCdn: false` in
`../frontend/src/services/sanityClient.ts` — at the cost of slower page loads.
