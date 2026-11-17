from fastapi import FastAPI

app = FastAPI(title="Squashies Shop API")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
