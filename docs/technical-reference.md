# 1. Scope, evidence and project overview

NOVARCH is a public services website and lead-intake platform with a separate administrative command portal. It presents four service families, captures general inquiries and package leads, accepts community and Winter Arc event applications, and supports one-time Stripe purchases of fixed-price discovery packages. Administrators review records, change their status, delete them, and email Winter Arc applicants.

This reference documents the working tree on 21 October 2026, version 1.0 of this documentation. The working tree includes uncommitted changes; it is not represented as a released or deployed revision. Package versions below come from lockfiles, with manifest ranges stated where useful. This is a documentation-only review: no existing application source or configuration was edited. The accompanying build manifest records hashes used to verify preservation.

## 1.1 Evidence and reading conventions

- Verified implementation means a behavior is directly supported by the inspected source. It does not mean an endpoint was exercised against a live database or deployment.
- Illustrative JSON examples use invented names, example.com addresses, synthetic identifiers and dummy token references. They express source-defined shapes, not captured production traffic. Optional fields may be omitted.
- Backend origin means the Express service. Website origin means the Next.js application. Their identically named /api/contact and /api/community paths have different contracts and must not be confused.
- Application source inventory: 168 TS/TSX/CSS files and 23,238 lines at review time. Generated output, dependency trees and binary assets are excluded from source analysis. Configuration, manifests, lockfiles and operational scripts were inspected separately. Private .env values and real database records were not used.
- Endpoint inventory: 21 Express handler contracts plus 5 Next.js handlers. Express aliases expand to 41 registrations; with Next.js this is 46 method/path registrations across the two origins. Framework-generated OPTIONS/HEAD behavior is not counted as a separately implemented handler.
- References use repository-relative paths so the document remains portable. The module inventory in Chapter 14 provides file-level navigation. Deployment state, secret provisioning, actual index creation, DNS, SMTP deliverability and live third-party account configuration could not be established from code alone.

## 1.2 Business modules

| Module | Business behavior | Persistence / external dependency |
| Website and service catalog | Marketing pages, founders, service descriptions, package selection | Local TypeScript content; no CMS calls |
| Contact intake | General messages and service package inquiries | Contact collection; transactional email |
| Community | Membership interest and profile capture | Community collection; acknowledgment and admin notification |
| Winter Arc | Curated event application, referral capture, separate consent choices | Community collection distinguished by applicationType |
| Fixed-price checkout | EUR one-time Blueprint purchases through hosted Checkout | Stripe session and Contact payment record |
| Command portal | Record lists, search, status changes, detail views, deletion and event replies | Direct authenticated Express requests |
| Legal information | Bilingual event hub and permanent legal placeholders | Static content; no acceptance/signature workflow |
| HackTheFlag | Challenge information, external link and QR presentation | External challenge environment; no local game backend |

# 2. System architecture and execution flow

## 2.1 Technology stack

| Layer | Verified technology / version | Role |
| Public website | Next.js 16.4.2; React 19.2.8; TypeScript 5.9.3 locked | App Router pages, server layout, client interactivity, same-origin form handlers |
| Website presentation | Tailwind CSS 4; Framer Motion 13.1.0 manifest range; Lucide React | Theme tokens, responsive layouts, reveal and service animations |
| Backend | Node.js; Express 4.22.3 locked; TypeScript 5.9.3 locked | REST handlers, security middleware and business services |
| Data | Mongoose 9.9.3 locked; MongoDB | Documents, indexes, revocable sessions, shared rate counters |
| Dashboard | React 19.2.8; Vite 6.4.3; React Router DOM 7.18.2 manifest range | Client-side administrative SPA |
| Payments | Stripe server SDK 17.7.0; @stripe/stripe-js 5.6.0 manifest range | Server-generated hosted Checkout; server SDK performs actual payment operations |
| Email | Nodemailer 10.1.1 manifest range; Resend HTTP API | Transactional acknowledgment, admin notification and event replies |
| Validation/security | Zod 3.24.2 range; bcryptjs 3.0.3 range; jsonwebtoken 9.0.3 range; Helmet 8.3.0 range | DTO validation, credential verification, JWT validation, API headers |
| Tooling | npm lockfile v3; tsx; ESLint 9; PostCSS; Tailwind Vite plugin | Installation, development execution, compilation and linting |

No root npm workspaces declaration was found. Each application has its own package manifest and lockfile; root scripts delegate with npm --prefix. The file:.. dependency references the root package, but the root contains no shared runtime service implementation. Node engines are not pinned in the repository; select a Node release compatible with the locked Next.js, Mongoose and Vite packages and record it in deployment tooling.

Dependency engine metadata provides lower bounds even though the application manifests do not pin Node: Next.js declares Node >=20.9.0; locked Mongoose declares >=20.19.0; locked Vite declares ^18.0.0, ^20.0.0 or >=22.0.0. Node 20.19+ within the 20.x line or a compatible 22+ release satisfies these three declared ranges. The actual deployed Node version was not verified.

@@diagram architecture

## 2.2 Runtime entry points

