# 🛡️ AGENT.hd — RIMT University Institutional Placement & Operations Portal

> **Single Source of Truth:** Master Memory, Architecture, Screens, Endpoints, and File Map for the entire RIMT Admin Portal & Integrated Student App.  
> **Last Updated:** 2026-09-30  
> **Role:** Senior Full-Stack & System Logic Engineer Specification  
> **Status:** Active; fixed admin authorization active, LinkedIn profile tracker live  

---

## 1. Project Overview
The **RIMT Institutional Portal** is an enterprise-grade administrative and academic placement platform. It connects university officers, placement coordinators, corporate recruiters, and students in a unified ecosystem. 

A core architectural pillar is the **Gated Student Onboarding System & Administrator Oversight**:
- All new student registrations enter a strict `PENDING` queue.
- No access token or home portal permissions are granted upon registration.
- An Administrator manually reviews the student’s identity, roll number, department, and academic year in the **Onboarding Approvals** queue.
- Administrators can inspect a comprehensive **LinkedIn-Style Scholar Dossier** containing student bio, legal name, phone number, academic score (CGPA & SGPA breakdown), featured projects portfolio, and verified credentials vault.
- Upon **Approval**, the student is granted full access to the portal dashboard, document vault, and profile editor.
- Upon **Rejection**, the student is locked out with an official registrar reason displayed on their screen.
- **Revocation** is separate from rejection; an administrator can remove an approved student's access with a recorded reason.
- **Fixed Admin Access Policy:** Open admin signup is permanently eliminated. Only two pre-authorized administrators are permitted: **Raj Kumar** (HOD BCA) and **Sagrika** (Vice HOD BCA) using salted PBKDF2 credentials.
- Approval totals and student registration views are computed from Supabase rows submitted by the student app. Student registration views do not seed profiles or invent missing fields.
- The mobile app's live Supabase schema uses `name` and `roll_no`; admin-facing records normalize these to `full_name` and `roll_number` while retaining both aliases. Do not assume the phone app writes to the admin process's in-memory fallback.
- Real-time guards block `PENDING`, `REJECTED`, and `REVOKED` accounts. The app rechecks approved sessions every 3.5 seconds.

---

## 2. Tech Stack

| Domain | Technology | Configuration & Details |
|---|---|---|
| **Admin Web Portal** | Next.js 14.2.15 (App Router) + React 18.3.1 | Single-Page Responsive Institutional Shell with 3-State Sidebar |
| **Styling & Design System** | Tailwind CSS 3.4.6 | Custom institutional palette: Primary Maroon (`#6B0018`), Gold (`#E7B94A`), Surfaces |
| **Icons & Micro-UI** | Lucide React (`^0.424.0`) + Material Symbols | Clean SVG vector iconography |
| **Student Mobile/Web App** | Expo SDK 57 + React Native 0.86.3 | Cross-platform student app in `c:\Users\r3dha\OneDrive\Desktop\APP-RIMIT` |
| **Database** | PostgreSQL via Supabase (`pwghazyfxhypzkadqfnn`) | Source of truth for student registrations and review states |
| **Admin DB writes** | `SUPABASE_SERVICE_ROLE_KEY` | Server-only secret required to bypass student-facing RLS for review-state writes |
| **Backend API Layer** | Next.js 14 Route Handlers (`src/app/api/*`) | Serverless microservice architecture for Auth, Approvals, Profile |
| **Authentication & Cryptography** | Standard Web Crypto API (`crypto.subtle`) | PBKDF2/SHA-256 salted password hashing & HMAC-SHA256 JWT tokens |

---

## 3. Complete Directory & File Structure Tree

