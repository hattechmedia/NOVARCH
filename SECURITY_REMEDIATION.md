# Security remediation — 20 October 2026

Local changes only. No production deployment, real payment, email campaign, live database credential test, or Git history rewrite was performed. Existing legal/UI work was preserved.

## Required before deployment

1. Rotate/revoke the credential-bearing MongoDB URI found in Git history (for example commit `0eed31d2b26dce60279d15a7bbc5289a0d2c57e9`). Review Atlas access logs, user privileges and IP allowlist. Its current validity was deliberately not tested. Changing source cannot revoke a database credential.
2. Set a unique random `JWT_SECRET` of at least 32 characters. Configure `ADMIN_USERNAME` and `ADMIN_PASSWORD` as a bcrypt hash with cost 12–16. Plaintext/default passwords are rejected. `npm --prefix backend run hash-password` reads a new password from stdin; do not put a password in command arguments, commits or chat. Use an appropriate hidden-input terminal/secret manager when feeding stdin.
3. Set matching random `INTERNAL_API_SECRET` values (32+ characters) on frontend and backend, plus frontend `FORM_SIGNING_SECRET`. Backend production startup rejects missing internal credentials. Configure the existing MongoDB URI. The MongoDB user needs access to the application's additional `AdminSession`, `SecurityCounter` and `SecurityEvent` collections and their indexes. Index creation must be verified in staging, including TTL and unique session indexes; do not assume an existing database has them.
4. All old JWTs are invalidated by the new issuer/audience/session requirements. Administrators must sign in again. Sessions last two hours, expire server-side, are revoked by logout, and become invalid after the configured password hash changes. Bearer browser storage was explicitly retained at the user's request; do not describe it as equivalent to httpOnly cookies.
5. Verify proxy topology. `TRUST_PROXY_HOPS=0` is the safe direct-access default. Set an appropriate hop count only when the public ingress overwrites forwarded headers and direct backend access cannot bypass it. Frontend on Vercel uses `x-vercel-forwarded-for`; other production ingress must overwrite `x-novarch-verified-ip`. Never pass through an attacker-supplied identity header. Without a verified client identity, forms intentionally share the conservative `unknown` budget.
6. Configure the public API origin. Frontend CSP derives its API origin from `NEXT_PUBLIC_API_URL`. Dashboard's static Vercel CSP currently allows `https://novarch-backend.vercel.app`; adjust that directive if deploying another API origin. Test CORS, translations, checkout redirection and CSP in the actual hosting environment.
7. Paid `/api/translate` now requires a server-only `TRANSLATION_API_SECRET` (32+ characters) via `X-Translation-Token`. Leave it unset to disable the endpoint. Never put this token in a browser environment variable. The existing browser language switcher does not call this endpoint.
8. Use isolated staging credentials for integration testing. Existing consent/Winter Arc scripts call repositories and email services directly and can write records/send email. They were inspected but deliberately not run against the local environment's real services.

## Remediation mapping

Numbers correspond to the audit findings table.

