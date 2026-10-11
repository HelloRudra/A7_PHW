# বাজার দর (BazarDor)
প্রয়োজনীয় পণ্যের দাম এক নজরে — Bangladesh's daily essential-goods price tracker.

## Technologies
Next.js (App Router), Tailwind CSS v4, DaisyUI, Better Auth (MongoDB), react-hot-toast — UI built from the provided Figma file

## Features
1. Live price ticker (marquee) with ▲/▼ change
2. Top 6 risers / fallers and all-products grid in Bengali digits
3. Category pages with numeric sort (কম→বেশি / বেশি→কম) and skeleton loading
4. Protected product details with per-market min/max prices
5. Email/password, Google and GitHub auth with toast feedback
6. Profile page with name update; custom 404 and empty states

## Setup
`cp .env.example .env.local`, fill the values, then `npm i && npm run dev`.
Add `NEXT_PUBLIC_APP_URL` / `BETTER_AUTH_URL` (your Vercel URL) and OAuth callback `<url>/api/auth/callback/{google,github}` on deploy.