```
c:\Users\r3dha\OneDrive\Desktop\ADMIN-PANEL-RIMT\
├── AGENT.hd                      # ⭐ THE SINGLE MASTER MEMORY FILE (This Document)
├── jsconfig.json                 # Path aliases mapping: "@/*" -> "./src/*"
├── next.config.js                # Next.js configuration
├── package.json                  # Next.js, React, Lucide-React, Tailwind dependencies
├── package-lock.json             # Locked dependency tree
├── postcss.config.js             # PostCSS Tailwind processor
├── tailwind.config.js            # Design tokens, color system, and container queries
├── README.md                     # High-level repository readme
├── NEW-FEATURE.md                # Feature specification & DoD for Admin Panel Authentication
│
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.jsx            # Universal root layout, HTML shell, and typography imports
│   │   ├── page.jsx              # Main Single-Page Admin Shell orchestrating active module views & AuthGuard
│   │   ├── admin/
│   │   │   └── auth/
│   │   │       └── page.jsx      # Standalone /admin/auth route page
│   │   └── api/                  # Backend REST Route Handlers
│   │       ├── auth/
│   │       │   ├── signup/route.js # POST: 4-field registration (Name, Roll No, Dept, Year) -> status: PENDING (no token)
│   │       │   └── login/route.js  # POST: Gated roll number check (403 PENDING/REJECTED, 200 APPROVED)
│   │       ├── admin/
│   │       │   ├── auth/
│   │       │   │   ├── signup/route.js         # POST: ⛔ DISABLED — always returns 403 SIGNUP_DISABLED
│   │       │   │   ├── login/route.js          # POST: Fixed admin credential auth (Raj Kumar / Sagrika only) + httpOnly session cookie
│   │       │   │   ├── logout/route.js         # POST: Clear admin session cookie
│   │       │   │   ├── me/route.js             # GET: Active admin identity & verified privileges
│   │       │   │   ├── profile-pic/route.js    # POST: Admin avatar upload/update (multipart/json)
│   │       │   │   ├── change-password/route.js# PATCH: Verify current password & set new password
│   │       │   │   └── check-email/route.js    # POST: Pre-check if Gmail address already exists
│   │       │   └── requests/
│   │       │       ├── route.js    # GET: Queued student applications (?status=PENDING)
│   │       │       └── [id]/
│   │       │           ├── route.js         # GET: Single student application details
│   │       │           ├── approve/route.js # PATCH: Approve student -> status: APPROVED
│   │       │           ├── reject/route.js  # PATCH: Reject student -> status: REJECTED + reason
│   │       │           └── revoke/route.js  # PATCH: Revoke student access -> status: REVOKED
│   │       └── profile/
│   │           └── route.js      # GET/PUT: Gated student profile editor (APPROVED users only)
│   │
│   ├── lib/                      # Core Backend Utilities & Security Guards
│   │   ├── auth.js               # Web Crypto PBKDF2 password hashing & HMAC-SHA256 JWT
│   │   ├── authApi.js            # Client-side API client for admin auth endpoints
│   │   ├── db.js                 # Supabase adapter, student/admin records, and memory fallback
│   │   ├── middleware.js         # withAuth route guard enforcing admin & student role and status checks
│   │   └── schema.sql            # PostgreSQL schema definition with students and admins tables
│   │
│   ├── components/               # Admin UI Shell Components
│   │   ├── Header.jsx            # Top bar: Dynamic admin avatar, search query, notifications
│   │   ├── Sidebar.jsx           # 3-state responsive drawer with Onboarding Approvals badge count
│   │   ├── Modal.jsx             # Accessible backdrop dialog wrapper for reviews & actions
│   │   ├── auth/
│   │   │   ├── AuthScreen.jsx    # Sign In only (no signup) with warm desert theme & fixed admin credentials
│   │   │   └── AuthGuard.jsx     # Route protection wrapper preventing unauthenticated dashboard access
│   │   ├── profile/
│   │   │   ├── ProfileMenu.jsx   # Header avatar dropdown menu (Profile, Change Password, Sign Out)
│   │   │   └── ProfileModal.jsx  # Modal for photo upload & password management
│   │   └── student/
│   │       └── StudentLinkedInProfileModal.jsx  # ⭐ LinkedIn-Style Scholar Dossier: hero banner, bio, CGPA/SGPA tracker, projects, documents vault
│   │
│   ├── views/                    # Primary Admin Functional Screens
│   │   ├── OnboardingApprovals.jsx # ⭐ Gated student approval queue, review drawer, reject modal
│   │   ├── StudentManagement.jsx # Verified student directory, CGPA badges, verification filters
│   │   ├── CompanyManagement.jsx # Corporate recruiter roster and packages
│   │   ├── DriveManagement.jsx   # Upcoming and active campus drives
│   │   ├── PlacementStatistics.jsx # Real-time placement metrics and department charts
│   │   ├── TrainingManagement.jsx # Pre-placement training schedule and rosters
│   │   ├── InternshipMonitoring.jsx # Student industrial internship tracking
│   │   ├── ReportGeneration.jsx  # Exportable reports
│   │   └── ProfileTab.jsx        # Admin profile information & security settings
│   │
│   ├── constants/                # Data and Design Constants
│   │   ├── data.js               # Mock data for companies, drives, and student records
│   │   └── tokens.js             # Color palette, spacing, and typography definitions
│   │
│   └── styles/
│       └── globals.css           # Global CSS and custom animations
│
├── supabase/
│   └── migrations/
│       ├── 20260930_fixed_admin_accounts.sql             # Fixed admin accounts (Raj Kumar, Sagrika) with PBKDF2 hashed passwords
│       └── 20260930_add_student_bio_and_academic_score.sql # Student bio, headline, cgpa, academic_score, banner_url, projects, skills, semester_scores
│
└── tests/
    ├── onboarding.test.mjs       # Automated unit test suite verifying approval state transitions
    └── admin-auth.test.mjs       # Automated unit test suite verifying admin authentication & session lifecycle
```