| Finding | Change / reason | Verification and remaining limits |
|---|---|---|
| 1 | Next.js and matching config updated to 16.4.2; compatible security patches installed | Production dependency audit: zero; webpack production build passed. Restart old dev processes to load the new native/runtime packages. |
| 2 | Historical credential exposure documented; no destructive history rewrite | OPEN: credential owner must rotate/revoke, review access and coordinate history cleanup. |
| 3 | Public default password/JWT fallback removed; production rejects placeholder signing keys | Auth tests; missing credentials fail closed rather than enable a known admin account. |
| 4 | Browser bearer storage retained per explicit user decision | OPEN accepted design risk: same-origin script execution can steal tokens. Cookie/BFF migration remains recommended. |
| 5 | Durable session collection, issuer/audience/JTI validation, two-hour lifetime, logout revocation, credential-version binding | Mocked session tests cover valid/revoked tokens. Real multi-instance session lifecycle still needs staging verification. |
| 6 | Every mounted JWT-protected endpoint now requires validated admin claims and a live session; missing-role RBAC fallback removed | Viewer/other-user tokens rejected in tests. |
| 7 | Translation access requires a server-only shared secret and bounded supported inputs | Unauthenticated endpoint disabled/forbidden by construction; trusted service clients must adopt new header. |
| 8 | Database connection and repository errors propagate instead of returning in-memory write success | Regression test proves failed contact creation rejects. Production reads/writes require a database. |
| 9 | Patched backend compression/dependency chain | Backend dependency audit zero. |
| 10 | Separate escaped HTML views, attribute escaping and HTTP(S) link checks | Injection regression test confirms payload is escaped and original stored data unchanged. Plain-text emails remain readable. |
| 11 | Plaintext password comparison removed; bcrypt format/cost enforced | Deployment must provide a new hash. No admin password was invented or silently changed. |
| 12 | Strict login schema, UTF-8 byte limit, shared account and IP budgets | NoSQL-object/oversized credential tests. Multi-instance limiter concurrency requires real MongoDB staging tests. |
| 13 | Explicit proxy configuration and authenticated BFF identity forwarding | Configuration-dependent: ingress overwrite/direct-access rules must be verified by operator. |
| 14 | Backend rate limits now use shared atomic MongoDB counters with TTL; frontend local map is bounded | Backend budgets apply across instances. Frontend local guard is defense in depth, not the distributed authority. Validate TTL indexes in staging. |
| 15 | Webhooks exempt from general public budget; signed payments still verified; authenticated BFF submissions use their form budget; polling reduced to 60 seconds | Dashboard build passed. Edge-level webhook abuse protection still belongs in hosting/WAF configuration. |
| 16 | Internal shared secret mandatory in production | Direct public submissions cannot bypass BFF controls without the shared secret. |
| 17 | Payment/failure writes match immutable Stripe IDs, never email | Signed failure-webhook test confirms no email query. PaymentIntent failures resolve their Checkout Session through Stripe. |
| 18 | Atomic unique-session receipt update with immutable `paymentReceivedAt`; paid amount/currency checked against catalog | Concurrent duplicate and tampered-amount tests pass. Notification delivery is best effort after the durable receipt; a transactional outbox would be needed for guaranteed notification delivery across process crashes. |
| 19 | Removed email-only submission suppression that discarded another user's changed/new application | Legitimate changed submissions are preserved. Repeated deliveries may create another inquiry; a future idempotency-key design can deduplicate without trusting email ownership. |
| 20 | CSP configured for frontend and dashboard, retaining current framework/translation requirements | PARTIAL: frontend inline scripts remain allowed for existing static Next rendering. A nonce/strict-CSP migration needs dynamic rendering and browser regression testing. |
| 21 | Existing Google Translate integration preserved to avoid breaking language switching | OPEN: privacy/vendor approval or a first-party translation replacement is a product/legal decision. CSP limits permitted script hosts but does not remove vendor DOM access. |
| 22 | Project search escapes regex metacharacters and caps schema search length; project URLs restricted to HTTP(S) | No mounted project search route exists. Keep schema validation when exposing it in future. |
| 23 | Generic translation/signature/API error responses | Changed API files lint/type checks; no provider error details returned by translation. |
| 24 | Names/emails removed from routine persistence/delivery logs; raw database/provider objects no longer logged on modified paths; injected service text removed from creation log | Logging access/retention and historical log cleanup remain operator tasks. |
| 25 | Security events persisted in MongoDB; login outcome/logout events added | No secrets logged. Retention/access controls for the new collection must be configured. |
| 26 | Package UI checks the saved-inquiry response before success/checkout | Changed component lint passed; end-to-end failure presentation should be checked in staging. |
| 27 | Stream-limited 32 KiB JSON reading, hostile-type rejection, correct 400/413 errors, bounded upstream timeouts | Three frontend boundary tests pass, including malformed/oversized JSON and valid consent preservation. |

## Dependency results

- Backend: all-dependency audit zero after compatible updates.
- Dashboard: all-dependency audit zero after compatible updates.
- Frontend: production audit zero. Five high-rated development findings remain in `braces -> micromatch -> fast-glob -> @next/eslint-plugin-next -> eslint-config-next` (five package entries, not five demonstrated remote exploits).
- Registry offered no compatible patched `braces` release in this chain. `npm audit fix --force` proposed a breaking downgrade to Next lint config 14.2.35, so it was not applied. Do not process untrusted glob patterns in tooling; track upstream patch availability.
- Incomplete local Windows native CSS packages were archived under `trahBin/dependency-repair` and reinstalled from the registry. No security controls were disabled.

## Verification

Commands (from repo root unless stated):

```powershell
npm --prefix backend run test:security
npm --prefix backend run build
npm --prefix dashboard run build
npm --prefix frontend run build -- --webpack
# From backend directory:
npm exec -- tsx --test ../frontend/src/lib/requestBody.test.ts
# From each application directory:
npm audit --omit=dev
```

Results: backend security tests 7/7, frontend request-boundary tests 3/3, backend build passed, dashboard build passed, frontend webpack production build passed. Backend tests mock persistence/provider boundaries; they do not establish production database/index behavior. Frontend full TypeScript check also passed. Full frontend lint still reports pre-existing React-hook/type issues outside the security changes; do not claim repo-wide lint is clean.

Staging acceptance must cover: valid login/logout/replay, password-change revocation, forged role/algorithm tokens, direct BFF bypass rejection, 8+ form submissions, multiple API instances sharing limits, database outage handling, real Stripe test-mode duplicate/failure webhooks, HTML email output, and mobile language/checkout behavior with CSP enabled.

Recommended operational follow-up: Atlas least privilege and allowlisting, encrypted/backed-up database with a restore drill, restricted audit-log access/retention, provider spending limits, edge rate limits and alerts, and an authenticated staging pentest. No production infrastructure state was assumed secure.
