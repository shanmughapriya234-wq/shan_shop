# Squashies Shop Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the smallest runnable Next.js and FastAPI foundation, containerized for development and production, with persistent SQLite storage reserved for later tasks.

**Architecture:** Keep `frontend/` and `backend/` as separate applications. Docker Compose runs both services for development and mounts a named volume at `/data` for the database; each app also has a production Dockerfile. The API exposes only a health endpoint in this task.

**Tech Stack:** Next.js, TypeScript, npm, FastAPI, Uvicorn, SQLite, pytest, Docker Compose.

**Spec:** [2026-11-17-squashies-shop-foundation-design.md](../specs/2026-11-17-squashies-shop-foundation-design.md)

## Global Constraints

- Next.js frontend and FastAPI REST backend, using SQLite.
- Docker for development and deployment.
- Adult accounts are optional; guest checkout is allowed. Children can browse and customize without accounts.
- Stripe-hosted Checkout; never store card data.
- Product images go in a Docker-persisted public media directory served by FastAPI; SQLite stores their metadata and paths.
- Certification evidence is private until an admin explicitly publishes it for customer download.
- Germany-only launch with configurable flat shipping.
- Keep tax settings undecided until professional advice; do not enable live checkout until confirmed.
- German legal and product-safety content needs qualified review.

## Review Focus

No product inputs or customer-facing behavior beyond the API health response are introduced in this foundation task.

---

### Task 1: Application and Docker Foundation

**Files:**
- Create: `.gitignore`
- Create: `compose.yaml`
- Create: `backend/app/__init__.py`
- Create: `backend/app/main.py`
- Create: `backend/tests/test_health.py`
- Create: `backend/requirements.txt`
- Create: `backend/requirements-dev.txt`
- Create: `backend/Dockerfile`
- Create: `backend/Dockerfile.dev`
- Create: `backend/.dockerignore`
- Create: `frontend/app/layout.tsx`
- Create: `frontend/app/page.tsx`
- Create: `frontend/app/globals.css`
- Create: `frontend/public/.gitkeep`
- Create: `frontend/next.config.ts`
- Create: `frontend/package.json`
- Create: `frontend/package-lock.json`
- Create: `frontend/tsconfig.json`
- Create: `frontend/Dockerfile`
- Create: `frontend/Dockerfile.dev`
- Create: `frontend/.dockerignore`
- Create: `README.md`

**Interfaces:**
- Consumes: Approved project decisions in the foundation design spec.
- Produces: `GET /health` returning HTTP 200 and `{"status":"ok"}`; a Next.js homepage at `/`; development Compose services `web` and `api`; named volume `sqlite_data` mounted at `/data` in the API container.

- [ ] **Step 1: Write the failing API health test**

Create `backend/tests/test_health.py` with `test_health_returns_ok`, importing `app` from `backend.app.main` and using FastAPI's `TestClient` to assert that `GET /health` returns status 200 and JSON `{"status": "ok"}`. Add `backend/app/__init__.py`, runtime requirements (`fastapi`, `uvicorn[standard]`) and development requirements (`pytest`, `httpx`, including the runtime requirements). Add `.gitignore` entries for `.venv/`, `node_modules/`, `.next/`, Python caches, and SQLite files.

- [ ] **Step 2: Run the API test to verify it fails**

Run: `python3 -m venv .venv && .venv/bin/pip install -r backend/requirements-dev.txt && .venv/bin/python -m pytest backend/tests/test_health.py -q`
Expected: FAIL because `backend.app.main` does not exist yet.

- [ ] **Step 3: Implement the minimal FastAPI health endpoint**

Create `backend/app/main.py` with a FastAPI application and `GET /health` route returning `{"status": "ok"}`.

- [ ] **Step 4: Run API tests**

Run: `.venv/bin/python -m pytest backend/tests/test_health.py -q`
Expected: PASS.

- [ ] **Step 5: Add the Next.js starter app**

Create the minimal TypeScript app with a semantic homepage titled “Squashies Shop”, a root layout, plain responsive CSS, npm scripts for `dev`, `build`, and `start`, and a lockfile. Configure Next.js standalone output for the production image and create `frontend/public/` so the production Dockerfile can copy the public assets directory. Run `npm --prefix frontend install` to generate the lockfile.

- [ ] **Step 6: Build the frontend**

Run: `npm --prefix frontend run build`
Expected: Next.js production build exits with code 0.

- [ ] **Step 7: Add development and production containers**

Create the development and production Dockerfiles for each app. Configure `compose.yaml` with `web` and `api` development services on ports 3000 and 8000, source mounts for reload, and the named `sqlite_data` volume mounted at `/data` for the API.

- [ ] **Step 8: Validate Compose and build both production images**

Run: `docker compose config --quiet && docker compose build && docker build -t squashies-web:foundation -f frontend/Dockerfile frontend && docker build -t squashies-api:foundation -f backend/Dockerfile backend`
Expected: Compose configuration validates, both development images build, and both production images build successfully.

- [ ] **Step 9: Document local startup and health checks**

Document prerequisites, `docker compose up --build`, the web URL, the API health URL, and `docker compose down` in `README.md`. State that checkout and payments are not part of this foundation task.

- [ ] **Step 10: Run the task verification suite**

Run: `.venv/bin/python -m pytest backend/tests -q && npm --prefix frontend run build && docker compose config --quiet && docker compose build && docker build -t squashies-web:foundation -f frontend/Dockerfile frontend && docker build -t squashies-api:foundation -f backend/Dockerfile backend`
Expected: All tests pass and the development and production images build successfully.

- [ ] **Step 11: Commit the foundation**

Run: `git add .gitignore compose.yaml backend frontend README.md docs/superpowers/specs/2026-11-17-squashies-shop-foundation-design.md docs/superpowers/plans/2026-11-17-squashies-shop-task-1-foundation.md && git commit -m "feat: add shop app and Docker foundation"`
Expected: The foundation changes are recorded in a commit.