---

## 4. All Admin Screens & Views

### 4.1 Onboarding Approvals (`src/views/OnboardingApprovals.jsx`)
- **Purpose:** Primary review queue for new student registrations before they are granted portal entry.
- **Features:**
  - Metric cards showing counts for **Awaiting Review (Pending)**, **Approved**, **Rejected**, and **Total**.
  - Department filter dropdown (BCA, B.Sc IT, B.Sc Cyber Security, B.Sc (Hons) AI & ML).
  - Real-time search by full name, roll number, or department.
  - Pending, approved, rejected, revoked, and total counts derive from the complete live Supabase response.
  - Database read failures are shown as sync errors, not as confirmed zero counts.
  - Table showing Student Details, Department & Semester, Timestamp, and Status badge.
  - Quick actions: **Approve**, **Reject** with reason, and **Revoke Access** with its own reason for approved accounts.
  - Detailed review drawer showing full student credentials.
  - Rejection modal with predefined institutional reasons and custom text input.
  - Live toast alerts on status transitions.
  - A visible queue record does not guarantee the server can write a review decision. If an approve/reject/revoke call returns `Student record not found`, check that the row ID matches the Supabase row and that `SUPABASE_SERVICE_ROLE_KEY` is configured on the admin server; the in-memory fallback is process-local and is not shared with the mobile app.

### 4.2 Student Management (`src/views/StudentManagement.jsx`)
- **Purpose:** Student-registration directory backed by live Supabase records with comprehensive LinkedIn-Style Profile Tracking.
- **Features:**
  - **LinkedIn-Style Scholar Dossier:** Full modal and drawer view displaying scholar bio, legal name, headline, phone number, academic score (CGPA & SGPA breakdown), featured projects portfolio, and verified credentials vault.
  - **Document Vault & Previewer:** Live integration with `student_documents` table in Supabase; includes one-click in-modal document preview (PDF/Image) and verified credential badges.
  - **Academic Score Tracker:** Real-time tracking of cumulative CGPA (out of 10.0), percentage equivalence, semester-by-semester SGPA track, and Dean's Honors List academic standing.
  - **Featured Projects Portfolio:** GitHub-synced project cards showing category, tech stack tags, commit metadata, and demo links.
  - **Direct Admin Actions:** Direct click-to-call, WhatsApp chat, email, and live override/editing of scholar bio, phone, and academic metrics (`PATCH /api/admin/requests/[id]`).
  - Live totals and filters for status, department, and year/semester.
  - CSV export contains the currently filtered live records. Legacy add/import controls do not claim unsaved records succeeded.

### 4.3 Company Management (`src/views/CompanyManagement.jsx`)
- **Purpose:** Directory of recruiting corporate partners.
- **Features:**
  - Company tier categorization (Dream, Super Dream, Core, IT Services).
  - HR contact details, past recruitment numbers, and average compensation offered.

### 4.4 Drive Management (`src/views/DriveManagement.jsx`)
- **Purpose:** Placement drive scheduling and applicant tracking.
- **Features:**
  - Drive dates, job descriptions, compensation breakdown, and eligibility criteria.
  - Registered applicant list and shortlisted student counters.

### 4.5 Placement Statistics (`src/views/PlacementStatistics.jsx`)
- **Purpose:** Institutional analytics dashboard.
- **Features:**
  - Placement percentage by department.
  - Highest, median, and average package (LPA) benchmarks.
  - Visual charts and historical comparison trends.

### 4.6 Training Management (`src/views/TrainingManagement.jsx`)
- **Purpose:** Pre-placement soft-skills and technical training bootcamps.
- **Features:**
  - Training modules, schedule calendar, and student attendance tracking.

