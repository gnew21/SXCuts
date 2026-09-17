# SXcuts — Vercel website

Home is `/`, with `/studio` and `/visit`. Booking buttons open Saul’s Square website.

## Publish
1. Create a GitHub repository and upload the contents of this folder (not the enclosing folder).
2. In Vercel, Add New → Project and import that repository.
3. Use Framework Preset **Other**, Node.js **24.x**, Build Command **npm run build**, and Output Directory **dist/client**. The included vercel.json sets the build and output defaults.
4. Deploy and check the temporary Vercel URL, including navigation and booking.
5. Add sxcuts.com and www.sxcuts.com in Settings → Domains. Apply the DNS records shown by Vercel at your domain provider, preserving email records.

No API keys or database are needed. Google review excerpts are manually curated, not a live feed. Future pushes to the connected production branch trigger Vercel deployments.

Local development: npm ci, then npm run dev. Build: npm run build.
