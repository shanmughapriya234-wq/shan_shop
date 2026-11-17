# Squashies Shop

This repository contains the Next.js storefront and FastAPI REST API for the
Squashies Shop. Task 1 establishes the application and Docker foundation;
catalog, accounts, orders, and checkout are not implemented yet.

## Run locally with Docker

Prerequisites: Docker Desktop with Docker Compose.

Start the development services:

```sh
docker compose up --build
```

- Web app: <http://localhost:3000>
- API health check: <http://localhost:8000/health>

The SQLite data volume is named `sqlite_data` and mounted at `/data` in the
API container so later database work can persist there.

Stop the services with:

```sh
docker compose down
```

Checkout and payments are not part of this foundation. Live checkout must not
be enabled until tax settings are confirmed with professional advice.

## Run API tests

```sh
python3 -m venv .venv
.venv/bin/pip install -r backend/requirements-dev.txt
.venv/bin/python -m pytest backend/tests -q
```