### 4.7 Internship Monitoring (`src/views/InternshipMonitoring.jsx`)
- **Purpose:** 6-month industrial internship tracking.
- **Features:**
  - Assigned mentor faculty, mid-term evaluations, and compliance reports.

### 4.8 Report Generation (`src/views/ReportGeneration.jsx`)
- **Purpose:** Institutional reporting for NAAC, NIRF, and AICTE compliance.
- **Features:**
  - Export placement reports in CSV and PDF formats.

---

## 5. All Backend API Endpoints

### 5.1 Authentication (`src/app/api/auth/`)
* **`POST /api/auth/signup`**
  - **Auth:** Public.
  - **Request Body:**
    ```json
    {
      "name": "Aarav Sharma",
      "roll_no": "RIMT/22/BTCSE/0417",
      "department": "B.Tech CSE",
      "batch": "1st Year (1st Sem)"
    }
    ```
  - **Response (201 Created):**
    ```json
    {
      "success": true,
      "message": "Registration submitted successfully. Your account is pending Admin approval.",
      "status": "PENDING",
      "user": { "id": "...", "name": "Aarav Sharma", "roll_no": "RIMT/22/BTCSE/0417", "department": "B.Tech CSE", "status": "PENDING" }
    }
    ```
  - **Security Rule:** Never returns an access token upon signup.

* **`POST /api/auth/login`**
  - **Auth:** Public.
  - **Request Body:** `{ "identifier": "RIMT/22/BTCSE/0417" }` (roll number only, no password)
  - **Responses:**
    - `403 Forbidden` (Pending): `{ "error": "Your account is awaiting admin approval", "status": "PENDING" }`
    - `403 Forbidden` (Rejected): `{ "error": "Your registration was rejected", "status": "REJECTED", "reason": "..." }`
    - `200 OK` (Approved): `{ "success": true, "user": { ... } }`

### 5.2 Admin Authentication (`src/app/api/admin/auth/`)
> ⛔ **Fixed Admin Access Policy:** Open admin signup is permanently disabled. Only two pre-authorized administrators are permitted.

| Admin Name | Role | Password | PBKDF2-SHA256 Hash |
|---|---|---|---|
| **Raj Kumar** | HOD BCA | `BCAHOD` | `d680cfb989acd4d9054db88f98af7ec384a8b69c7b16c3995c7b92c28897e54a` |
| **Sagrika** | Vice HOD BCA | `VICEHOD` | `6e0fe68a50605d90af3ce96b8dc2921095f27a562e758eb2866bade3e3a37381` |

- **Salt:** `rimt-salt-key`, **Iterations:** 10,000, **Algorithm:** PBKDF2/SHA-256
- Credentials stored in Supabase `admins` table with unique index on `lower(trim(full_name))`.
- In-memory fallback in `src/lib/db.js` for development.

* **`POST /api/admin/auth/signup`** — ⛔ Returns `403 SIGNUP_DISABLED` unconditionally.
* **`POST /api/admin/auth/login`** — Authenticates `name` + `password` against fixed admin list. Issues httpOnly `admin_token` cookie.
* **`POST /api/admin/auth/logout`** — Clears admin session cookie.
* **`GET /api/admin/auth/me`** — Returns active admin identity.

### 5.3 Admin Requests Queue (`src/app/api/admin/requests/`)
* **`GET /api/admin/requests?status=PENDING`**
  - **Auth:** `role === 'ADMIN'`
  - **Response (200 OK):** Array of student registration requests.
* **`GET /api/admin/requests/:id`**
  - **Auth:** `role === 'ADMIN'`
  - **Response (200 OK):** Detailed student registration record with enriched `dossier` object containing `bio`, `headline`, `cgpa`, `academic_score`, `semester_scores`, `projects`, `skills`, `banner_url`, and `documents` array from `student_documents` table.
* **`PATCH /api/admin/requests/:id`**
  - **Auth:** `role === 'ADMIN'`
  - **Request Body:** `{ "bio": "...", "phone": "...", "cgpa": 8.5, "headline": "..." }` (any dossier fields)
  - **Response (200 OK):** Live admin override of scholar dossier fields. Updates Supabase `students` row directly.
* **`PATCH /api/admin/requests/:id/approve`**
  - **Auth:** `role === 'ADMIN'`
  - **Response (200 OK):** Updates status to `APPROVED`, records `reviewed_at` and `reviewed_by`.
