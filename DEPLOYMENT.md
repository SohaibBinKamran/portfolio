# Deployment — GitHub Pages + sohaibbinkamran.com

## Done

- Static export (`output: "export"`), `public/CNAME`, `public/.nojekyll`,
  `.github/workflows/deploy.yml` (build + deploy on push to `main`).
- Repo: **https://github.com/SohaibBinKamran/portfolio** (public), pushed.
- Pages enabled with the GitHub Actions source; first deploy is green.
- Custom domain `sohaibbinkamran.com` configured on the repo.

Site is serving now at https://sohaibbinkamran.github.io/portfolio/ (redirects to
the custom domain once DNS is switched).

## Remaining: point the domain (GoDaddy) + Framer

First, in **Framer**: remove `sohaibbinkamran.com` from the old project's
domain settings so it stops serving / claiming the domain.

Then in **GoDaddy → Domain → DNS**:

- **Delete** the current Framer records:
  - `A` `@` → `31.43.161.6`
  - `A` `@` → `31.43.160.6`
  - `CNAME` `www` → `sites.framer.app`
  - any domain **Forwarding**
- **Add** four `A` records on host `@`:

  | Type | Name | Value |
  |------|------|-------|
  | A | @ | 185.199.108.153 |
  | A | @ | 185.199.109.153 |
  | A | @ | 185.199.110.153 |
  | A | @ | 185.199.111.153 |

- **Add** one `CNAME` record: Name `www` → Value `sohaibbinkamran.github.io`.

(Optional IPv6 — add `AAAA` on `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.)

## Verify

- In **Settings → Pages**, the custom-domain check shows a green tick (retry after DNS propagates, up to a few hours).
- Visit `https://sohaibbinkamran.com` and `https://www.sohaibbinkamran.com`.
- Once the tick is green, enable **Enforce HTTPS**.

## Updating the site later

```bash
git add -A && git commit -m "..." && git push
```

The workflow rebuilds and redeploys automatically.