| Entry | Execution |
| frontend/src/app/layout.tsx | Loads global styles and Inter font, applies dark class, wraps children with ThemeProvider, Navbar, ScrollToTop and Footer; main has top clearance for fixed navigation |
| frontend/src/app/page.tsx | Composes Hero, Services, Process, WhyNovarch, BuildWithUs and CTA sections |
| frontend/src/app/api/*/route.ts | Next.js server endpoints for signed form tokens, form forwarding and private translation API |
| backend/src/server.ts | Configures Express middleware, mounts route aliases, connects MongoDB, calls the no-op contact seed method, then listens outside test/Vercel |
| dashboard/src/main.tsx | Mounts the React App in the HTML root; App owns authentication gate, shared data and BrowserRouter |
| backend/vercel.json | Sends all deployment paths to src/server.ts using @vercel/node; exported app is the serverless entry |

## 2.3 Trust boundaries and communication

Public forms send JSON to the website origin. Next.js validates the request boundary and signed form token, then forwards a selected payload to Express with an optional shared internal token. The dashboard bypasses this forwarding layer and talks directly to Express with a Bearer token. Browser checkout creation and payment verification also talk directly to Express. Stripe sends signed webhooks directly to the backend; those requests require a raw JSON body.

MongoDB holds all operational records. Website content is local TypeScript data, so MongoDB project records are not the website content source. The backend Project service/model/repository exists, but no Project router or controller is mounted. The defined editor/viewer/system permission matrix is likewise not wired into registered routes: active protected endpoints require an admin session.

## 2.4 Express request lifecycle

The server disables X-Powered-By, validates TRUST_PROXY_HOPS (integer 0-5), selects the simple query parser, installs Helmet and compression, and applies a Mongo-backed general limiter. CORS is then evaluated. Raw body parsers are installed for both webhook aliases before general JSON/urlencoded parsers (1 MB). Login and checkout creation get additional sensitive-operation limiters. A separate per-account login limiter follows body parsing. Routers dispatch to controllers/services/repositories; errors reaching next(error) are normalized by errorHandler.

An unavailable database can fail the general limiter before a handler is reached. Consequently the health handler's documented 200 degraded response is its own behavior, not a guarantee that /health can be reached during total database failure. There is no custom catch-all JSON 404 middleware; unmatched Express routes use the framework fallback.

@@diagram intake

# 3. Backend modules and business workflows

## 3.1 Layer responsibilities

| Directory / module | Responsibility and interactions |
| config/index.ts | Loads dotenv; exposes runtime, database, Stripe, URL, JWT, admin and internal-token configuration; rejects unsafe production auth/database configuration |
| config/database.ts | Mongoose connection/pool management and connection-state reporting; failure throws status 503 |
| config/packageCatalog.ts | Canonical package IDs, display names, EUR prices and purchasability; case-insensitive ID/slug/name lookup |
| config/smtp.ts | Decrypts encrypted SMTP credentials; builds transport settings or returns null |
| routes | Registered method/path definitions; checkout implementation lives in its router rather than a controller |
| controllers | Parse DTOs, reject malformed identifiers, select workflow, map service results to HTTP |
| services/contact.service.ts | Contact persistence orchestration, audit events, two best-effort transactional email deliveries |
| services/community.service.ts | Community/event creation, list/detail, status, deletion and marketing withdrawal; returns acknowledgment email status |
| services/dashboard.service.ts | Computes contact-derived metrics in application memory after loading all contacts |
| services/session.service.ts | Pinned JWT validation plus live database session lookup and credential-version binding |
| services/email.service.ts | Provider selection, HTML/text templates, transactional replies and marketing eligibility helper |
| services/audit.service.ts | Persists SecurityEvent and keeps newest 500 entries in process memory; recent-log helper returns memory only |
| repositories | Mongoose reads/writes and document normalization; retain legacy fallback code that is not reached on connection exceptions |
| models | Six operational model families including the inline SecurityCounter model in middleware |
| types | DTO schemas and TypeScript shapes for contacts, community/events, projects and dashboard metrics |
| utils | Resource-ID format guard, timing comparison, AES-GCM secret helpers and escaped email-template views |

## 3.2 Contact and service-lead lifecycle

The contact controller parses CreatePublicContactSchema. Zod strips unknown keys; status and source are not public DTO fields. If planName, preferredService or serviceType matches a catalog entry, the controller overwrites plan name/tier/price/value/service values from the server catalog. If no entry matches, client price and estimatedValue are removed. A submission is a service lead only when submissionType equals service_lead; otherwise it is a message.

The repository derives source from submission type, builds serviceType from the selected performances when needed, and chooses message from message, news or a server default. Estimated value comes from canonical plan price when available, otherwise a category value map, otherwise zero for a general message or 490 for a service lead. The category map includes current services plus legacy categories; this is a pipeline estimate, not payment proof. It parses planPrice by stripping non-digits and applying parseInt; it is not a general decimal currency parser.

After creation, ContactService awaits an audit write, then awaits Promise.allSettled for admin notification and submitter acknowledgment. These email operations are best-effort but are still awaited within the request; they are not durable background jobs. Status changes and deletions are also audited. A failed audit after a successful contact write can return an error although the contact already exists. There is no transaction joining record, audit and email, and no request-level idempotency key.

## 3.3 Community and Winter Arc lifecycle

The controller selects Winter Arc when applicationType is winter-arc or any of the three application-answer fields is truthy. It then validates the selected schema. Standard community submission requires fullName and email; Winter Arc additionally requires city, organization and all three substantive answers. The resulting record shares the Community model and uses applicationType to distinguish the workflows.

The repository sets source from the explicit source, UTM source or Website Form. It records marketing and photo choices separately, defaults them false, and creates consent timestamps/version v1-2026-10 only when true. Clients cannot set these evidence timestamps through the public schema. Registration succeeds with either consent false. The service sends an acknowledgment and admin notification concurrently and returns the acknowledgment result as emailStatus. A stored application remains accepted even if email is unconfigured or fails.

Marketing withdrawal sets marketingConsent false and marketingConsentWithdrawnAt to server time, retaining original consent evidence. The helper canSendMarketingEmail returns true only when consent is true and no withdrawal timestamp exists. No marketing campaign sender or scheduled newsletter dispatch is implemented. There is no public withdrawal endpoint and no matching dashboard action calling the withdrawal route. Photography withdrawal is described as a contact process, not implemented as an API.

## 3.4 Checkout and payment reconciliation

@@diagram payment

Only the four catalog entries below are directly purchasable. Price, currency and quantity are server-owned. The frontend passes a package name; the backend also accepts packageId or serviceSlug with precedence packageId, then serviceSlug, then packageName. A supplied but invalid higher-priority identifier does not fall through to the next one.

| Package ID | Service / package | EUR | Unit amount (cents) |
| digital-launch-basic | Digital Launch / Launch Blueprint | 490 | 49000 |
| automation-integration-basic | Automation & Integration / Workflow Blueprint | 690 | 69000 |
| ai-workflow-basic | AI Workflow / AI Evidence Sprint | 950 | 95000 |
| custom-software-basic | Custom Software / Solution Blueprint | 1500 | 150000 |

The modal first records a service lead through the website BFF. Premium or from-priced implementation requests finish with a qualification confirmation. Basic requests then create a Stripe session directly through Express. That backend call creates a second Contact record with Payment Pending and a unique session ID. Therefore one purchase attempt can create both a general package lead and a payment-linked lead; the flows are not deduplicated.

Stripe session creation uses mode payment, card payment method, quantity 1, EUR and metadata containing selected package and submitter details. Success redirects to FRONTEND_URL/payment-success?session_id=... and cancellation to /services. If persistence of the pending lead fails, the handler tries to expire the Stripe session, then returns 500.

The webhook verifies Stripe's signature before any database work. Completed or async-success sessions must be paid, use EUR, and match the canonical catalog amount. It atomically sets Paid, immutable paymentReceivedAt, value/price and payment-intent ID where no receipt marker exists; upsert can create a missing lead. Sparse unique session/payment-intent indexes plus duplicate-key handling make successful receipt retries idempotent when indexes exist. A verified duplicate receipt returns already_processed. Email notification follows the receipt write and has no durable retry/outbox.

Payment failures update only the matching immutable session/intent identity, only Payment Pending records and only where no paymentReceivedAt exists. Payment-intent failures first look up the related Checkout session. Unrecognized signed event types are acknowledged after database connection. A database failure returns 503 so Stripe can retry. No local scheduler, webhook replay queue, refund endpoint, subscription billing or inventory fulfillment implementation was found.

## 3.5 Dashboard metric semantics

DashboardService loads all contacts newest-first and counts total, New, Contacted, Proposal Sent and Closed. Conversion rate is rounded Closed / total * 100. Estimated pipeline sums estimatedValue for every status except Closed, including Paid and Payment Declined. activeAutomatedWorkflows is the literal 0, not a live automation integration. Recent activity is the newest five contact creations labeled new_lead; it is not an audit feed.

The dashboard's fallback local total excludes Payment Declined instead, so it differs from the API metric. UI currency labels use a dollar sign although catalog purchases are EUR. These are verified representation differences, not conversions or reconciled revenue figures.

# 4. Request schemas and validation reference

## 4.1 Shared request boundaries

Express JSON and urlencoded parsers accept up to 1 MB. Website readObject requires application/json, streams at most 32,768 bytes before parsing, requires a non-null object, and permits at most 40 top-level keys. Consent fields must be booleans. performances/interests are string arrays with at most 15 elements of 100 characters each. referral objects allow at most five string values of up to 500 characters. estimatedValue must be a finite number; other supplied non-null fields must be strings of at most 3,000 characters. Endpoint-specific DTOs impose narrower rules after forwarding.

readObject treats text as an array, although /api/translate contains later code accepting a string. As implemented, string text is rejected before the route's own validation. Use a nonempty text array for that endpoint. Null values can pass the broad boundary for many fields but will still encounter downstream validation; they are not generally valid DTO values.

Website forms require form_token and an empty/absent website_hp honeypot. The HMAC-SHA256 timestamp token must be at least one second old and no more than two hours old. It is not single-use or bound to a session/IP. useFormToken fetches once per component mount and has no automatic refresh/retry; a stale form can require reload. BFF rate limiting is process-local; backend counters are shared in MongoDB.

## 4.2 Contact public DTO

Source: backend/src/types/contact.types.ts, CreatePublicContactSchema. Required fields are name and email; the remaining fields are optional. General Zod object parsing strips unknown keys rather than rejecting them.

| Field | Type / validation | Meaning |
| name | string, 2-100 characters | Submitter name; schema does not trim before minimum-length check, model trims on persistence |
| email | valid email string, lowercased | Reply address; this schema does not impose an explicit maximum |
| phone / countryCode / company | strings max 50 / 10 / 100 | Optional contact context |
| submissionType | service_lead or message | Defaults in repository to message when not service_lead |
| serviceType / preferredService | strings max 500 / 200 | Service context; catalog lookup may overwrite |
| planName / planTier | string max 100; Basic or Premium | Selected package context; canonical catalog overrides on match |
| planPrice / estimatedValue | string max 100; number | Accepted by schema but overwritten or deleted by public controller |
| performances | array max 15; each string max 100 | Service/topic selections used for source-side valuation |
| news / message | strings max 3000 | Narrative content; message takes precedence in repository |
| website_hp | optional string of length zero | Direct API honeypot check |

Contact status updates accept exactly New, Contacted, Proposal Sent, Closed, Paid, Payment Declined or Payment Pending. There is no state-transition graph: an administrator can set any listed status directly. Paid in this field alone is not equivalent to a verified Stripe receipt marker.

## 4.3 Community public DTO

| Field | Standard community | Winter Arc |
| applicationType | optional community literal | winter-arc literal; default winter-arc |
| fullName | trimmed string 2-100, required | same |
| email | trimmed valid email, lowercased, required | same |
| city | optional trimmed string max 100 | required trimmed string 1-100 |
| organization | optional trimmed string max 150 | required trimmed string 1-150 |
| country / role | optional trimmed strings max 100 / 150 | not accepted by Winter Arc schema |
| contactNumber / countryCode | optional trimmed strings max 50 / 10 | same |
| whatYouDo / whatCanYouOffer / whatAreYouLookingFor | not standard fields | each required trimmed string 2-2000 |
| linkedinUrl / portfolioUrl | not standard fields | optional trimmed string max 500; empty or HTTP(S), no URL credentials |
| proposedGuest | not standard field | optional trimmed string max 1000 |
| interests / message | optional max 10 strings, each max 100; message max 3000 | not Winter Arc schema fields |
| referral | string max 200 or referral object | referral object only |
| source | optional string max 100 | same; client source label is permitted |
| marketingConsent / photoConsent | optional booleans; default false | same |
| website_hp | optional zero-length string | same |

Referral object: optional utmSource, utmMedium, utmCampaign and utmContent strings, each max 150; optional referrer max 500. Community status preprocessing accepts case-insensitive New, Contacted, Resolved, Pending, Reviewing, Selected and Rejected; it does not trim whitespace before matching. No application-type-specific status restrictions are enforced. Reply body: trimmed subject 1-200 and message 1-10000 characters.

## 4.4 Authentication, checkout and identifier rules

Login is a strict Zod object with only email and password. Email is trimmed, valid, lowercased and max 254. Password is 1-72 characters and at most 72 UTF-8 bytes; the setup hashing utility requires 12-72 bytes. Runtime login verifies the configured bcrypt hash, not a user collection.

Checkout: userName trimmed 2-100 and userEmail trimmed valid email/lowercase are required. serviceSlug, packageId and packageName are optional trimmed strings max 200; one must resolve to a purchasable catalog item. userPhone max 50, userCompany max 100 and userNotes max 500 are optional trimmed strings. Extra price/user fields are stripped. The modal can collect notes longer than this backend limit, so checkout may fail after initial lead capture.

Resource IDs pass /^[a-zA-Z0-9_-]{8,64}$/ before repository access. Actual MongoDB records normally use 24-character hex ObjectIds, but the guard also permits other strings. A syntactically allowed non-ObjectId can produce a Mongoose cast error normalized as 503, not necessarily 404. Verify-session requires a string session_id starting cs_ and length at most 200.

# 5. Complete API reference

@@api

# 6. Public website routes and components

## 6.1 Routing and page inventory

@@pages

All pages share the root layout, fixed Navbar and Footer unless a framework-level redirect/notFound prevents page rendering. There is no customer authentication gate or participant dashboard. Metadata is created through lib/metadata.ts for several pages and directly on others. Some metadata paths default to / when a caller omits path; do not assume every page has a unique canonical URL. Root metadata uses a novarch.io base while several backend URL defaults use novarch.eu; actual deployment domains must be reconciled operationally.

## 6.2 Component composition

Home combines six sections: Hero renders service cards with orbit/constellation visuals; ServicesSection renders the local service catalog and links; ProcessSection presents the delivery process; WhyNovarchSection renders differentiators; BuildWithUsSection presents collaboration opportunities; CTASection links visitors to contact or services. Shared Container, Badge, Card and Button components supply layout, variants and link/button presentation.

Service detail pages resolve a known slug through local data and render ServicePageTemplate. It selects a service-specific animated hero, renders scope/delivery information and includes ServicePackagesSection. That section controls selected package/open state and passes a ServicePackage into ServicePackageModal. The modal owns form fields, submitting/error/success state and the two-stage contact/checkout flow described in Chapter 3. No backend-driven package editor exists.

Founders composes FounderJourneyTimeline, VentureProofGrid, OperatingBlueprint, FounderPrinciples and CofounderSection using local founder/project data. Journey scrolling and reveal animations are presentational; these components do not issue CRM requests. ContentService wraps local arrays with filtering/getter methods; its async signatures do not imply remote API calls. No CMS adapter is implemented.

HackTheFlagContent is a static promotional/challenge information page with Framer Motion, an embedded SVG QR path and HACKTHEFLAG_CHALLENGE_URL. It opens an external challenge. A separate ChallengeQRCode utility can copy the challenge URL and download a static QR image; it is not imported into the current HackTheFlagContent. No flag submission, scoring or challenge verification route exists in this repository.

## 6.3 Forms and visible state

ContactFormContent preselects service topics from service or category query parameters, validates a trimmed name and simple email pattern, waits for a signed token and posts a message to /api/contact. It displays an error on a failed response, disables duplicate submissions with isSubmitting and replaces the form with a confirmation when successful. Phone and country code are combined by the BFF. Confirmation wording promising a 24-hour follow-up is copy, not an implemented SLA/job.

CommunityFormContent collects fullName, email, country, organization, role, interests, message and a referral string. It posts to /api/community with a token. This page's form model has no marketing/photo checkboxes; omitted consent defaults false in the backend. WinterArcContent separately has both optional, initially unchecked consent controls and required application answers. It captures UTM query parameters and document.referrer and forwards them in referral; it posts to /api/community, not the /api/winter-arc alias.

Winter Arc's live timer derives elapsed time from 2026-10-16T18:00:00+02:00, clamps negative values at zero, displays total hours plus minute/second remainders, and updates every second after mount. It does not store elapsed time. The state still contains days, but days are not rendered. Initial zeros/mounted gating keep the server and first client render deterministic.

PaymentSuccessContent reads session_id using useSearchParams inside Suspense, asks Express to retrieve the Stripe session, then shows verification loading, success or an error. It does not change MongoDB payment status. A paid Stripe session response and successful webhook persistence can occur at different times. No customer login or order-history page accompanies this return route.

## 6.4 Shared state, styling and behavior

ThemeContext always supplies dark and a no-op toggleTheme; there is no functioning user light/dark selector. globals.css defines palette/surface/text/border tokens, Tailwind inline theme mappings, typography, selection/focus states, scrollbar styles, reduced-motion rules, reveal transitions and Translate overrides. The global image/SVG/canvas rule constrains width and uses auto height. Responsive grids and sm/md/lg/xl utilities adjust page layouts; Navbar switches desktop navigation and a fixed mobile drawer, with body scroll locking while open.

ScrollToTop watches pathname. Hash navigation attempts to find and scroll to the target; otherwise it resets scroll immediately and on the next animation frame. useInView uses IntersectionObserver (threshold 0.1 by default, once by default); Reveal maps it to CSS opacity/transform states. useScrolled throttles passive scroll work with requestAnimationFrame. useMediaQuery uses matchMedia and useSyncExternalStore with a false server snapshot. Service graphics can be dynamically loaded with ssr:false from the client template. Framer Motion and CSS reduced-motion support should both be considered when maintaining animation accessibility.

## 6.5 Language switching and legal content

LanguageSwitcher loads Google's website Translate script once through a shared promise and initializes the hidden mount target. It polls for .goog-te-combo every 100 ms up to 15 seconds, then drives the select's change event. German preference is saved in novarch_lang/localStorage and googtrans cookie; legacy domain cookies are cleared on selection. English selection reloads the original React document. The active DE state follows Google's translated-ltr HTML class. Desktop and drawer instances share the engine; failed loading permits retry and displays a translation-unavailable message (drawer exposes its error as a title).

Google's supported-language request is JSONP, so translate-pa.googleapis.com must be permitted in script-src as well as connect-src. next.config.ts contains these origins and allows same-origin frames used by the widget. This machine-translation path is independent of the private /api/translate endpoint. It mutates page DOM outside React and depends on external script/network availability; it is not a maintained static translation dictionary. The bilingual legal components deliberately set translate=no/notranslate.

EventLegalHub provides confidentiality, participant-data, photography, challenge and participation sections. It expressly marks approved NDA documents, operator/privacy disclosures, prize terms and some organizer processes as pending. PermanentLegalPage likewise says the privacy/legal notice is not complete. These are implementation/content limitations; this technical reference does not certify legal compliance. No signed NDA capture, document acceptance storage or calendar integration is implemented.

# 7. Administrative dashboard

## 7.1 Routes and access

App initializes its authentication flag from the presence of novarch_admin_token in localStorage or sessionStorage. Without a token it returns LoginPage before the router. On login, rememberMe (default true) selects localStorage; otherwise sessionStorage. User email is stored alongside the token. Token presence is a UI gate only. Express validates all protected data/actions using the live admin session. App does not call /auth/verify proactively; a 401 from the API clears tokens and reloads to login.

| Dashboard route | View / action | API dependency |
| / | Command Center, contact metrics and all inquiries | GET /api/health, /api/dashboard/stats, /api/contacts, /api/community |
| /service-leads | Filtered service package inquiries | Same shared list, client category filter |
| /messages | Filtered general messages | Same shared list, client category filter |
| /inquiry/:id | Full inquiry details, copy, status, delete, mailto | Loads from list; fallback GET /api/contacts; PATCH /api/contacts/:id/status; DELETE /api/contacts/:id |
| /winter-arc | Winter Arc applications table and reply control | Shared GET /api/community; client applicationType filter; PATCH status; POST reply |
| /community | General member applications table | Shared GET /api/community; client applicationType filter; PATCH status |
| /winter-arc/:id and /community/:id | Application/profile details, status, delete, Winter Arc reply | Loaded member memory; PATCH /api/community/:id/status; DELETE /api/community/:id; POST /api/community/:id/reply |
| * | Redirect to / | No separate API |

The exact inquiry detail route is source-verified in App and referenced by InquiryTable. Sidebar labels the user Super Admin, but the issued/validated backend role is admin. No dashboard editor/viewer accounts, user provisioning screens or per-feature role controls are implemented.

## 7.2 Data loading and API client

loadData first reads health, then concurrently loads stats, contacts and all community applications. It updates React state only after all three calls succeed. Polling runs every 60 seconds while authenticated/visible, stops when hidden and reloads immediately on visibility return. Manual refresh uses a spinner with a minimum completion delay. The displayed dashboard clock updates every ten seconds.

services/api.ts normalizes VITE_API_URL to end in /api, attaches Bearer authorization, deduplicates simultaneous GETs by URL and removes requests from the map on settlement. It does not cache completed responses, paginate server data or apply a fetch timeout. The custom Winter Arc reply method parses a server message on failure. Other methods mostly throw an HTTP status-text error. Logout calls the server revocation endpoint first; if it fails, App keeps the session and reports a retry message.

## 7.3 Tables, details and feature mapping

InquiryTable receives filtered records from DashboardView. Search matches name, email, company, planName or serviceType. Status/category filters are client-side, and useDeferredValue reduces search update pressure. CSV export creates a data URI from the displayed inquiries; it does not call a backend export endpoint. Its CSV rows are joined with commas without a full quoting/formula-neutralization layer. There is no verified server-side pagination or aggregate query for these lists.

CommunityTable filters by status and text across member profile fields. It navigates to the type-specific detail route and can open ReplyModal for Winter Arc. ReplyModal sends trimmed subject/message to the protected backend and shows submitting, success or server-derived error state. Standard community members cannot use that reply endpoint. Inquiry details use mailto links for follow-up, not a backend contact-reply endpoint. Application deletion uses a browser confirmation and then the parent callback.

| Feature | Client operation | Server enforcement / side effect |
| Login | api.login(email,password) | bcrypt verification; JWT+session creation; audit |
| List/search/filter | getContacts/getCommunityMembers; React filters | Admin validation for lists; no permission check per row |
| Inquiry status | updateContactStatus | Valid status enum; Contact update and audit |
| Application status | updateCommunityStatus | Valid normalized enum; Community update |
| Delete inquiry | deleteContact | Hard Contact deletion and audit |
| Delete applicant | deleteCommunityMember | Hard Community deletion |
| Reply to event applicant | replyWinterArc | Must be winter-arc; transactional email, no reply-history persistence |
| Withdraw marketing consent | No dashboard method/button found | Protected backend route exists; false + withdrawal timestamp |
| Export / copy / mailto | Browser download, clipboard or mail client | No server action or delivery confirmation |
| Logout | api.logout then clear browser storage | Live session deletion and audit |

## 7.4 Verified dashboard edge cases

Status update and delete callbacks update local React state in their catch branches even if the API fails. Thus the UI can display a successful change/deletion that was never persisted. The message about operating in local storage mode is misleading: there is no implemented record cache or durable offline action queue, only in-memory React data (credentials do use browser storage).

InquiryDetailPage retries via the full contact list when its record is absent; it does not use the existing get-by-id backend endpoint. CommunityDetailPage only searches loaded member memory and can briefly show not-found on a direct URL before shared data arrives; it has no dedicated detail fetch. Failed logout leaves credentials present by design, and expired tokens are removed reactively after a 401. UI list visibility does not create authorization: every protected backend action validates admin independently.

# 8. Database schema and persistence

## 8.1 Connection and collections

Mongoose connects using MONGODB_URI with serverSelectionTimeoutMS 8000, connectTimeoutMS 10000, socketTimeoutMS 45000, pool max 10/min 1, idle timeout 30000 and IPv4 family 4. The module sets explicit DNS resolver addresses for SRV troubleshooting. Existing connected state is reused, but there is no explicit in-flight connection promise. Collection names below use Mongoose's normal model-name pluralization; actual deployed names/indexes must be confirmed in the target database.

@@diagram data

| Model | Expected collection | Main readers / writers |
| Contact | contacts | Contact repository, dashboard metrics and Stripe checkout/webhook |
| Community | communities | Community repository, applications lists/status/withdrawal |
| Project | projects | Project repository/service only; no mounted HTTP routes |
| AdminSession | adminsessions | Auth login/logout and validateSession |
| SecurityEvent | securityevents | AuditService for login/logout, contacts and project service operations |
| SecurityCounter | securitycounters | MongoRateStore for shared general/sensitive/account/public-form buckets |

Contacts, Community and Projects use timestamps and serialize _id as string id while removing _id/__v. Repository formatters normalize createdAt/updatedAt to ISO strings. Security/auth models are internal and do not expose general CRUD APIs. MongoDB ObjectIds are primary identities; there are no SQL foreign keys or enforced cross-collection references. Business associations use session IDs, token IDs and resource strings.

## 8.2 Contact fields

| Fields | Storage type / default / constraint |
| _id; createdAt; updatedAt | ObjectId; automatic Date timestamps |
| name; email | Required strings, trimmed; email lowercased |
| submissionType | message or service_lead; default message |
| phone; countryCode; company | Optional trimmed strings |
| planName; planPrice | Optional trimmed strings |
| planTier | Optional Basic or Premium enum |
| performances; news | Array of trimmed strings; optional trimmed narrative |
| serviceType; preferredService | String default General Inquiry; optional string |
| message | Optional trimmed string |
| status | Seven-value lead/payment enum; default New |
| estimatedValue | Number; model default 490, normally derived explicitly in repository |
| source | Website Form, Service Package, Direct API or Referral; model default Website Form |
| paymentReceivedAt | Optional Date; immutable receipt convention enforced by webhook query, not schema immutable flag |
| stripeSessionId; stripePaymentIntentId | Optional trimmed strings; each sparse unique index |

Indexes: status; submissionType; createdAt descending; email (nonunique); status+createdAt descending; submissionType+createdAt descending; sparse unique payment identifiers. Multiple submissions from one email are allowed. The repository has a recent-email lookup helper, but the active controller does not invoke it for deduplication.

## 8.3 Community fields

| Fields | Storage type / default / constraint |
| _id; createdAt; updatedAt | ObjectId and automatic timestamps |
| applicationType | community or winter-arc; default community |
| fullName; email | Required strings; trim; lowercase email |
| country; city; contactNumber; countryCode | Optional trimmed strings |
| organization; role | Optional trimmed strings |
| whatYouDo; whatCanYouOffer; whatAreYouLookingFor | Optional trimmed strings at database level; Winter Arc API requires them |
| linkedinUrl; portfolioUrl; proposedGuest | Optional trimmed strings |
| interests; message | Trimmed string array; optional trimmed string |
| status | Seven community/event statuses; default New |
| source; referral | String default Website Form; Mixed referral value |
| marketingConsent; photoConsent | Boolean defaults false |
| marketingConsentAt; photoConsentAt | Date defaults null |
| marketingConsentVersion; photoConsentVersion | Optional trimmed strings |
| marketingConsentWithdrawnAt | Date default null |

Indexes: status; applicationType; createdAt descending; email (nonunique); applicationType+status+createdAt descending; marketingConsent+applicationType. API validation is stricter than database validation for Winter Arc fields and URL safety. Old records are normalized on read (including applicationType inference from application answers); there is no explicit migration process.

## 8.4 Projects and security records

| Model / fields | Storage rules |
| Project slug, name, period, description | Required strings; slug unique/trim/lowercase/indexed |
| Project category / status | venture, client, lab, internal or case-study (default venture); draft, published or archived (default draft) |
| Project summary, image, liveUrl, websiteUrl, githubUrl | Optional strings; DTOs enforce URL/relative image formats if used |
| Project tags / techStack | String arrays; tags defaulted by DTO |
| Project metrics | Subdocuments with required label/value strings |
| Project links | Subdocuments with required label/url; isExternal default true |
| Project isSample / featured | Boolean defaults false; featured indexed |
| Project timestamps / indexes | Automatic timestamps; status+category and status+createdAt descending plus field indexes |
| AdminSession tokenId | Required unique string, matches JWT jti |
| AdminSession username / credentialVersion | Required strings; credentialVersion is HMAC of configured password hash using JWT secret |
| AdminSession expiresAt | Required Date, TTL expireAfterSeconds 0; explicit expiry filter also enforced at read |
| SecurityEvent | actor, action, resource, resourceId, status strings; timestamp default Date.now; metadata Mixed |
| SecurityCounter | String _id composed of namespace, time bucket and SHA256 key; hits Number default 0; expiresAt Date with TTL 0 |

Counter increments are atomic findOneAndUpdate/upsert with duplicate-key retry. TTL cleanup is asynchronous; expired buckets use a new time-derived ID so delayed cleanup does not extend the limit. Session validation also compares expiresAt rather than trusting TTL cleanup timing.

## 8.5 Queries, consistency and retention

Contact/community lists use find().sort({createdAt:-1}).lean(); community adds applicationType only for recognized query values. Detail reads use findById. Status changes use findByIdAndUpdate with validators; deletion uses findByIdAndDelete. Consent withdrawal updates false/withdrawal/updated timestamps. Project search escapes regex metacharacters before case-insensitive name/description/tag matching; project list/status/category/featured filters are internal service capabilities only.

No migration framework, multi-document transaction, archival job, contact/community TTL or backup automation is implemented. The startup contact seed method is a no-op. Contact and Community retain in-memory fallback arrays, but connectDatabase throws on failure, so disconnected writes fail closed instead of becoming temporary successes. Project list falls back to its three embedded sample/venture entries when a successful database query returns no results. Do not interpret that fallback as a live CMS integration.

Deletion is hard deletion. Security events and related external emails/payment records are not cascaded. Session/counter TTL retention is implemented; other retention is manual/unspecified in code. Configure backup/recovery and approved retention outside this repository; these are operational recommendations, not verified deployed features.

# 9. Authentication, authorization and security

## 9.1 Admin session flow

@@diagram auth

There is one environment-configured admin identity, no User collection, registration, password reset, MFA or account-management endpoint. Login performs Zod validation, checks minimum signing configuration and bcrypt format/cost 12-16, compares the password and normalized username, and writes an AUTH_LOGIN audit record. It then issues a two-hour HS256 JWT containing username/role admin with issuer novarch-api, audience novarch-admin and random UUID jti, and persists the corresponding session.

validateSession pins algorithm/issuer/audience and checks admin role, configured username and string jti. It requires a matching unexpired database session with the current credentialVersion. Changing the configured password hash invalidates old sessions even if JWT time remains. Logout deletes the current session and audits the operation; password/JWT rotation and session expiry are therefore server-enforced. There are no refresh tokens.

ROLE_PERMISSIONS defines admin/editor/viewer/system helper permissions and recognizes superadmin as admin in a helper, but registered routes use verifyAdminToken directly. Because validateSession accepts only admin, the helper matrix is not an active multi-role product feature. Tokens in browser storage can be read by same-origin JavaScript; they are not HttpOnly cookies. CORS is not authentication and is not a complete CSRF mechanism.

## 9.2 Security-control matrix

| Control | Verified implementation | Practical boundary |
| Auth validation | bcrypt + pinned JWT + live Mongo session | One configured admin; depends on database availability |
| Input boundaries | BFF bounded JSON/types; backend Zod DTOs; ID pattern | Some allowed IDs are not valid ObjectIds; unknown DTO keys usually stripped |
| Internal forms | X-Internal-Token with timing-safe compare when configured | Optional in development; required secret enforced by production config |
| Form protection | HMAC age token, honeypot, BFF and backend limits | Reusable token; no origin-bound session or CAPTCHA |
| Rate limiting | General 200/15m, sensitive 20/15m, login-account 30/15m, public-form 8/15m | Names/comments mention different counts; actual max values are authoritative |
| Shared counters | MongoRateStore and hashed bucket keys | Database outage can block even public health/root requests |
| CORS | Exact configured/default origin allowlist, credentials true | No-Origin requests allowed; internal token intentionally not exposed as browser allowed header |
| Headers | Express Helmet; website Next config; dashboard Vercel CSP and hardening headers | API Helmet does not protect documents served by other origins |
| Email HTML | htmlValues/escapeHtml and unsafe URL scheme neutralization | Outgoing recipient/transport and template behavior still depend on provider |
| Stripe | Raw body + signature verification + catalog price + atomic receipt guard | Requires deployed unique indexes and webhook delivery; no durable email outbox |
| Secrets | Environment variables; SMTP AES-256-GCM ciphertext | Encryption key must remain secret separately; .env values excluded from this reference |
| Auditing | Persistent SecurityEvent for selected operations | Community updates/deletion/withdrawal lack the Contact service audit orchestration |

General limiter skips both webhook aliases and authenticated BFF POSTs to /api/contact and /api/community. Sensitive limiter applies to /api/auth/login and both checkout-create aliases. Public-form limiter follows internal authentication and can use validated X-Form-Client-IP when the shared secret is set. BFF guards use an instance-local map capped around 5,000 active keys and an eight-submission rolling window. Backend buckets are shared fixed windows; list/read polling also consumes the general limit.

## 9.3 Verified limitations and deployment considerations

- No explicit CSRF/origin validation is implemented for public signed forms. Their timestamp token is retrievable publicly and replayable during its age window; it is an anti-abuse input, not user authentication.
- The website CSP retains unsafe-inline and adds unsafe-eval outside production. Its Google widget origins and same-origin frames are functional requirements of the present integration. The dashboard CSP is separately static and allows only the configured backend deployment origin in its checked-in policy.
- Production requires a non-placeholder JWT secret of at least 32 characters, a bcrypt hash at cost 12-16, MongoDB URI and internal secret at least 32 characters. FORM_SIGNING_SECRET is checked when issuing/verifying production form tokens; missing configuration yields token endpoint 503.
- Public backend error envelopes differ between controllers, authentication, limiters, webhooks and BFFs. Do not build clients assuming every error has the same message/error fields.
- No trusted proxy count should be guessed. TRUST_PROXY_HOPS defaults to zero; outside Vercel, production BFF client-IP handling relies on a trusted proxy injecting x-novarch-verified-ip. Incorrect proxy provisioning can collapse users into one bucket or undermine intended IP limits.
- Status updates can set Paid manually; verify immutable paymentReceivedAt and Stripe data for reconciliation. No refund or financial settlement record is implemented.
- No destructive tests, live penetration tests, production account changes or security configuration changes were performed for this documentation task.

# 10. External integrations

| Integration | Trigger / modules | Authentication and exchanged data | Failure behavior |
| MongoDB | config/database; repositories; sessions; audit; counters | MONGODB_URI; contact/applicant narratives, payment references, session claims and audit metadata | Throws status 503 on connection/operation failure; no active disconnected-write fallback |
| Stripe Checkout | routes/checkout; ServicePackageModal | STRIPE_SECRET_KEY; customer email, name/contact/company/notes metadata and canonical package price | 503 unconfigured, 400 validation, 500 creation/persistence errors; expire compensation attempted |
| Stripe webhook | checkout router + raw parser | stripe-signature + STRIPE_WEBHOOK_SECRET; event/session/payment identifiers and amount | 400 signature/catalog errors; 503 persistence failure asks provider retry |
| Resend | EmailService.sendEmail | RESEND_API_KEY Bearer; EMAIL_FROM, recipient, reply-to, subject, plain text/HTML | 15s timeout; returns sent/failed; no SMTP fallback after a configured Resend failure |
| Encrypted SMTP | config/smtp; utils/crypto; EmailService | AES-GCM encrypted username/password plus key; decrypted auth to Nodemailer | null if missing/decryption fails; per-transport timeout; returns failed/unconfigured |
| Google website Translate | layout mount; LanguageSwitcher; globals.css; Next CSP | Client script/cookie; page DOM text to external widget | 15s engine readiness/retry/error UI; browser/network restrictions can block it |
| DeepL API | private website /api/translate | DEEPL_API_KEY header; text array, source and target | Free endpoint if key ends :fx; falls through to Google after non-OK response; thrown fetch errors return 500 |
| Google Cloud Translation | private website /api/translate | GOOGLE_TRANSLATE_API_KEY in provider URL; text array/source/target | 15s timeout; unsuccessful configured calls can reach configuration notice rather than translated text |
| Google Fonts | Next Inter font; CSS/CSP | No application credential | Font delivery/build availability depends on Next build and deployment |
| External challenge | HACKTHEFLAG_CHALLENGE_URL; page QR/link | Opens separate challenge host | Challenge implementation and uptime are outside this repository |

Email templates include user-entered narratives and optional profile links; Resend/SMTP therefore process these fields for transactional purposes. Consent for future marketing is independent of registration acknowledgments and admin replies. The repository has no actual calendar API, SMS transport, cloud object storage, analytics SDK, AI inference runtime or task-queue implementation. Marketing service descriptions mentioning AI/automation are product offerings, not evidence those integrations run in this website.

SMTP encryption format is ivHex:authTagHex:ciphertextHex with AES-256-GCM, random 12-byte IV and a 32-byte key supplied as 64 hexadecimal characters. The code supports SMTP_APP_PASSWORD_ENC or legacy SMTP_PASSWORD_ENC. No example secret/ciphertext or encryption key is included here.

# 11. Environment configuration and deployment

## 11.1 Environment-variable reference

Values are intentionally excluded. Required means the indicated feature cannot operate without it; optional/defaulted does not imply it is safe to omit for a production deployment. Public prefixes are build-time browser-visible configuration and must never contain secrets.

@@environment

## 11.2 Local setup and verified commands

Install dependencies in each app separately using the checked-in lockfile. Configure a local/test MongoDB URI and server secrets in private environment files or the deployment secret store. Copy example files only after reviewing names; this document does not certify any actual local .env content. Do not run setup utilities against production by default.

```sh
npm --prefix frontend ci
npm --prefix backend ci
npm --prefix dashboard ci

npm run dev:backend
npm run dev:frontend
npm run dev:dashboard
```

Run the three development commands in separate sessions. Root package scripts forward into each package. The backend dev script uses Windows .\\node_modules\\.bin\\tsx watch src/server.ts syntax; on another OS invoke the installed tsx watcher with the equivalent path appropriate to that shell. Default ports are backend 5000, website 3000 and dashboard 5173. Dashboard Vite config proxies /api to localhost:5000, but its API client defaults to an absolute hosted backend; set VITE_API_URL=/api to actually use the local proxy. Set NEXT_PUBLIC_API_URL for direct browser checkout and BACKEND_API_URL for website server forwarding; keep both aligned with intended backend.

```sh
npm run build:frontend
npm run build:backend
npm run build:dashboard
npm run build:all

npm --prefix backend start
npm --prefix frontend start
npm --prefix dashboard run preview
npm --prefix frontend run lint
npm --prefix backend run test:security
npm --prefix backend run hash-password
```

Backend build emits dist from src with ES2022/NodeNext/strict checking. Next performs its own optimized build. Dashboard build runs tsc -b then vite build; preview is local preview of that bundle, not a deployed reverse proxy. Root has no all-services development runner, combined production process manager or universal test script. No dependency/runtime upgrade was performed for this documentation.

## 11.3 Provisioning and deployment architecture

The repository includes Vercel configuration for all three applications. Frontend declares framework nextjs. Backend uses @vercel/node with a catch-all route to src/server.ts and suppresses app.listen when VERCEL is present. Dashboard rewrites every path to index.html for BrowserRouter deep links and installs its own response headers. Production domains, deployed projects, environment scopes, provider account settings and TLS ownership were not verified.

Provision MongoDB with the intended database/user/network policy. Models declare indexes; there is no checked-in migration command or verified deployment index-sync step. Confirm sparse unique Stripe indexes, session token uniqueness and TTL indexes before relying on idempotency/expiry guarantees. Do not use clear-db.ts as schema setup: it deletes every Contact document in the configured database.

Configure identical INTERNAL_API_SECRET values on the website server and backend, a dedicated production FORM_SIGNING_SECRET on the website, admin hash/JWT/database values on Express, and public API base URLs only where browser communication requires them. CORS_ORIGINS must include the actual website and dashboard origins exactly. FRONTEND_URL controls Stripe redirects. Configure Stripe webhook delivery to one backend webhook alias with the matching webhook secret. The webhook origin/path is distinct from the website BFF origin.

Configure one email provider and approved sender/recipient settings. Resend takes precedence whenever its key is set; it does not automatically fail over to SMTP. Verify sender authorization and transactional delivery independently. The repository contains no automatic calendar invitation delivery despite event copy describing future calendar contact.

## 11.4 Operations and troubleshooting

| Symptom | Source-supported checks |
| Form token unavailable | Check FORM_SIGNING_SECRET in production and GET /api/form-token response; token fetch has no automatic refresh |
| Form session expired immediately | Submit after one second; ensure valid token age under two hours and matching signing secret |
| Public submit 403 | Check matching website/backend internal secret; direct browser backend posts are not the intended form path when secret enabled |
| Submit 429 | BFF eight-per-window guard and backend shared public-form bucket; verify trusted proxy/IP forwarding |
| Submit 502 | Website could not forward/persist; inspect backend availability and DB connection, not only website page availability |
| Login 503 | Validate bcrypt format/cost, JWT secret, database availability and audit write; do not paste credentials into logs |
| Protected action 401 | Expired/revoked session, password hash rotation, claim mismatch or missing Bearer token; dashboard reloads on 401 |
| Health healthy/degraded mismatch | Handler reports connection readyState; general rate-store DB dependency can fail before handler |
| Checkout 400 | Canonical package identifier and short userNotes; only catalog Blueprint entries are purchasable |
| Paid return page but pending dashboard | Verify webhook receipt/delivery/signature and DB persistence; return page performs read-only Stripe verification |
| Duplicate-looking lead | Modal contact capture and backend pending-checkout creation are separate writes |
| German never loads | Inspect CSP script-src for translate-pa.googleapis.com (JSONP), script origin access, network/ad-blocking, and engine timeout |
| Client action appears saved but reverts | Dashboard catch branches update React state even on API failure; refresh and inspect server response |
| Deep-link not found in dashboard | SPA rewrite and loaded lists; community details do not fetch independently |

Server logs include database state, lead IDs, audit action summaries, email provider outcome and selected errors. Several provider/database error branches intentionally return generic user messages. Production Next removes console calls except error/warn; Express has no structured external logging or monitoring integration. Health returns rounded process uptime. No alerting, metrics exporter, backup job or log-retention policy is configured in source.

# 12. Testing, maintenance and verified limitations

## 12.1 Existing test inventory

| Test source | What it covers | Execution status for this task |
| backend/src/scripts/security.test.ts | Escaped HTML/unsafe URLs; hostile/oversized auth input; DB fail-closed writes; JWT claims/algorithm/session revocation; unsigned webhook rejection; failure identity; paid webhook amount/idempotency with mocked model methods | Reviewed, not executed |
| frontend/src/lib/requestBody.test.ts | Null/array/malformed JSON; object-valued fields; invalid consent type; oversized request; valid consent/referral preservation | Reviewed, not executed |
| backend/src/scripts/test-consent.ts | Consent defaults/evidence, independence, withdrawal and eligibility scenarios through services | Reviewed, not executed; can persist records/send email |
| backend/src/scripts/test-winter-arc.ts | Schema acceptance/rejection, standard community and Winter Arc service workflow/status scenarios | Reviewed, not executed; can persist records/send email |

test:security invokes tsx --test against the security test file. There is no frontend test script; requestBody.test.ts requires an appropriate installed TypeScript test runner (the backend package includes tsx) and web Request support. A manual example command from the root, if the installed runner is available, is node backend/node_modules/tsx/dist/cli.mjs --test frontend/src/lib/requestBody.test.ts. This is a runner invocation derived from an installed dependency, not a package script. Do not run integration scripts against production data or real recipients.

No application build, lint, automated test suite, live endpoint exercise, production DB query, email send or Stripe transaction was executed during this documentation-only task. Documentation verification includes route-registration enumeration, source-reference matching, source preservation hashes, PDF text/layout checks and rendered-page inspection. Prior work in the chat is not counted as a test run for this snapshot.

## 12.2 Operational scripts

| Script | Actual responsibility / caution |
| hash-password.ts | Reads one password line from stdin, enforces 12-72 UTF-8 bytes and prints a cost-12 bcrypt hash; no database update |
| set-admin-password.cjs | Local credential-setup helper that rewrites environment configuration; inspect before use, not executed |
| setup-local-security.cjs | Local security/environment setup helper; not a production deployment/migration tool; not executed |
| clear-db.ts | Connects using configured URI and calls ContactModel.deleteMany({}); destructive, not a seed/reset of all entities; not executed |
| test-consent.ts / test-winter-arc.ts | Service-level integration scripts, not isolated fixtures; may have database and email side effects |

## 12.3 Maintenance priorities based on inspected code

| Verified limitation | Maintenance recommendation (not implemented) |
| Whole-list queries and in-memory dashboard metrics/filtering | Introduce bounded pagination, search parameters and database aggregation before data volume grows |
| UI state updated on failed admin mutation | Surface server failure and roll back optimistic state; avoid implying durable offline mode |
| Separate initial/package payment leads | Define idempotency/lead-to-session correlation before purchase retry volume grows |
| Audit/email consistency is not transactional | Consider a durable outbox and reconciliation; avoid treating a post-write error as proof no record exists |
| No application/customer User model | Treat the portal as single-admin; implement explicit account/role provisioning if multi-user access is required |
| Unused project CRUD/RBAC service layer | Either expose intentionally with tests/authorization or remove only through a separate authorized implementation task |
| Reusable form token and instance-local BFF map | Document threat model, proxy trust and distributed anti-abuse requirements |
| Static website versus separate backend catalog | Review price/content consistency when changing offerings; backend catalog remains payment authority |
| Template legal pages awaiting approved disclosures | Supply approved operator/privacy/event documents through owner/legal review; no compliance certification here |
| Widget mutates React DOM | Test interactive/translated forms and navigation; consider maintained localization if predictable translations are required |
| No automatic retention/backup or monitoring | Establish approved retention, backup/restore drills, service monitoring and secret rotation operationally |
| Dollar labels versus EUR catalog and conflicting pipeline filters | Define one currency/metric contract and align the dashboard with it |
| CSV naïve joining | Add quoting and spreadsheet-safe export handling if exports become an operational data exchange |

The root README still describes Next.js 15; locked source dependencies show Next.js 16.4.2. This document uses the code/lockfiles as authoritative. No claim is made that unused helpers, sample project arrays or marketing descriptions represent deployed capabilities.

# 13. Verification record and handover

The route inventory was derived from Express router method declarations plus all app.use mount aliases and from exported Next.js route methods. It was cross-checked against controller/handler code, DTO schemas and dashboard/website callers. Frontend page inventory includes redirects and the disabled /about route rather than treating every page file as an available feature. Database descriptions were checked against Mongoose field definitions/index declarations and actual repository queries.

Examples deliberately omit real tokens, credentials, ciphertext, real applicant data and live provider responses. Request headers use symbolic placeholders. Success examples follow handler source but remain illustrative where no runtime request was sent. Deployments and legal/provider approvals require independent confirmation.

All new deliverables and supporting generation files reside under docs/. The source preservation audit compares SHA-256 hashes of pre-existing project files outside dependency/build folders. PDF QA checks include readable page text, internal navigation, nonempty pages and rendered samples of cover, diagrams, API/schema sections, tables and appendix. The build verification report records counts and any differences. This PDF is a source-derived maintenance reference for the captured working tree, not a promise that external systems were configured or that every code path passed tests.

# 14. File and module reference

@@modules