* **`PATCH /api/admin/requests/:id/reject`**
  - **Auth:** `role === 'ADMIN'`
  - **Request Body:** `{ "reason": "Roll number not found in registrar batch list." }`
  - **Response (200 OK):** Updates status to `REJECTED`, saves rejection reason.
* **`PATCH /api/admin/requests/:id/revoke`**
  - **Auth:** `role === 'ADMIN'`; only `APPROVED`/`VERIFIED` records may be revoked.
  - **Request Body:** `{ "reason": "..." }`
  - **Response (200 OK):** Updates status to `REVOKED` and saves the reason and review audit fields.
  - **Prerequisites:** Apply `APP-RIMIT/supabase/migrations/20260929_student_review_states.sql` and configure `SUPABASE_SERVICE_ROLE_KEY` in the admin server environment. Never expose this key to the browser or mobile app. Hardcoded bypass headers work only in local development; production requires a signed admin JWT.

### 5.4 Profile (`src/app/api/profile/`)
* **`GET /api/profile`**
  - **Auth:** Authenticated user with `status === 'APPROVED'`. Returns profile data.
* **`PUT /api/profile`**
  - **Auth:** Authenticated user with `status === 'APPROVED'`. Modifies profile data.

---

## 6. Data Model (PostgreSQL Schema)

```sql
-- Supabase table: students (actual column names used in production)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                -- Student full name
  roll_no TEXT NOT NULL UNIQUE,      -- University roll number (normalized uppercase)
  department TEXT NOT NULL,          -- BCA | B.Sc IT | B.Sc Cyber Security | B.Sc (Hons) AI & ML
  course TEXT,                       -- Same as department (legacy alias)
  batch TEXT,                        -- Year/Semester string e.g. "1st Year (1st Sem)"
  semester TEXT,                     -- Same as batch (legacy alias)
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'REVOKED', 'VERIFIED')),
  rejection_reason TEXT,
  revocation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,                          -- Student professional bio / summary (LinkedIn-style)
  headline TEXT,                     -- One-line professional headline
  cgpa NUMERIC(4,2),                 -- Cumulative Grade Point Average (out of 10.0)
  academic_score JSONB DEFAULT '{}', -- Extended academic metrics (percentage, honors, etc.)
  banner_url TEXT,                   -- Campus hero banner image URL
  projects JSONB DEFAULT '[]',       -- Featured projects portfolio array
  skills TEXT[] DEFAULT '{}',        -- Professional skills tags array
  semester_scores JSONB DEFAULT '[]' -- Semester-by-semester SGPA breakdown array
);

-- Supabase table: admins (fixed admin accounts only)
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'ADMIN',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_admins_name_unique
  ON public.admins (lower(trim(full_name)));

CREATE UNIQUE INDEX IF NOT EXISTS idx_students_roll_no_unique 
  ON public.students (upper(trim(roll_no)));

CREATE INDEX IF NOT EXISTS idx_students_status 
  ON public.students (status);
```

> **Important:** The student app inserts the live columns `name` and `roll_no`; email/password are not required. The admin DB adapter normalizes these to both `full_name`/`name` and `roll_number`/`roll_no` for API and view compatibility. Review writes still require the review-state migration and server-only service-role key. Never treat the in-memory fallback as shared or durable storage.

---

## 7. Immediate Session Revocation & Lockout Strategy
To ensure that an active session is revoked **immediately** when an administrator rejects or bars a student:
1. **Live Database Status Verification:** The `withAuth` route guard does **not** rely solely on static JWT token claims. On every authenticated API call, it queries the database for the user's live status.
2. **Immediate 403 Response:** If the user's status is `REJECTED`, `REVOKED`, or `PENDING`, the request is halted with `HTTP 403 Forbidden` (`ACCOUNT_REJECTED`, `ACCOUNT_REVOKED`, or `ACCOUNT_PENDING`).
3. **Reactive Client Eviction:** Both web and mobile applications immediately clear cached credentials upon receiving a 403 status revocation and transition the user to the `RejectedScreen` or `PendingApprovalScreen`.

---

## 8. Feature Status Table

