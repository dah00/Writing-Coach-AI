import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { HealthResponse } from "@writing-coach/shared";

const app = new Hono();

app.get("/health", (c) => {
  const body: HealthResponse = { status: "ok" };
  return c.json(body);
});

// Hard-coded for now. It moves to a Zod-validated env config when we add one.
const port = 3001;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API listening on http://localhost:${info.port}`);
});
