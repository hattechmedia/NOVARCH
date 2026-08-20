Create a clean, scalable, production-ready folder structure for a **Next.js company website**.

The company provides:

* AI Automation
* Custom Software Development
* AI Workflow Solutions
* Digital Launch Services

Use **Next.js with the App Router and TypeScript**.

Follow this architecture:

```text
company-website/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── projects/
│   │   └── team/
│   ├── icons/
│   ├── videos/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── ai-automation/page.tsx
│   │   │   ├── custom-software/page.tsx
│   │   │   ├── ai-workflows/page.tsx
│   │   │   └── digital-launch/page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── api/
│   │       └── contact/route.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Container.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── WhyUs.tsx
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── Contact.tsx
│   │   └── animations/
│   │       ├── Reveal.tsx
│   │       ├── MagneticButton.tsx
│   │       └── Marquee.tsx
│   │
│   ├── data/
│   │   ├── services.ts
│   │   ├── case-studies.ts
│   │   ├── testimonials.ts
│   │   └── navigation.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── metadata.ts
│   │
│   ├── hooks/
│   │   ├── useScroll.ts
│   │   └── useMediaQuery.ts
│   │
│   └── types/
│       ├── service.ts
│       ├── case-study.ts
│       └── testimonial.ts
│
├── .env.local
├── .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Architecture requirements

* Use **Next.js App Router**.
* Use **TypeScript** throughout the project.
* Keep the architecture clean and scalable without unnecessary enterprise-level complexity.
* Keep reusable UI components inside `components/ui`.
* Keep global layout components such as Navbar and Footer inside `components/layout`.
* Keep homepage sections inside `components/sections`.
* Keep animation-specific components isolated inside `components/animations`.
* Keep website content/data separate from UI components inside `data`.
* Keep shared utilities and configuration inside `lib`.
* Keep reusable React hooks inside `hooks`.
* Keep shared TypeScript definitions inside `types`.
* Use dynamic `[slug]` routing for case studies.
* Keep API routes inside `app/api`.
* Organize assets logically inside `public`.
* Follow clean naming conventions and avoid unnecessary nesting.
* Make the structure easy for another developer to understand and maintain.

The final result should feel like a **premium, professional AI technology company's codebase**, not an over-engineered template.