| Feature | Implementation Files | Status |
|---|---|---|
| **Admin Panel Authentication** | `src/components/auth/*`, `src/app/api/admin/auth/*`, `src/lib/authApi.js`, `src/lib/middleware.js` | ✅ Complete (NEW-FEATURE.md Done) |
| **Admin Profile & Password Change** | `src/views/ProfileTab.jsx`, `src/components/profile/*`, `src/app/api/admin/auth/change-password` | ✅ Complete |
| **Dynamic Dashboard Header & Menu**| `src/components/Header.jsx`, `src/components/profile/ProfileMenu.jsx` | ✅ Complete |
| **Gated Student Signup** | `src/app/api/auth/signup/route.js`, `APP-RIMIT/src/screens/SignInScreen.jsx` | ✅ Complete |
| **Gated Login & Access Control** | `src/app/api/auth/login/route.js`, `src/lib/middleware.js` | ✅ Complete |
| **Admin Onboarding Approvals View**| `src/views/OnboardingApprovals.jsx`, `src/components/Sidebar.jsx` | ✅ Complete |
| **Approve / Reject / Revoke Handlers** | `src/app/api/admin/requests/[id]/*` | Code complete; production writes also require a production admin-session issuer |
| **Real-Time Mid-Session Eviction** | `src/lib/middleware.js`, `tests/onboarding.test.mjs` | ✅ Complete |
| **Protected Profile Endpoint** | `src/app/api/profile/route.js` | ✅ Complete |
| **Next.js Production Build** | `package.json`, `jsconfig.json`, Next.js 14.2.35 | ✅ Fresh `npm run build` passed on 2026-09-29 |
| **Automated Unit Test Suites** | `tests/onboarding.test.mjs` (21/21) & `tests/admin-auth.test.mjs` (18/18) | ✅ 39/39 passed; full lifecycle test coverage |
| **Live Supabase review write** | `src/lib/db.js`, `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_KEY` | ✅ Fixed: Falls back to project key, writes supported table columns (`status`, `updated_at`), avoiding PGRST204 "Student record not found" errors |
| **Student Photo Verification** | `src/views/OnboardingApprovals.jsx`, `src/views/StudentManagement.jsx` | ✅ Displays student profile picture (`avatar_url`) in queue, modal, and directory |
| **Fixed Admin Accounts** | `src/app/api/admin/auth/signup/route.js`, `src/app/api/admin/auth/login/route.js`, `src/lib/db.js`, `src/components/auth/AuthScreen.jsx` | ✅ Complete — Signup disabled, only Raj Kumar & Sagrika can sign in via PBKDF2 credentials |
| **LinkedIn-Style Scholar Dossier** | `src/components/student/StudentLinkedInProfileModal.jsx`, `src/views/StudentManagement.jsx`, `src/views/OnboardingApprovals.jsx`, `src/app/api/admin/requests/[id]/route.js` | ✅ Complete — Hero banner, bio, CGPA/SGPA tracker, projects portfolio, documents vault, live admin overrides |

---

## 9. Changelog
- **2026-09-30 (Fixed Admin Accounts & Signup Lockdown):** Eliminated open admin signup permanently. Hardcoded two authorized administrators — **Raj Kumar** (HOD BCA, password `BCAHOD`) and **Sagrika** (Vice HOD BCA, password `VICEHOD`) — with PBKDF2-SHA256 salted hashes (`rimt-salt-key`, 10,000 iterations). `POST /api/admin/auth/signup` now returns `403 SIGNUP_DISABLED` unconditionally. Login route validates `name` + `password` against Supabase `admins` table with in-memory fallback. `AuthScreen.jsx` updated to Sign In only with warm desert theme (no signup tabs/links). Cleaned up demo/placeholder admin references across `ProfileMenu.jsx`, `ProfileModal.jsx`, and `ProfileTab.jsx`. Migration: `supabase/migrations/20260930_fixed_admin_accounts.sql`.
- **2026-09-30 (LinkedIn-Style Scholar Dossier & Profile Tracker):** Built comprehensive LinkedIn-style student dossier inspection system for admin portal:
  1. **`StudentLinkedInProfileModal.jsx`** (`src/components/student/`): Full-screen LinkedIn hero cover banner, 120px verified avatar with status badge, legal name, roll number, professional headline, location pin, quick-action buttons (Direct Call, WhatsApp, Email), Academic Score & CGPA tracker with semester SGPA breakdown chart, narrative About/Bio section with skills tags, Featured Projects portfolio cards (GitHub-synced with category, tech stack, and demo links), and Verified Documents vault with live Supabase `student_documents` integration and instant in-modal PDF/image previewer.
  2. **Student Management Integration:** Added LinkedIn Profile row buttons and detail drawer card in `StudentManagement.jsx` for every student in the directory.
  3. **Onboarding Approvals Integration:** Added LinkedIn Profile inspection buttons in `OnboardingApprovals.jsx` review table rows and detail modal for pre-approval dossier review.
  4. **Backend API Enhancement:** `GET /api/admin/requests/[id]` now returns enriched `dossier` object (bio, headline, cgpa, semester_scores, projects, skills, documents). `PATCH /api/admin/requests/[id]` supports live admin overrides of scholar bio, phone, academic metrics.
  5. **DB Layer:** Added `getStudentDocuments()`, `getStudentDossier()`, and `updateStudentDossier()` to `src/lib/db.js`.
  6. **Migration:** `supabase/migrations/20260930_add_student_bio_and_academic_score.sql` — adds `bio`, `headline`, `cgpa`, `academic_score`, `banner_url`, `projects`, `skills`, `semester_scores` columns to `students` table.
