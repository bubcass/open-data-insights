# Security baseline

This repository builds a static React landing page. It does not require a production Node.js service. Deploy only the generated `dist/` directory; do not publish the repository, `node_modules/`, source data, or build tooling.

## Routine verification

- Use Node 22 as specified by `.nvmrc` and install with `npm ci`.
- Run `npm run verify` before deployment. This builds the site, checks the public artifact and runs the production-dependency audit.
- Run `npm run security:audit` during dependency maintenance to surface build-tool findings. Major-version fixes should be tested separately rather than applied with `npm audit fix --force`.
- Review every file copied into `public/`: it becomes publicly downloadable without further access control.

## Recommended website headers

Configure these at the website server or CDN. GitHub Pages does not apply a repository `_headers` file.

```text
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
```

The policy is intentionally suitable for the landing page only. Observable Framework pages need their own tested policy because generated inline modules and some runtime CSV parsing can require additional CSP allowances.

## Deployment surface

The legacy `/elections-dail/` and `/elections-seanad/` paths contain only compatibility redirects to the maintained Election Explorer. The former copied application builds and the unused `/chambers/` data tree must not return in `dist/` unless they become an intentional, reviewed part of the product.
