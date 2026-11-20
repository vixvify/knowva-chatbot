# Knowa

The `web/` app uses Next.js App Router and TypeScript. The FastAPI app in `service/` has the OpenAI and Qdrant Python SDKs installed. The starter page makes a server-side request to the service's health endpoint.

## Run with Docker

From the repository root, run:

```sh
docker compose up --build -d
```

| Service | Local address |
| --- | --- |
| Web | http://localhost:3000 |
| FastAPI docs | http://localhost:8000/docs |
| Qdrant dashboard | http://localhost:6333/dashboard |

Qdrant stores its data in the `qdrant-data` named volume. Stop the stack with `docker compose down`.

## Run the apps directly

Use Node.js 24 for the web app. In `web`, run `npm ci` and `npm run dev`.

Use Python 3.12 and uv for the API. In `service`, run `uv sync --locked` and `uv run --locked uvicorn src.api.main:app --reload`.

The web app defaults to `http://127.0.0.1:8000` for its server-side API calls. Set `SERVICE_URL` in the web process environment to change it.