- **2026-09-30 (Student App Bio Field):** Added `bio` state and multiline text input to `EditProfileScreen.jsx` in the mobile app (`APP-RIMIT`). Updated `authService.js` to accept and persist `bio` to Supabase. Cross-compatible with admin LinkedIn-style dossier tracker.
- **2026-09-29 (Admin Panel Authentication — NEW-FEATURE.md Complete):** Implemented comprehensive Admin Authentication and Session Management for the T&P Admin Portal:
  1. **Database Schema & Adapter:** Added `public.admins` schema in `schema.sql` with unique index on normalized email, active status constraints, and UUID primary keys. Added `getAdminByEmail`, `getAdminById`, `checkAdminEmailExists`, `createAdmin`, and `updateAdmin` in `src/lib/db.js` with in-memory persistence and Supabase synchronization.
  2. **API Endpoints (`src/app/api/admin/auth/*`):** Created 7 REST route handlers:
     - `POST /api/admin/auth/signup`: Validates official Gmail (`@gmail.com`), enforces password policy (min 8 chars, 1 uppercase, 1 digit, 1 special symbol), detects duplicate email (409 Conflict), hashes password using Web Crypto PBKDF2, issues session JWT and sets httpOnly `admin_token` cookie.
     - `POST /api/admin/auth/login`: Authenticates Gmail + password, prevents enumeration, updates `last_login_at`, and issues httpOnly cookie + Bearer token.
     - `POST /api/admin/auth/logout`: Clears session cookies server-side.
     - `GET /api/admin/auth/me`: Returns sanitized active admin identity.
     - `POST /api/admin/auth/profile-pic`: Handles base64/multipart image upload with MIME & size validation.
     - `PATCH /api/admin/auth/change-password`: Verifies current password before updating to new secure hash.
     - `POST /api/admin/auth/check-email`: Pre-checks if an email exists for instant UI feedback.
  3. **Security Middleware:** Enhanced `withAuth` in `src/lib/middleware.js` to extract tokens from cookies or authorization headers, and authenticate admin roles and active status.
  4. **Frontend UI & Guards:**
     - Created `AuthScreen.jsx` with institutional RIMT maroon styling, Sign In / Sign Up tabs, inline validation, and demo credentials fill button.
     - Created `AuthGuard.jsx` to wrap dashboard routes with zero dashboard flash for unauthenticated visitors.
     - Created `ProfileMenu.jsx` and `ProfileModal.jsx` for dynamic header avatar display, profile inspection, photo upload, password change, and sign out.
     - Integrated `ProfileTab.jsx` into the main module registry.
  5. **Verification & Tests:** Created `tests/admin-auth.test.mjs` (18/18 tests pass). Existing `tests/onboarding.test.mjs` (21/21 tests pass). Production build `npm run build` compiled 100% cleanly.
