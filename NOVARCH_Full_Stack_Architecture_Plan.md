# NOVARCH — Full-Stack Multi-Folder Architecture Plan

## Overview

This document defines the architecture and execution plan for NOVARCH's complete 3-tier full-stack environment:

- **Frontend:** Next.js 16 Client Website
- **Backend:** Node.js + Express.js + TypeScript REST API
- **Dashboard:** React + Vite + TypeScript + Tailwind CSS Admin Portal

The architecture is designed to support the current NOVARCH website while providing a scalable foundation for CRM functionality, lead management, analytics, automated workflows, AI integrations, authentication, and future client-management features.

---

## 1. Port Allocation Standard

| Application | Technology | Local URL |
|---|---|---|
| Frontend | Next.js 16 | `http://localhost:3000` |
| Backend API | Node.js + Express.js | `http://localhost:5000` |
| API Base | Express REST API | `http://localhost:5000/api` |
| Admin Dashboard | React + Vite | `http://localhost:5173` |

### CORS

The Express backend should allow requests from:

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

Production origins should be added through environment variables rather than hard-coded into the application.

---

# 2. Overall Architecture

```text
                 ┌─────────────────────────┐
                 │     NOVARCH FRONTEND    │
                 │       Next.js 16        │
                 │       :3000             │
                 └────────────┬────────────┘
                              │
                              │ REST API
                              ▼
                 ┌─────────────────────────┐
                 │      EXPRESS API        │
                 │   Node.js + TypeScript  │
                 │       :5000             │
                 │       /api              │
                 └────────────┬────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
          ┌─────────────────┐   ┌─────────────────┐
          │ Contact / Leads │   │ Dashboard APIs  │
          │     Service     │   │     Service     │
          └────────┬────────┘   └────────┬────────┘
                   │                     │
                   └──────────┬──────────┘
                              ▼
                 ┌─────────────────────────┐
                 │      Repository Layer   │
                 │  In-Memory / MongoDB    │
                 └─────────────────────────┘

                              ▲
                              │
                              │ REST API
                              │
                 ┌────────────┴────────────┐
                 │    ADMIN DASHBOARD      │
                 │ React + Vite + TS       │
                 │       :5173             │
                 └─────────────────────────┘
```

---

# 3. Recommended Root Folder Structure

```text
NOVARCH/
│
├── FROTEND/                         # Next.js 16 Client Website
│   ├── src/
│   │   └── app/
│   │       └── ...
│   ├── public/
│   ├── .env.local
│   ├── package.json
│   └── ...
│
├── backend/                         # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── types/
│   │   ├── data/
│   │   └── server.ts
│   ├── .env
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── dashboard/                       # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── App.tsx
│   ├── .env
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

> **Note:** The existing frontend folder is named `FROTEND/`. Keep the existing name if that is already established in the project, or rename it to `FRONTEND/` later for consistency.

---

# 4. Backend Service

## Technology

- Node.js
- Express.js
- TypeScript
- CORS
- dotenv
- Zod
- tsx
- TypeScript type definitions

## Backend Structure

```text
backend/
│
├── src/
│   ├── config/
│   │   └── ...
│   │
│   ├── controllers/
│   │   ├── contact.controller.ts
│   │   └── dashboard.controller.ts
│   │
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── health.routes.ts
│   │   ├── contact.routes.ts
│   │   └── dashboard.routes.ts
│   │
│   ├── services/
│   │   ├── contact.service.ts
│   │   └── dashboard.service.ts
│   │
│   ├── repositories/
│   │   └── contact.repository.ts
│   │
│   ├── types/
│   │   └── contact.types.ts
│   │
│   ├── data/
│   │   └── store.ts
│   │
│   └── server.ts
│
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

---

# 5. Backend Environment Variables

### `.env`

```env
PORT=5000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### `.env.example`

```env
PORT=5000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

Production values should be configured separately and should never be committed to Git.

---

# 6. Backend API Structure

## Health

```http
GET /api/health
```

Purpose:

- Verify API availability
- Return server status
- Return uptime
- Provide dashboard connection status

Example response:

```json
{
  "success": true,
  "status": "healthy",
  "uptime": 123.45
}
```

---

## Contact / Lead Intake

```http
POST /api/contact
```

Purpose:

- Receive website inquiries
- Validate incoming data
- Store the inquiry
- Return success/error response

