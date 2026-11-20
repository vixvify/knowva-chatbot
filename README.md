# Knowa

The `web/` app uses Next.js App Router and TypeScript. Better Auth stores email/password accounts and sessions in PostgreSQL through Prisma. The FastAPI app in `service/` has the OpenAI and Qdrant Python SDKs installed.

## Run with Docker

Copy `.env.example` to `.env` in the repository root. Generate a secret with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` and set `BETTER_AUTH_SECRET` in `.env`. Then run the stack from the repository root:

```sh
docker compose up --build -d
```

| Service | Local address |
| --- | --- |
| Web | http://localhost:3000 |
| FastAPI docs | http://localhost:8000/docs |
| Qdrant dashboard | http://localhost:6333/dashboard |

Qdrant stores its data in the `qdrant-data` named volume. Stop the stack with `docker compose down`.
PostgreSQL stores its data in `postgres-data`. The `migrate` service applies the checked-in Prisma migrations before the web app starts.

Open `/register` to create an account and `/login` to sign in. The chat Server Action requires a session. Its repository uses the shared HTTP client to send `{ user_id, message }` to `POST /v1/chat/messages` on FastAPI and expects `{ reply }`. Override the provisional upstream path with `CHAT_SERVICE_PATH`. Until FastAPI implements the endpoint, the chat displays a service status message.

## Run the apps directly

Use Node.js 24 for the web app. Copy the root environment example and start `docker compose up -d postgres` from the root. Copy `web/.env.example` to `web/.env` and set `BETTER_AUTH_SECRET` to a generated secret. In `web`, run `npm ci`, `npm run db:generate`, `npm run db:migrate`, and `npm run dev`. Keep the database credentials in `COMPOSE_DATABASE_URL` and `DATABASE_URL` in sync with the PostgreSQL settings.

Use Python 3.12 and uv for the API. In `service`, run `uv sync --locked` and `uv run --locked uvicorn src.api.main:app --reload`.

Set `SERVICE_URL`, `CHAT_SERVICE_PATH`, and `CHAT_SERVICE_TIMEOUT_MS` in the web environment for its FastAPI calls.