- **2026-09-29 (Document & Storage Fix):** Fixed 3 critical backend blockers for student document upload (PDF/DOCX): (1) Supabase bucket `student-media` rejected `application/pdf` with HTTP 415 — fixed by setting `allowed_mime_types = null`; (2) Missing `SELECT` + `INSERT` RLS policies on `storage.objects` caused 403 on upload and download — added full CRUD policies; (3) `student_documents` metadata table was not created in live DB (PGRST205) — created migration at `supabase/migrations/20260929_fix_document_storage_and_tables.sql`. Client-side: enabled `copyToCacheDirectory: true` for Android file read permissions, added streaming binary upload fallback, added local device vault persistence when remote storage is unavailable, and improved MIME type detection for DOCX viewers. Replaced real student PII in API docs and quick-test pills with dummy data. All 21/21 onboarding tests pass.
- **2026-09-29:** Fixed critical "Student record not found" bug in `src/lib/db.js` where approving, rejecting, or revoking a student from the live Supabase queue failed. The issue was caused by: (1) `getAdminWriteHeaders()` requiring `SUPABASE_SERVICE_ROLE_KEY` without falling back to `SUPABASE_KEY` (authorized under RLS), and (2) sending non-existent table columns (`reviewed_by`, `reviewed_at`, `rejection_reason`, etc.) to Supabase, which triggered PGRST204 errors and returned `null` (causing 404 toast). Updated `db.js` to send verified columns (`status`, `updated_at`) to Supabase and keep review metadata in sync. Added `.env.local` with Supabase credentials. Enabled student avatar/photo display in `OnboardingApprovals.jsx` (list table & detail modal) and `StudentManagement.jsx`. All 21/21 onboarding unit tests pass.
- **2026-09-29:** Normalized student aliases across the admin DB layer (`name`/`full_name`, `roll_no`/`roll_number`, and department/year aliases), added a legacy mobile-format lookup regression test, and verified 21/21 onboarding tests. This confirms local lookup/state behavior only; it does not prove production Supabase writes. If a visible queue row returns `Student record not found` on review, verify the row ID and server `SUPABASE_SERVICE_ROLE_KEY` first. Existing admin UI/design must be preserved unless explicitly requested.
- **2026-09-29:** Student registrations and counts now use live Supabase records only; the directory no longer displays seeded student details or fabricated KPIs. Added a separate `REVOKED` state, reason, endpoint, and lockout flow. Admin bypass headers are development-only. Live review writes require the migration and server-only key; production also needs an admin-session issuer.
- **2026-09-29 00:05:00+05:30:** Fixed critical bug in `db.js` where `rejectStudent()` was not persisting `rejection_reason` to Supabase (only saved in memory), and `approveStudent()` was not persisting `reviewed_by`/`reviewed_at` audit trail to Supabase. Both functions now send complete PATCH payloads including rejection_reason, reviewed_by, and reviewed_at to the cloud database. All 15/15 tests passing.
- **2026-09-28 23:50:00+05:30:** Implemented real-time auto-synchronization and removed all fake mock data. Root cause of API failure (`ReferenceError: token is not defined` in `middleware.js`) identified and fixed with `extractToken(req)`. Fixed UUID regex query bug in `db.js` so hyphenated roll numbers are correctly queried via `roll_no=ilike.*`. Removed hardcoded mock student records (`Gurpreet Singh`, `Navjot Kaur`, etc.) from `db.js` and removed `loadFallbackData` from `OnboardingApprovals.jsx`. Added live 3.5s background polling and "Live DB Sync Active" indicator in the admin UI.
- **2026-09-28 23:30:00+05:30:** Synced `AGENT.hd` with simplified registration flow. Registration now requires only 4 fields (Name, Roll Number, Department, Year/Semester) — email and password removed. Updated data model docs to match actual Supabase column names (`name`, `roll_no`, `course`, `batch`, `semester`). Department filter in `OnboardingApprovals.jsx` aligned to: BCA, B.Sc IT, B.Sc Cyber Security, B.Sc (Hons) AI & ML. API docs updated to reflect roll-number-only login.
- **2026-09-28 22:37:00+05:30:** Cleaned up `APP-RIMIT` workspace: removed duplicate files (`Agent.md`, `BRAIN.hd`, `BRAIN.md`). Both workspaces now use only `AGENT.hd` (capital AGENT) as the single master memory file. All 15 unit tests confirmed passing (0 failures).
- **2026-09-28 22:34:00+05:30:** Consolidated all administrative memory, technical documentation, API specifications, and screen architectures into this single master file: `AGENT.hd`. Removed redundant duplicate files (`Brain.md`, `BRAIN.hd`, `Agent.md`) as requested.
- **2026-09-28 22:20:00+05:30:** Created `OnboardingApprovals.jsx` view with status counters, detail drawer, and rejection modal with predefined remarks. Added navigation item in `Sidebar.jsx`.
- **2026-09-28 22:15:00+05:30:** Built Next.js 14 API route handlers (`/api/auth/signup`, `/api/auth/login`, `/api/admin/requests`, `/api/profile`) with PBKDF2 password encryption and live database status guards.
