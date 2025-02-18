import { z } from "zod";

export const pointRecordUpdateSchema = z.object({
  points: z.number().or(z.string().regex(/\d+/).transform(Number)),
});

export type PointRecordUpdateValues = z.infer<typeof pointRecordUpdateSchema>;