Validation should be handled with **Zod**.

---

## Dashboard Statistics

```http
GET /api/dashboard/stats
```

Should return metrics such as:

- Total inquiries
- New leads
- Estimated pipeline value
- Active automated workflows

---

## Contacts

```http
GET /api/contacts
GET /api/contacts/:id
PATCH /api/contacts/:id/status
DELETE /api/contacts/:id
```

Supported lead statuses:

```text
New
Contacted
Proposal Sent
Closed
```

---

# 7. Backend Architecture Pattern

Do not place all business logic directly inside route files.

Use the following architecture:

```text
Request
   │
   ▼
Route
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Database / Storage
```

Example:

```text
POST /api/contact
       │
       ▼
contact.routes.ts
       │
       ▼
contact.controller.ts
       │
       ▼
contact.service.ts
       │
       ▼
contact.repository.ts
       │
       ▼
MongoDB / In-Memory Store
```

This separation keeps the application maintainable and makes it easier to replace the current storage system with MongoDB later.

---

# 8. Repository Strategy

The initial implementation can use an in-memory repository.

```text
ContactService
      │
      ▼
ContactRepository
      │
      ├── InMemoryContactRepository
      │
      └── MongoContactRepository
```

### Development

```text
InMemoryContactRepository
```

### Production

```text
MongoContactRepository
```

This approach means the controllers and services do not need to be rewritten when moving from an in-memory store to MongoDB.

---

# 9. Initial Backend Data

The development repository should contain realistic seed data for:

- Existing inquiries
- Lead statuses
- Estimated project values
- Pipeline metrics
- Workflow metrics

Example:

```text
Contacts
├── New
├── Contacted
├── Proposal Sent
└── Closed
```

This allows the dashboard to look realistic during development before the production database is connected.

---

# 10. Admin Dashboard

## Technology

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React

## Dashboard Structure

```text
dashboard/
│
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── StatsCard.tsx
│   │   ├── StatusBadge.tsx
│   │   └── InquiryTable.tsx
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   └── InquiryDetails.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── hooks/
│   │   └── ...
│   │
│   ├── types/
│   │   └── ...
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── vite.config.ts
├── package.json
└── tsconfig.json
```

---

# 11. Dashboard Environment

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 12. Vite Configuration

The dashboard should run on:

```text
http://localhost:5173
```

The Vite development server can proxy API requests to:

```text
http://localhost:5000
```

This makes local development easier and avoids unnecessary CORS issues when using relative `/api` requests from the dashboard.

---

# 13. Dashboard Features

## Backend Connection Status

Display a live status badge:

```text
● Backend Connected
```

or:

```text
● Backend Offline
```

The dashboard should check:

```http
GET /api/health
```

on initial load.

---

## Overview Statistics

The dashboard should display:

### Total Inquiries

Total number of submitted inquiries.

### New Leads

Number of inquiries currently marked as `New`.

### Estimated Pipeline Value

Estimated monetary value of active opportunities.

### Active Automated Workflows

Number of active automation/workflow processes.

---

# 14. Inquiries Table

The inquiry table should support:

- Search
- Status filtering
- Inquiry details
- Lead status
- Contact information
- Project information
- Estimated value
- Date submitted

Statuses:

```text
New
Contacted
Proposal Sent
Closed
```

The table should update when a lead status changes.

---

# 15. Direct Launchers

The dashboard should provide a quick launcher to open:

```text
Frontend
http://localhost:3000
```

This allows administrators to quickly access the public NOVARCH website.

---

# 16. Frontend Integration

The existing Next.js frontend should connect to the backend through:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# 17. Frontend Contact Flow

The contact form should submit through:

```text
FROTEND
   │
   ▼
Contact Form
   │
   ▼
Next.js API Route
   │
   ▼
POST /api/contact
   │
   ▼
Express Backend
   │
   ▼
Contact Repository
```

The Next.js route can act as a controlled server-side forwarding layer.

Target file:

```text
FROTEND/src/app/api/contact/route.ts
```

It should forward inquiries to:

```http
POST http://localhost:5000/api/contact
```

---

# 18. Contact Form Requirements

The frontend should provide:

- Name
- Email
- Company
- Phone (if required)
- Service/project type
- Budget (if required)
- Message
- Submission state

The UI should handle:

```text
Idle
   ↓
Submitting
   ↓
Success
```

and:

```text
Idle
   ↓
Submitting
   ↓
Error
```

The backend remains the source of truth for validation.

---

# 19. Error Handling

The backend should have centralized error handling.

Recommended flow:

```text
Request
   ↓
Validation
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Response
```

Errors should return a consistent structure such as:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

Do not expose sensitive internal errors in production responses.

---

# 20. CORS Configuration

Development:

```text
http://localhost:3000
http://localhost:5173
```

Production should use explicit environment variables.

Example:

```env
CORS_ORIGINS=https://novarch.com,https://dashboard.novarch.com
```

Avoid using:

```text
Access-Control-Allow-Origin: *
```

for authenticated or sensitive production APIs.

---

# 21. Recommended API Client

The dashboard should centralize API requests instead of calling `fetch()` throughout individual components.

Example architecture:

```text
dashboard/src/services/api.ts
```

Responsibilities:

- API base URL
- GET requests
- POST requests
- PATCH requests
- Error handling
- Response parsing

This keeps components clean.

---

# 22. Development Workflow

Run all three applications simultaneously.

### Terminal 1 — Frontend

```bash
cd FROTEND
npm run dev
```

Runs:

```text
http://localhost:3000
```

### Terminal 2 — Backend

```bash
cd backend
npm run dev
```

Runs:

```text
http://localhost:5000
```

### Terminal 3 — Dashboard

```bash
cd dashboard
npm run dev
```

Runs:

```text
http://localhost:5173
```

---

# 23. Automated Build Tests

## Backend

Run:

```bash
npm run build
```

Then verify:

```http
GET http://localhost:5000/api/health
```

Alternatively, during development:

```bash
npx tsx src/server.ts
```

---

## Dashboard

Run:

```bash
npm run build
```

Expected result:

- TypeScript compiles successfully
- Vite generates production bundle
- No build errors

---

## Frontend

Run:

```bash
npm run build
```

Expected result:

- All Next.js routes compile successfully
- No TypeScript errors
- No build errors
- Existing routes remain functional

---

# 24. End-to-End Verification

Perform the following test.

## Step 1 — Start Backend

```bash
cd backend
npm run dev
```

Verify:

```http
GET http://localhost:5000/api/health
```

Expected:

```json
{
  "success": true,
  "status": "healthy"
}
```

---

## Step 2 — Start Frontend

```bash
cd FROTEND
npm run dev
```

Open:

```text
http://localhost:3000/contact
```

---

## Step 3 — Submit Contact Form

Submit a realistic test inquiry.

Verify that:

- Form validates correctly
- Loading state appears
- Request reaches backend
- Backend accepts the request
- Inquiry is stored
- Success state appears

---

## Step 4 — Open Dashboard

Open:

```text
http://localhost:5173
```

Verify:

- Backend status shows connected
- Total inquiries increased
- New lead count updated
- Inquiry appears in the table
- Submitted information is displayed correctly

---

## Step 5 — Change Lead Status

Change:

```text
New
```

to:

```text
Contacted
```

Verify:

- Dashboard updates immediately
- Backend receives PATCH request
- Lead status persists
- Statistics update correctly

---

# 25. Production Evolution

The initial architecture should be designed so NOVARCH can evolve into a complete software-management platform.

Potential future modules:

```text
/api/auth
/api/users
/api/contacts
/api/projects
/api/services
/api/workflows
/api/analytics
/api/notifications
/api/clients
```

Potential dashboard sections:

```text
Dashboard
├── Overview
├── Leads
├── Contacts
├── Clients
├── Projects
├── Services
├── Workflows
├── Analytics
├── Messages
└── Settings
```

---

# 26. Production Hardening

Before production deployment, add:

- MongoDB
- Authentication
- Role-based authorization
- JWT/session security
- Rate limiting
- Helmet
- Request validation
- Centralized error handling
- Structured logging
- Production CORS
- Secure environment variables
- Database indexes
- Input sanitization
- API request limits
- Monitoring
- Backup strategy

---

# 27. Recommended Security Architecture

```text
Frontend
   │
   ▼
HTTPS
   │
   ▼
Express API
   │
   ├── CORS
   ├── Helmet
   ├── Rate Limiting
   ├── Authentication
   ├── Authorization
   ├── Validation
   └── Error Handling
   │
   ▼
Service Layer
   │
   ▼
Repository
   │
   ▼
MongoDB
```

