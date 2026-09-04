# Deployment — GitHub Pages + sohaibbinkamran.com

The code side is done: static export (`output: "export"`), `public/CNAME`,
`public/.nojekyll`, and `.github/workflows/deploy.yml` (build + deploy on push to `main`).

## 1. Create the GitHub repo and push

Create a repo at https://github.com/new — name it e.g. `portfolio`, **Public**,
no README/gitignore/license. Then, from this folder:

```bash
git remote add origin https://github.com/<USERNAME>/portfolio.git
git push -u origin main
```

## 2. Turn on Pages

Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The `Deploy to GitHub Pages` workflow runs on every push; watch it under the **Actions** tab.

After the first successful run, still in **Settings → Pages**, set
**Custom domain** to `sohaibbinkamran.com` and Save. Leave **Enforce HTTPS**
unchecked until the certificate finishes provisioning (can take up to ~24h, usually minutes).

## 3. Point the domain (GoDaddy)

First, in **Framer**: remove `sohaibbinkamran.com` from the old project's
domain settings so it stops serving / claiming the domain.

Then in **GoDaddy → Domain → DNS**:

- **Delete** the existing records that send the domain to Framer — the `A` record(s)
  on `@`, and any `CNAME` on `www` pointing to Framer. Remove any domain **Forwarding** too.
- **Add** four `A` records on host `@`:

  | Type | Name | Value |
  |------|------|-------|
  | A | @ | 185.199.108.153 |
  | A | @ | 185.199.109.153 |
  | A | @ | 185.199.110.153 |
  | A | @ | 185.199.111.153 |

- **Add** one `CNAME` record: Name `www` → Value `<USERNAME>.github.io` (keep the trailing dot if GoDaddy adds it).

(Optional IPv6 — add `AAAA` on `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)

## 4. Verify

- `https://github.com/<USERNAME>/portfolio/actions` — deploy is green.
- In **Settings → Pages**, the custom-domain check shows a green tick (retry after DNS propagates, up to a few hours).
- Visit `https://sohaibbinkamran.com` and `https://www.sohaibbinkamran.com`.
- Once the tick is green, enable **Enforce HTTPS**.

## Updating the site later

```bash
git add -A && git commit -m "..." && git push
```

The workflow rebuilds and redeploys automatically.
