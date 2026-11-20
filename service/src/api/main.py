from fastapi import FastAPI

app = FastAPI(title="Knowa API")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
