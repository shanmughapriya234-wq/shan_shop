# Squashies Shop Foundation Design

## Intent

Establish a runnable foundation for the approved child-friendly Squashies
shop, so later work can add catalog, ordering, and administration without
changing the chosen frontend, backend, database, or container approach.

## Goals

- Provide a Next.js web app and a FastAPI REST API in this repository.
- Make both services runnable locally and through Docker.
- Reserve persistent Docker storage for the SQLite database.
- Give the API a small health endpoint that can be used by tests and
  infrastructure checks.

## Non-goals

- No product catalog, accounts, checkout, payment processing, tax behavior,
  order management, or admin UI in this task.
- No production environment configuration, secrets, or live payment
  configuration.

## Constraints

- Use Next.js frontend and FastAPI REST backend, using SQLite.
- Use Docker for development and deployment.
- Adult accounts are optional; guest checkout is allowed. Children can browse
  and customize without accounts.
- Use Stripe-hosted Checkout; never store card data.
- Product images go in a Docker-persisted public media directory served by
  FastAPI; SQLite stores their metadata and paths.
- Certification evidence is private until an admin explicitly publishes it
  for customer download.
- Germany-only launch with configurable flat shipping.
- Keep tax settings undecided until professional advice; do not enable live
  checkout until confirmed.
- German legal and product-safety content needs qualified review.

## Approach

Use a small repository with separate `frontend/` and `backend/` applications,
one development Compose file, and production-capable Dockerfiles for each
application. Keep the first API behavior to `GET /health`; use SQLite's
Docker-persisted data volume as the location future database work will use.
Do not install or configure payment services in this foundation task.

The alternatives of combining both applications into one runtime or starting
with catalog/checkout behavior do not fit the approved separate Next.js and
FastAPI architecture or the requested staged plan.

## Builder choices

- Use npm for the Next.js app and pip requirements files for the API.
- Pin container major/minor lines to Node 22 and Python 3.13; lock JavaScript
  dependency resolution with `package-lock.json`.
- Keep live checkout absent rather than adding a disabled payment pathway before
  tax and professional review.