---

# 28. Recommended Execution Order

## Phase 1 — Backend Foundation

- [ ] Initialize Express + TypeScript
- [ ] Configure `tsconfig.json`
- [ ] Configure environment variables
- [ ] Configure CORS
- [ ] Add JSON middleware
- [ ] Add request logging
- [ ] Add centralized error handling
- [ ] Implement `/api/health`

## Phase 2 — Contact API

- [ ] Create contact types
- [ ] Create Zod validation schema
- [ ] Create contact repository
- [ ] Create contact service
- [ ] Create contact controller
- [ ] Create contact routes
- [ ] Implement `POST /api/contact`
- [ ] Implement `GET /api/contacts`
- [ ] Implement `GET /api/contacts/:id`
- [ ] Implement `PATCH /api/contacts/:id/status`
- [ ] Implement `DELETE /api/contacts/:id`

## Phase 3 — Dashboard

- [ ] Create React + Vite project
- [ ] Configure TypeScript
- [ ] Configure Tailwind CSS
- [ ] Configure API client
- [ ] Implement backend connection status
- [ ] Implement statistics cards
- [ ] Implement inquiry table
- [ ] Implement search
- [ ] Implement status filters
- [ ] Implement inquiry details
- [ ] Implement status updates
- [ ] Add frontend launcher

## Phase 4 — Frontend Integration

- [ ] Add `NEXT_PUBLIC_API_URL`
- [ ] Update contact API route
- [ ] Forward form submissions to Express
- [ ] Handle loading states
- [ ] Handle validation errors
- [ ] Handle API failures
- [ ] Handle successful submissions

## Phase 5 — Testing

- [ ] Test backend health endpoint
- [ ] Test contact API
- [ ] Test dashboard API connection
- [ ] Test frontend contact form
- [ ] Test dashboard lead display
- [ ] Test lead status updates
- [ ] Test production builds
- [ ] Perform complete end-to-end test

## Phase 6 — Production

- [ ] Replace in-memory repository with MongoDB
- [ ] Add authentication
- [ ] Add authorization
- [ ] Add rate limiting
- [ ] Add Helmet
- [ ] Configure production CORS
- [ ] Configure production environment variables
- [ ] Configure logging
- [ ] Configure monitoring
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Deploy dashboard
- [ ] Verify production API communication

---

# 29. Final Architecture

The final NOVARCH architecture should follow:

```text
                     NOVARCH
                        │
            ┌───────────┴───────────┐
            │                       │
            ▼                       ▼
       Public Website          Admin Portal
        Next.js 16             React + Vite
          :3000                   :5173
            │                       │
            │                       │
            └───────────┬───────────┘
                        │
                        ▼
                 Express REST API
                     :5000
                     /api
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
       Contacts      Dashboard     Future APIs
        Service        Service      & Modules
          │             │
          └──────┬──────┘
                 ▼
           Repository Layer
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   In-Memory           MongoDB
   Development         Production
```

---

# 30. Architecture Principles

The NOVARCH system should follow these principles:

1. **Separation of concerns** — frontend, backend, and dashboard remain independent applications.
2. **Layered backend architecture** — routes, controllers, services, and repositories should have clear responsibilities.
3. **Centralized API communication** — dashboard and frontend should use dedicated API clients/handlers.
4. **Environment-based configuration** — URLs, secrets, CORS origins, and database credentials should not be hard-coded.
5. **Validation at the backend** — client-side validation improves UX, but backend validation remains authoritative.
6. **Database abstraction** — services should not depend directly on MongoDB implementation details.
7. **Production security from the beginning** — architecture should allow authentication, rate limiting, authorization, and monitoring.
8. **Independent deployment** — frontend, backend, and dashboard should be deployable separately.
9. **Scalability** — new modules should be added without restructuring the entire application.
10. **Maintainability** — code should favor clear boundaries and reusable services over large monolithic files.

---

# Final Recommendation

The proposed 3-tier architecture is the correct foundation for NOVARCH.

The most important improvement over a basic implementation is to use:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Database
```

from the beginning.

The initial in-memory repository can be used for development, while the repository abstraction allows a future MongoDB implementation without rewriting the application's controllers or services.

This gives NOVARCH a foundation that can grow from a marketing website + contact form into a full software/AI systems platform with CRM, client management, analytics, automated workflows, projects, and AI-powered functionality.
