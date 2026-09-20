# SEKOLONG.COM

Mobile-first digital learning platform foundation for Lesotho: structured learning, human teachers and Mosuoe — a Socratic digital teacher.

## Run locally
```bash
npm install
npm run dev
npm run build
```

The current build includes demo role-based entry (student, teacher, admin), student learning dashboard, curriculum progress cards, resources, live class links, responsive mobile navigation, English/Sesotho-ready translations, offline service-worker shell and clearly labelled MOCK MOSOUE MODE.

## Supabase
Create a Supabase project and copy `.env.example` to `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```
The browser may use the public anon key, but never place service-role keys or AI/payment secrets in Vite variables. Add the production schema and RLS policies in `supabase/migrations/001_initial.sql`. The app intentionally falls back to demo mode until Supabase credentials are supplied.

## Mosuoe API
The UI calls for a future server-side `/api/mosuoe` abstraction. Keep provider keys on a server/edge function only. Replace the mock response in `src/components/Mosuoe.tsx` with a fetch to that endpoint after adding authentication, rate limits, moderation and teacher-review rules.

## Hostinger Web Apps
1. Create a Hostinger Web App from the repository.
2. Build command: `npm run build`; output directory: `dist`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables.
4. Configure SPA fallback to `index.html` if using client-side routes.

No Hostinger-, WordPress- or proprietary runtime dependency is required. Payment, ETL connectivity, email/SMS and video are intentionally integration placeholders. Google Meet URLs are stored as normal class links.

## Demo roles
Use the role buttons on the entry screen. Sample users are Thabo Mokoena (student, Grade 7), M’e ’Masechaba Ntlhoi (teacher), and Naledi Sekhonana (admin). Demo data is in `src/data/demo.ts` and should be replaced by Supabase queries for production.
