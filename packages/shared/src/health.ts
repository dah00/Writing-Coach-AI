import { z } from "zod";

// The contract for GET /health.
// apps/api returns this shape; apps/web (or a script) can parse it with the same schema.
export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  // TODO(human): add the fields a health check should report.
});

// The TypeScript type is derived from the schema, so the two can never drift apart.
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
